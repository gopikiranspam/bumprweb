export interface User {
  id: string;
  phone_number?: string;
  email?: string;
  full_name: string;
  preferred_language: 'en' | 'te' | 'hi';
  location_data?: any;
  google_id?: string;
  profile_picture_url?: string;
  created_at: string;
  last_login?: string;
}

export interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 1 | 2 | 3 | 4;
  explanation?: string;
  image_url?: string;
  language: 'en' | 'te' | 'hi';
  subject: 'road_signs' | 'road_rules' | 'driving_principles';
  difficulty_level: 'easy' | 'medium' | 'hard';
}

export interface TestResult {
  id: string;
  user_id: string;
  subject: string;
  score: number;
  total_questions: number;
  time_taken: number;
  questions_attempted: Array<{
    question_id: string;
    user_answer: number;
    correct_answer: number;
    is_correct: boolean;
  }>;
  passed: boolean;
  completed_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  subject: string;
  total_tests_taken: number;
  tests_passed: number;
  average_score: number;
  best_score: number;
  total_time_spent: number;
  last_test_date?: string;
}

export interface TestSession {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Array<number | null>;
  startTime: number;
  timeRemaining: number;
  isActive: boolean;
  subject: string;
}