import { supabase } from './supabase';

/**
 * Supabase Admin Functions
 * These functions provide administrative and utility operations for the Bumpr app
 */

export const supabaseAdmin = {
  /**
   * Health check to verify Supabase connection and database status
   */
  async healthCheck() {
    if (!supabase) {
      return {
        status: 'error',
        message: 'Supabase not configured',
        timestamp: new Date().toISOString()
      };
    }

    try {
      const { data, error } = await supabase.rpc('health_check');
      
      if (error) throw error;
      
      return {
        status: 'success',
        data,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      };
    }
  },

  /**
   * Verify database tables exist and are accessible
   */
  async verifyTables() {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const tables = ['users', 'questions', 'test_results', 'user_progress'];
    const results: Record<string, boolean> = {};

    for (const table of tables) {
      try {
        const { error } = await supabase
          .from(table)
          .select('id')
          .limit(1);
        
        results[table] = !error;
      } catch {
        results[table] = false;
      }
    }

    return results;
  },

  /**
   * Get random test questions using the database function
   */
  async getTestQuestions(subject: string, language: string, limit: number = 20) {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.rpc('get_test_questions', {
      p_subject: subject,
      p_language: language,
      p_limit: limit
    });

    if (error) throw error;
    return data;
  },

  /**
   * Get comprehensive user statistics
   */
  async getUserStatistics(userId: string) {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.rpc('get_user_statistics', {
      p_user_id: userId
    });

    if (error) throw error;
    return data;
  },

  /**
   * Validate environment configuration
   */
  validateConfig() {
    const requiredEnvVars = [
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_ANON_KEY'
    ];

    const missing = requiredEnvVars.filter(
      envVar => !import.meta.env[envVar] || 
      import.meta.env[envVar] === 'your_supabase_project_url' ||
      import.meta.env[envVar] === 'your_supabase_anon_key'
    );

    return {
      isValid: missing.length === 0,
      missing,
      configured: requiredEnvVars.filter(envVar => !missing.includes(envVar))
    };
  },

  /**
   * Test authentication functionality
   */
  async testAuth() {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      return {
        authEnabled: !error,
        hasSession: !!session,
        error: error?.message
      };
    } catch (error: any) {
      return {
        authEnabled: false,
        hasSession: false,
        error: error.message
      };
    }
  }
};

/**
 * Development helper to run all verification checks
 */
export async function runDiagnostics() {
  console.log('🔍 Running Supabase diagnostics...\n');

  // 1. Config validation
  console.log('1. Environment Configuration:');
  const config = supabaseAdmin.validateConfig();
  console.log(`   ✅ Valid: ${config.isValid}`);
  if (config.missing.length > 0) {
    console.log(`   ❌ Missing: ${config.missing.join(', ')}`);
  }
  console.log(`   ✅ Configured: ${config.configured.join(', ')}\n`);

  if (!config.isValid) {
    console.log('❌ Cannot proceed with diagnostics - missing environment variables\n');
    return;
  }

  // 2. Health check
  console.log('2. Database Health Check:');
  const health = await supabaseAdmin.healthCheck();
  console.log(`   Status: ${health.status}`);
  if (health.data) {
    console.log(`   Users: ${health.data.database.total_users}`);
    console.log(`   Questions: ${health.data.database.total_questions}`);
    console.log(`   Tests: ${health.data.database.total_tests}`);
  }
  console.log('');

  // 3. Table verification
  console.log('3. Table Verification:');
  try {
    const tables = await supabaseAdmin.verifyTables();
    Object.entries(tables).forEach(([table, exists]) => {
      console.log(`   ${exists ? '✅' : '❌'} ${table}`);
    });
  } catch (error: any) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  console.log('');

  // 4. Auth test
  console.log('4. Authentication Test:');
  const auth = await supabaseAdmin.testAuth();
  console.log(`   ✅ Auth Enabled: ${auth.authEnabled}`);
  console.log(`   📱 Has Session: ${auth.hasSession}`);
  if (auth.error) {
    console.log(`   ⚠️  Error: ${auth.error}`);
  }
  console.log('');

  console.log('🎉 Diagnostics complete!');
}