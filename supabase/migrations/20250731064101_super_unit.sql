/*
  # Create Bumpr Application Tables

  ## Overview
  This migration creates all the required tables for the Bumpr driving license test preparation application.

  ## 1. New Tables
  
  ### Users Table
  - `id` (uuid, primary key) - Matches Supabase auth.users.id
  - `phone_number` (varchar, unique) - User's phone number for authentication
  - `email` (varchar, unique) - User's email address (from Google OAuth)
  - `full_name` (varchar) - User's full name
  - `preferred_language` (varchar) - User's preferred language (en, te, hi)
  - `location_data` (jsonb) - User's location information
  - `google_id` (varchar, unique) - Google OAuth identifier
  - `profile_picture_url` (text) - URL to user's profile picture
  - `created_at` (timestamp) - Account creation timestamp
  - `last_login` (timestamp) - Last login timestamp

  ### Questions Table
  - `id` (uuid, primary key) - Unique question identifier
  - `question_text` (text) - The question text
  - `option_a` to `option_d` (text) - Multiple choice options
  - `correct_answer` (integer) - Correct answer index (1-4)
  - `explanation` (text) - Explanation for the correct answer
  - `image_url` (text) - Optional image URL for visual questions
  - `language` (varchar) - Question language (en, te, hi)
  - `subject` (varchar) - Subject category
  - `difficulty_level` (varchar) - Question difficulty
  - `created_at`, `updated_at` (timestamp) - Audit timestamps

  ### Test Results Table
  - `id` (uuid, primary key) - Unique test result identifier
  - `user_id` (uuid) - Foreign key to users table
  - `subject` (varchar) - Test subject
  - `score` (integer) - Number of correct answers
  - `total_questions` (integer) - Total questions in test (default 20)
  - `time_taken` (integer) - Time taken in seconds
  - `questions_attempted` (jsonb) - Array of question attempts with answers
  - `passed` (boolean) - Whether the test was passed (60% threshold)
  - `completed_at` (timestamp) - Test completion timestamp

  ### User Progress Table
  - `id` (uuid, primary key) - Unique progress record identifier
  - `user_id` (uuid) - Foreign key to users table
  - `subject` (varchar) - Subject being tracked
  - `total_tests_taken` (integer) - Total number of tests taken
  - `tests_passed` (integer) - Number of tests passed
  - `average_score` (decimal) - Average score across all tests
  - `best_score` (integer) - Best score achieved
  - `total_time_spent` (integer) - Total time spent on tests in seconds
  - `last_test_date` (timestamp) - Date of last test taken
  - `updated_at` (timestamp) - Last update timestamp

  ## 2. Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only access their own data
  - Authenticated users can read questions
  - Public access to questions for guest users (practice mode)

  ## 3. Sample Data
  - Includes sample questions in English, Telugu, and Hindi
  - Covers all three subjects: road signs, traffic rules, and driving principles
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(15) UNIQUE,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  preferred_language VARCHAR(2) DEFAULT 'en' CHECK (preferred_language IN ('en', 'te', 'hi')),
  location_data JSONB,
  google_id VARCHAR(255) UNIQUE,
  profile_picture_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  
  -- Ensure at least one authentication method
  CONSTRAINT auth_method_check CHECK (
    phone_number IS NOT NULL OR 
    (email IS NOT NULL AND google_id IS NOT NULL)
  )
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer INTEGER NOT NULL CHECK (correct_answer BETWEEN 1 AND 4),
  explanation TEXT,
  image_url TEXT,
  language VARCHAR(2) NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'te', 'hi')),
  subject VARCHAR(20) NOT NULL CHECK (subject IN ('road_signs', 'road_rules', 'driving_principles')),
  difficulty_level VARCHAR(10) DEFAULT 'medium' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test results table
CREATE TABLE IF NOT EXISTS test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(20) NOT NULL CHECK (subject IN ('road_signs', 'road_rules', 'driving_principles')),
  score INTEGER NOT NULL CHECK (score >= 0),
  total_questions INTEGER NOT NULL DEFAULT 20 CHECK (total_questions > 0),
  time_taken INTEGER NOT NULL CHECK (time_taken > 0), -- in seconds
  questions_attempted JSONB NOT NULL DEFAULT '[]'::jsonb,
  passed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure score doesn't exceed total questions
  CONSTRAINT valid_score CHECK (score <= total_questions)
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(20) NOT NULL CHECK (subject IN ('road_signs', 'road_rules', 'driving_principles')),
  total_tests_taken INTEGER NOT NULL DEFAULT 0 CHECK (total_tests_taken >= 0),
  tests_passed INTEGER NOT NULL DEFAULT 0 CHECK (tests_passed >= 0),
  average_score DECIMAL(5,2) DEFAULT 0.00 CHECK (average_score >= 0 AND average_score <= 100),
  best_score INTEGER DEFAULT 0 CHECK (best_score >= 0 AND best_score <= 100),
  total_time_spent INTEGER DEFAULT 0 CHECK (total_time_spent >= 0), -- in seconds
  last_test_date TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint on user and subject combination
  UNIQUE(user_id, subject),
  
  -- Ensure tests_passed doesn't exceed total_tests_taken
  CONSTRAINT valid_pass_count CHECK (tests_passed <= total_tests_taken)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

CREATE INDEX IF NOT EXISTS idx_questions_subject_language ON questions(subject, language);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_test_results_subject ON test_results(subject);
CREATE INDEX IF NOT EXISTS idx_test_results_completed_at ON test_results(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_test_results_user_subject ON test_results(user_id, subject);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_subject ON user_progress(subject);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for questions table (public read access for practice)
CREATE POLICY "Anyone can read questions"
  ON questions
  FOR SELECT
  TO public
  USING (true);

-- RLS Policies for test_results table
CREATE POLICY "Users can view own test results"
  ON test_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test results"
  ON test_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_progress table
CREATE POLICY "Users can view own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updating timestamps
CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON questions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically update user progress after test completion
CREATE OR REPLACE FUNCTION update_user_progress_on_test_completion()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_progress (user_id, subject, total_tests_taken, tests_passed, average_score, best_score, total_time_spent, last_test_date)
  VALUES (
    NEW.user_id,
    NEW.subject,
    1,
    CASE WHEN NEW.passed THEN 1 ELSE 0 END,
    (NEW.score::decimal / NEW.total_questions * 100),
    (NEW.score::decimal / NEW.total_questions * 100),
    NEW.time_taken,
    NEW.completed_at
  )
  ON CONFLICT (user_id, subject) DO UPDATE SET
    total_tests_taken = user_progress.total_tests_taken + 1,
    tests_passed = user_progress.tests_passed + CASE WHEN NEW.passed THEN 1 ELSE 0 END,
    average_score = (
      (user_progress.average_score * user_progress.total_tests_taken + NEW.score::decimal / NEW.total_questions * 100) 
      / (user_progress.total_tests_taken + 1)
    ),
    best_score = GREATEST(user_progress.best_score, NEW.score::decimal / NEW.total_questions * 100),
    total_time_spent = user_progress.total_time_spent + NEW.time_taken,
    last_test_date = NEW.completed_at,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update progress when test is completed
CREATE TRIGGER auto_update_user_progress
  AFTER INSERT ON test_results
  FOR EACH ROW
  EXECUTE FUNCTION update_user_progress_on_test_completion();

-- Insert sample questions for testing

-- Road Signs Questions (English)
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject, language, difficulty_level) VALUES

-- Easy Road Signs
('What does a red circular sign with a white horizontal line mean?', 'No Entry', 'Stop', 'Give Way', 'Speed Limit', 1, 'A red circular sign with a white horizontal line indicates "No Entry" - vehicles are prohibited from entering.', 'road_signs', 'en', 'easy'),

('What does a triangular sign with red border mean?', 'Mandatory', 'Informational', 'Warning', 'Prohibition', 3, 'Triangular signs with red borders are warning signs that alert drivers to potential hazards ahead.', 'road_signs', 'en', 'easy'),

('What color are mandatory road signs?', 'Red', 'Blue', 'Yellow', 'Green', 2, 'Mandatory signs are blue in color and indicate actions that must be taken by drivers.', 'road_signs', 'en', 'easy'),

-- Medium Road Signs  
('What does a yellow diamond-shaped sign indicate?', 'Construction zone', 'School zone', 'Hospital zone', 'All of the above', 4, 'Yellow diamond-shaped signs can indicate various special zones including construction, school, and hospital areas.', 'road_signs', 'en', 'medium'),

('A sign showing a bicycle inside a red circle means:', 'Bicycle crossing', 'Bicycle parking', 'No bicycles', 'Bicycle repair', 3, 'A bicycle inside a red circle is a prohibition sign meaning bicycles are not allowed in that area.', 'road_signs', 'en', 'medium'),

-- Hard Road Signs
('In a complex intersection with multiple signs, which takes precedence?', 'Traffic lights', 'Police officer signals', 'Road signs', 'Traffic warden signals', 2, 'Police officer signals always take precedence over all other traffic control devices including lights and signs.', 'road_signs', 'en', 'hard');

-- Traffic Rules Questions (English)
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject, language, difficulty_level) VALUES

-- Easy Traffic Rules
('What is the maximum speed limit in city areas for cars?', '40 km/h', '50 km/h', '60 km/h', '70 km/h', 2, 'The maximum speed limit for cars in city/urban areas is 50 km/h as per Indian Motor Vehicle Act.', 'road_rules', 'en', 'easy'),

('When should you use indicators?', 'Only when turning', 'Only when changing lanes', 'When turning or changing lanes', 'Only in heavy traffic', 3, 'Indicators should be used whenever you are turning or changing lanes to signal your intention to other road users.', 'road_rules', 'en', 'easy'),

('What is the legal driving age for cars in India?', '16 years', '17 years', '18 years', '21 years', 3, 'The minimum legal age for driving a car in India is 18 years.', 'road_rules', 'en', 'easy'),

-- Medium Traffic Rules
('What is the penalty for driving without a valid license?', '₹1000', '₹2000', '₹5000', '₹10000', 3, 'Driving without a valid license can result in a fine of ₹5000 and possible imprisonment.', 'road_rules', 'en', 'medium'),

('When is overtaking prohibited?', 'On curves and hills', 'Near intersections', 'In school zones', 'All of the above', 4, 'Overtaking is prohibited on curves, hills, near intersections, school zones, and other specified areas for safety reasons.', 'road_rules', 'en', 'medium'),

-- Hard Traffic Rules  
('If involved in an accident causing injury, you must report to police within:', '6 hours', '12 hours', '24 hours', '48 hours', 3, 'Any accident involving injury must be reported to the police within 24 hours as per Indian law.', 'road_rules', 'en', 'hard');

-- Safe Driving Questions (English)
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject, language, difficulty_level) VALUES

-- Easy Safe Driving
('What should you do before starting your vehicle?', 'Check mirrors only', 'Adjust seat and mirrors', 'Start engine immediately', 'Sound horn', 2, 'Before starting, always adjust your seat, mirrors, check surroundings and ensure all safety equipment is working.', 'driving_principles', 'en', 'easy'),

('When should you wear a seatbelt?', 'Only on highways', 'Only in the front seat', 'Always when driving', 'Only during long trips', 3, 'Seatbelts should always be worn when driving, regardless of distance or type of road.', 'driving_principles', 'en', 'easy'),

('What is the safe following distance in normal conditions?', '1 second', '2 seconds', '3 seconds', '5 seconds', 3, 'The recommended safe following distance in normal conditions is 3 seconds behind the vehicle ahead.', 'driving_principles', 'en', 'easy'),

-- Medium Safe Driving
('What should you do if your brakes fail?', 'Jump out of the vehicle', 'Use handbrake gradually', 'Sound horn continuously', 'Speed up', 2, 'If brakes fail, use the handbrake gradually while steering to a safe area and downshifting gears.', 'driving_principles', 'en', 'medium'),

('When driving in fog, you should:', 'Use high beam lights', 'Use low beam and fog lights', 'Drive faster to get out quickly', 'Follow closely behind other vehicles', 2, 'In fog, use low beam headlights and fog lights, drive slowly, and maintain extra following distance.', 'driving_principles', 'en', 'medium'),

-- Hard Safe Driving
('In an emergency braking situation on a wet road, you should:', 'Brake hard and steer', 'Pump the brakes', 'Apply steady pressure and steer straight', 'Use handbrake only', 3, 'On wet roads during emergency braking, apply steady brake pressure and keep steering straight to avoid skidding.', 'driving_principles', 'en', 'hard');

-- Telugu Questions (Sample - Road Signs)
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject, language, difficulty_level) VALUES

('ఎరుపు వృత్తాకార గుర్తులో తెల్లని అడ్డగీత అంటే ఏమిటి?', 'ప్రవేశం లేదు', 'ఆగు', 'దారిమార్చు', 'వేగ పరిమితి', 1, 'తెల్లని అడ్డగీతతో ఎరుపు వృత్తాకార గుర్తు "ప్రవేశం లేదు" అని అర్థం - వాహనాలు లోపలికి రాకూడదు.', 'road_signs', 'te', 'easy'),

('త్రిభుజాకార ఎరుపు అంచుతో ఉన్న గుర్తు అంటే ఏమిటి?', 'తప్పనిసరి', 'సమాచార', 'హెచ్చరిక', 'నిషేధ', 3, 'ఎరుపు అంచుతో త్రిభుజాకార గుర్తులు హెచ్చరిక గుర్తులు - ముందు ప్రమాదం ఉండవచ్చని తెలియజేస్తాయి.', 'road_signs', 'te', 'easy'),

('నిర్బంధ రోడ్డు గుర్తులు ఏ రంగులో ఉంటాయి?', 'ఎరుపు', 'నీలం', 'పసుపు', 'ఆకుపచ్చ', 2, 'నిర్బంధ గుర్తులు నీలం రంగులో ఉంటాయి మరియు డ్రైవర్లు తప్పకుండా చేయవలసిన పనులను సూచిస్తాయి.', 'road_signs', 'te', 'easy');

-- Hindi Questions (Sample - Road Signs)  
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject, language, difficulty_level) VALUES

('सफेद क्षैतिज रेखा के साथ लाल गोलाकार चिह्न का क्या मतलब है?', 'प्रवेश नहीं', 'रुकें', 'रास्ता दें', 'गति सीमा', 1, 'सफेद क्षैतिज रेखा के साथ लाल गोलाकार चिह्न "प्रवेश नहीं" दर्शाता है - वाहनों का प्रवेश निषिद्ध है।', 'road_signs', 'hi', 'easy'),

('लाल बॉर्डर के साथ त्रिकोणीय चिह्न का क्या मतलब है?', 'अनिवार्य', 'सूचनात्मक', 'चेतावनी', 'निषेध', 3, 'लाल बॉर्डर के साथ त्रिकोणीय चिह्न चेतावनी चिह्न हैं जो ड्राइवरों को आगे की संभावित खतरों के बारे में सचेत करते हैं।', 'road_signs', 'hi', 'easy'),

('अनिवार्य सड़क चिह्न किस रंग के होते हैं?', 'लाल', 'नीला', 'पीला', 'हरा', 2, 'अनिवार्य चिह्न नीले रंग के होते हैं और उन कार्यों को दर्शाते हैं जो ड्राइवरों द्वारा किए जाने चाहिए।', 'road_signs', 'hi', 'easy');