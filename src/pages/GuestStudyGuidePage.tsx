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

      // Organize questions by subject
      const roadSigns = roadSignsResult || [];
      const roadRules = roadRulesResult || [];
      const drivingPrinciples = drivingPrinciplesResult || [];

      // Shuffle each subject's questions individually
      const shuffledRoadSigns = roadSigns.sort(() => Math.random() - 0.5);
      const shuffledRoadRules = roadRules.sort(() => Math.random() - 0.5);
      const shuffledDrivingPrinciples = drivingPrinciples.sort(() => Math.random() - 0.5);

      // Interleave questions in sequence: Traffic Rules -> Safe Driving -> Road Signs
      const interleavedQuestions = [];
      const maxLength = Math.max(shuffledRoadRules.length, shuffledDrivingPrinciples.length, shuffledRoadSigns.length);
      
      for (let i = 0; i < maxLength; i++) {
        // Add Traffic Rules question (road_rules)
        if (i < shuffledRoadRules.length) {
          interleavedQuestions.push(shuffledRoadRules[i]);
        }
        // Add Safe Driving question (driving_principles)
        if (i < shuffledDrivingPrinciples.length) {
          interleavedQuestions.push(shuffledDrivingPrinciples[i]);
        }
        // Add Road Signs question (road_signs)
        if (i < shuffledRoadSigns.length) {
          interleavedQuestions.push(shuffledRoadSigns[i]);
        }
      }

      if (interleavedQuestions.length === 0) {
        toast.error('No questions available for LLR Test Syllabus');
        return;
      }

      setAllQuestions(interleavedQuestions);
    } catch (error: any) {
      console.error('Error loading questions:', error);
      toast.error('Failed to load LLR Test Syllabus questions');
    } finally {
      setLoading(false);
    }
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
              <span>{t('llrCompleteSyllabus')}</span>
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
        {/* Page Information */}
        <div className="text-center mb-6">
          <div className="bg-gray-900 rounded-lg p-3 inline-block">
            <div className="text-lime-400 font-semibold text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <div className="text-gray-400 text-xs mt-1">
              Questions {startIndex + 1}-{Math.min(endIndex, allQuestions.length)} of {allQuestions.length}
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3 mb-8">
          {currentQuestions.map((question, index) => {
            const questionNumber = startIndex + index + 1;
            return (
              <div key={question.id} className="bg-gray-900 rounded-lg p-3 space-y-2">
                {/* Question Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-lime-400 text-black font-semibold px-2 py-1 rounded text-xs">
                      {questionNumber}
                    </div>
                    <div className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {getSubjectName(question.subject)}
                    </div>
                  </div>
                  {question.difficulty_level && (
                    <div className={`px-2 py-1 rounded border text-xs ${getDifficultyColor(question.difficulty_level)}`}>
                      {question.difficulty_level.charAt(0).toUpperCase() + question.difficulty_level.slice(1)}
                    </div>
                  )}
                </div>

                {/* Question Image */}
                {question.image_url && (
                  <div className="w-full h-32 bg-gray-800 rounded-lg overflow-hidden mb-2">
                    <img
                      src={question.image_url}
                      alt="Question illustration"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Question Text */}
                <div className="mb-2">
                  <h3 className="text-white text-xs font-medium leading-relaxed">
                    {question.question_text}
                  </h3>
                </div>

                {/* Answer Options */}
                {/* Correct Answer Only */}
                <div className="mb-2">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                    <span className="text-green-300 text-xs leading-relaxed">
                      {getCorrectAnswerText(question)}
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                {question.explanation && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <h4 className="font-medium text-blue-400 mb-1 text-xs">Explanation</h4>
                    <p className="text-blue-300 text-xs leading-relaxed">
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
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-gray-400 text-sm">
                {t('pageOf')} {currentPage} {t('of')} {totalPages}
              </div>
              {renderPagination()}
            </div>
          </div>
        )}

        {/* Guest Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-6">
          <div className="flex items-start space-x-3">
            <User size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
            <div className="text-left">
              <h3 className="font-semibold text-yellow-400 mb-2 text-sm">Guest Complete Syllabus Mode</h3>
              <p className="text-yellow-300 text-sm mb-3">
                You're using the LLR Complete Syllabus as a guest. Sign up to access personalized study plans and track your progress.
              </p>
              <button
                onClick={() => navigate('/auth')}
                className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 px-3 rounded-lg transition-colors text-xs"
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