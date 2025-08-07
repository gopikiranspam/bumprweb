import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create client with fallback handling
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}) : null;

// Environment validation for development
if (import.meta.env.DEV && !supabase) {
  console.warn('⚠️ Supabase not configured. Please check your environment variables.');
}

// Database helper functions
export const db = {
  // User operations
  async getUser(id: string) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async createUser(userData: any) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    return { data, error };
  },

  async updateUser(id: string, updates: any) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Question operations
  async getQuestions(subject: string, language: string, limit: number = 20) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('subject', subject)
      .eq('language', language)
      .limit(limit);
    return { data, error };
  },

  // Test result operations
  async saveTestResult(resultData: any) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('test_results')
      .insert(resultData)
      .select()
      .single();
    return { data, error };
  },

  async getUserTestResults(userId: string, limit: number = 10) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(limit);
    return { data, error };
  },

  // User progress operations
  async getUserProgress(userId: string, subject?: string) {
    if (!supabase) throw new Error('Supabase not configured');
    let query = supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (subject) {
      query = query.eq('subject', subject);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  async updateUserProgress(userId: string, subject: string, progressData: any) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        subject,
        ...progressData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    return { data, error };
  }
};