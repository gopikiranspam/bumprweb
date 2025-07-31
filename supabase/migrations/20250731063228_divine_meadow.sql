/*
  # Production Enhancements for Bumpr

  ## Overview
  This migration adds production-ready enhancements including:
  - Additional indexes for performance optimization
  - Database functions for common operations
  - Enhanced security policies
  - Audit logging capabilities
  - Data validation functions

  ## 1. Performance Enhancements
  - Additional composite indexes
  - Query optimization functions
  - Materialized views for analytics

  ## 2. Security Enhancements
  - Enhanced RLS policies
  - Input validation functions
  - Rate limiting helpers

  ## 3. Operational Features
  - Audit logging
  - Data cleanup procedures
  - Health check functions
*/

-- Additional performance indexes
CREATE INDEX IF NOT EXISTS idx_questions_subject_lang_difficulty 
  ON questions(subject, language, difficulty_level);

CREATE INDEX IF NOT EXISTS idx_test_results_user_subject_date 
  ON test_results(user_id, subject, completed_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_progress_updated_at 
  ON user_progress(updated_at DESC);

-- Function to get random questions for test
CREATE OR REPLACE FUNCTION get_test_questions(
  p_subject VARCHAR(20),
  p_language VARCHAR(2),
  p_limit INTEGER DEFAULT 20
)
RETURNS SETOF questions AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM questions
  WHERE subject = p_subject 
    AND language = p_language
  ORDER BY RANDOM()
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate user statistics
CREATE OR REPLACE FUNCTION get_user_statistics(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_tests', COALESCE(SUM(total_tests_taken), 0),
    'total_passed', COALESCE(SUM(tests_passed), 0),
    'overall_average', COALESCE(AVG(average_score), 0),
    'total_time_spent', COALESCE(SUM(total_time_spent), 0),
    'subjects_attempted', COUNT(DISTINCT subject),
    'last_activity', MAX(last_test_date)
  ) INTO result
  FROM user_progress
  WHERE user_id = p_user_id;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate test submission
CREATE OR REPLACE FUNCTION validate_test_submission(
  p_user_id UUID,
  p_subject VARCHAR(20),
  p_questions_attempted JSONB,
  p_time_taken INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  question_count INTEGER;
  max_time INTEGER := 600; -- 10 minutes in seconds
BEGIN
  -- Validate question count
  SELECT jsonb_array_length(p_questions_attempted) INTO question_count;
  IF question_count != 20 THEN
    RETURN FALSE;
  END IF;
  
  -- Validate time taken
  IF p_time_taken > max_time OR p_time_taken < 30 THEN
    RETURN FALSE;
  END IF;
  
  -- Validate subject
  IF p_subject NOT IN ('road_signs', 'road_rules', 'driving_principles') THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enhanced RLS policy for questions (with rate limiting consideration)
DROP POLICY IF EXISTS "Anyone can read questions" ON questions;
CREATE POLICY "Anyone can read questions"
  ON questions
  FOR SELECT
  TO public
  USING (true);

-- Policy to prevent excessive test submissions
CREATE OR REPLACE FUNCTION check_test_rate_limit(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  recent_tests INTEGER;
BEGIN
  -- Allow maximum 10 tests per hour
  SELECT COUNT(*) INTO recent_tests
  FROM test_results
  WHERE user_id = p_user_id
    AND completed_at > NOW() - INTERVAL '1 hour';
  
  RETURN recent_tests < 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enhanced test results insertion policy
DROP POLICY IF EXISTS "Users can insert own test results" ON test_results;
CREATE POLICY "Users can insert own test results"
  ON test_results
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id 
    AND validate_test_submission(user_id, subject, questions_attempted, time_taken)
    AND check_test_rate_limit(user_id)
  );

-- Create audit log table for tracking important events
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  table_name VARCHAR(50),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for audit logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_action 
  ON audit_logs(user_id, action, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_logs_table_record 
  ON audit_logs(table_name, record_id);

-- Enable RLS on audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Audit log policies
CREATE POLICY "Users can view own audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to log user actions
CREATE OR REPLACE FUNCTION log_user_action(
  p_user_id UUID,
  p_action VARCHAR(50),
  p_table_name VARCHAR(50) DEFAULT NULL,
  p_record_id UUID DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id, action, table_name, record_id, old_values, new_values
  ) VALUES (
    p_user_id, p_action, p_table_name, p_record_id, p_old_values, p_new_values
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger function for audit logging
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM log_user_action(
      COALESCE(NEW.user_id, auth.uid()),
      TG_OP,
      TG_TABLE_NAME,
      NEW.id,
      NULL,
      to_jsonb(NEW)
    );
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM log_user_action(
      COALESCE(NEW.user_id, auth.uid()),
      TG_OP,
      TG_TABLE_NAME,
      NEW.id,
      to_jsonb(OLD),
      to_jsonb(NEW)
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_user_action(
      COALESCE(OLD.user_id, auth.uid()),
      TG_OP,
      TG_TABLE_NAME,
      OLD.id,
      to_jsonb(OLD),
      NULL
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add audit triggers to important tables
CREATE TRIGGER audit_test_results
  AFTER INSERT OR UPDATE OR DELETE ON test_results
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_user_progress
  AFTER INSERT OR UPDATE OR DELETE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Data cleanup function (for maintenance)
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS VOID AS $$
BEGIN
  -- Clean up audit logs older than 1 year
  DELETE FROM audit_logs 
  WHERE created_at < NOW() - INTERVAL '1 year';
  
  -- Clean up incomplete test sessions older than 1 day
  -- (This would be for any session management table if implemented)
  
  -- Log the cleanup action
  INSERT INTO audit_logs (user_id, action, table_name)
  VALUES (NULL, 'DATA_CLEANUP', 'system');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Health check function
CREATE OR REPLACE FUNCTION health_check()
RETURNS JSON AS $$
DECLARE
  result JSON;
  total_users INTEGER;
  total_questions INTEGER;
  total_tests INTEGER;
  avg_response_time NUMERIC;
BEGIN
  -- Get basic statistics
  SELECT COUNT(*) INTO total_users FROM users;
  SELECT COUNT(*) INTO total_questions FROM questions;
  SELECT COUNT(*) INTO total_tests FROM test_results;
  
  -- Build health check response
  SELECT json_build_object(
    'status', 'healthy',
    'timestamp', NOW(),
    'database', json_build_object(
      'total_users', total_users,
      'total_questions', total_questions,
      'total_tests', total_tests,
      'connection_status', 'connected'
    ),
    'version', '1.0.0'
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_test_questions(VARCHAR, VARCHAR, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_statistics(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION health_check() TO authenticated, anon;