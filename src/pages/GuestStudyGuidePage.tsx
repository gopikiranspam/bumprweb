import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  User,
  LogIn,
  Shuffle
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../contexts/LanguageProvider';
import { supabaseAdmin } from '../lib/supabase-admin';
import { Question } from '../types';
import { toast } from 'react-toastify';

export const GuestStudyGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const QUESTIONS_PER_PAGE = 10;

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => {
    loadAllQuestions();
  }, [language]);

  const loadAllQuestions = async () => {
    setLoading(true);
    try {
      // Fetch questions from all subjects
      const [roadSignsResult, roadRulesResult, drivingPrinciplesResult] = await Promise.all([
        supabaseAdmin.getTestQuestions('road_signs', language, 100),
        supabaseAdmin.getTestQuestions('road_rules', language, 100),
        supabaseAdmin.getTestQuestions('driving_principles', language, 100)
      ]);

      const allQuestions = [
        ...(roadSignsResult || []),
        ...(roadRulesResult || []),
        ...(drivingPrinciplesResult || [])
      ];

      if (allQuestions.length === 0) {
        toast.error('No questions available for study guide');
        return;
      }

      // Shuffle the questions for randomized study
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
      setAllQuestions(shuffledQuestions);
    } catch (error: any) {
      console.error('Error loading questions:', error);
      toast.error('Failed to load study guide questions');
    } finally {
      setLoading(false);
    }
  };

  const handleShuffle = async () => {
    setShuffling(true);
    // Add a small delay for visual feedback
    setTimeout(() => {
      const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
      setAllQuestions(shuffledQuestions);
      setCurrentPage(1); // Reset to first page after shuffle
      setShuffling(false);
    }, 500);
  };

  const totalPages = Math.ceil(allQuestions.length / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = allQuestions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSubjectName = (subject: string) => {
    switch (subject) {
      case 'road_signs':
        return 'Road Signs';
      case 'road_rules':
        return 'Traffic Rules';
      case 'driving_principles':
        return 'Safe Driving';
      default:
        return subject;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCorrectAnswerText = (question: Question) => {
    switch (question.correct_answer) {
      case 1:
        return question.option_a;
      case 2:
        return question.option_b;
      case 3:
        return question.option_c;
      case 4:
        return question.option_d;
      default:
        return 'Unknown';
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed text-white transition-colors flex items-center space-x-1"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-lg transition-colors ${
            currentPage === i
              ? 'bg-lime-400 text-black font-semibold'
              : 'bg-gray-800 hover:bg-gray-700 text-white'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed text-white transition-colors flex items-center space-x-1"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    );

    return (
      <div className="flex items-center justify-center space-x-2 flex-wrap gap-2">
        {pages}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
          <p className="text-white">Loading Study Guide...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/guest-practice')}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <Logo size="sm" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-white flex items-center space-x-2">
              <BookOpen size={20} className="text-lime-400" />
              <span>Study Guide</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-lg">
            <User size={16} className="text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Guest</span>
          </div>
          <LanguageSelector />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen size={32} className="text-lime-400" />
            <h2 className="text-3xl font-bold text-white">Study Guide</h2>
          </div>
          <p className="text-gray-400 text-lg mb-6">
            Comprehensive study resource with all questions and answers from all subjects
          </p>
          
          {/* Stats and Shuffle */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
            <div className="bg-gray-900 rounded-lg px-4 py-2">
              <span className="text-lime-400 font-semibold">{allQuestions.length}</span>
              <span className="text-gray-400 ml-2">Total Questions</span>
            </div>
            <div className="bg-gray-900 rounded-lg px-4 py-2">
              <span className="text-lime-400 font-semibold">{totalPages}</span>
              <span className="text-gray-400 ml-2">Pages</span>
            </div>
            <button
              onClick={handleShuffle}
              disabled={shuffling}
              className="flex items-center space-x-2 bg-lime-400 hover:bg-lime-300 disabled:bg-gray-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <Shuffle size={16} className={shuffling ? 'animate-spin' : ''} />
              <span>Shuffle Questions</span>
            </button>
          </div>

          {/* Page Info */}
          <div className="text-gray-400 text-sm">
            Showing questions {startIndex + 1}-{Math.min(endIndex, allQuestions.length)} of {allQuestions.length}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6 mb-8">
          {currentQuestions.map((question, index) => {
            const questionNumber = startIndex + index + 1;
            return (
              <div key={question.id} className="bg-gray-900 rounded-xl p-6 space-y-4">
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-lime-400 text-black font-bold px-3 py-1 rounded-lg text-sm">
                      {questionNumber}
                    </div>
                    <div className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {getSubjectName(question.subject)}
                    </div>
                  </div>
                  {question.difficulty_level && (
                    <div className={`px-2 py-1 rounded border text-xs font-medium ${getDifficultyColor(question.difficulty_level)}`}>
                      {question.difficulty_level.charAt(0).toUpperCase() + question.difficulty_level.slice(1)}
                    </div>
                  )}
                </div>

                {/* Question Image */}
                {question.image_url && (
                  <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden mb-4">
                    <img
                      src={question.image_url}
                      alt="Question illustration"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Question Text */}
                <div className="mb-4">
                  <h3 className="text-white text-base font-medium leading-relaxed mb-3">
                    {question.question_text}
                  </h3>
                </div>

                {/* Answer Options */}
                <div className="space-y-2 mb-4">
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm font-bold text-gray-400">
                        A
                      </div>
                      <span className="text-gray-300 text-sm">{question.option_a}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm font-bold text-gray-400">
                        B
                      </div>
                      <span className="text-gray-300 text-sm">{question.option_b}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm font-bold text-gray-400">
                        C
                      </div>
                      <span className="text-gray-300 text-sm">{question.option_c}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm font-bold text-gray-400">
                        D
                      </div>
                      <span className="text-gray-300 text-sm">{question.option_d}</span>
                    </div>
                  </div>
                </div>

                {/* Correct Answer */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-sm font-bold text-green-900">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-400 mb-1">Correct Answer</h4>
                      <p className="text-green-300 text-sm leading-relaxed">
                        {getCorrectAnswerText(question)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                {question.explanation && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Explanation</h4>
                    <p className="text-blue-300 text-sm leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-gray-400 text-sm">
                Page {currentPage} of {totalPages}
              </div>
              {renderPagination()}
            </div>
          </div>
        )}

        {/* Guest Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mt-8">
          <div className="flex items-start space-x-3">
            <User size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
            <div className="text-left">
              <h3 className="font-semibold text-yellow-400 mb-2">Guest Study Mode</h3>
              <p className="text-yellow-300 text-sm mb-3">
                You're using the study guide as a guest. Sign up to access personalized study plans and track your progress.
              </p>
              <button
                onClick={() => navigate('/auth')}
                className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 px-4 rounded-lg transition-colors text-sm"
              >
                <LogIn size={16} />
                <span>Sign up for full access</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};