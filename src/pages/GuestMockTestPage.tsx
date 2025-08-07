import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  User,
  LogIn,
  Award
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';
import { QuestionCard } from '../components/QuestionCard';
import { Timer } from '../components/Timer';
import { QuestionTimer } from '../components/QuestionTimer';
import { CompactQuizHeader } from '../components/CompactQuizHeader';
import { useLanguage } from '../contexts/LanguageProvider';
import { supabaseAdmin } from '../lib/supabase-admin';
import { Question } from '../types';
import { toast } from 'react-toastify';

export const GuestMockTestPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const TEST_DURATION = 10 * 60; // 10 minutes in seconds
  const QUESTION_DURATION = 30; // 30 seconds per question

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>([]);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TEST_DURATION);

  useEffect(() => {
    loadQuestions();
  }, [language]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      // Fetch questions proportionally from all subjects
      const [roadSignsResult, roadRulesResult, drivingPrinciplesResult] = await Promise.all([
        supabaseAdmin.getTestQuestions('road_signs', language, 7),
        supabaseAdmin.getTestQuestions('road_rules', language, 7),
        supabaseAdmin.getTestQuestions('driving_principles', language, 6)
      ]);

      const allQuestions = [
        ...(roadSignsResult || []),
        ...(roadRulesResult || []),
        ...(drivingPrinciplesResult || [])
      ];

      if (allQuestions.length === 0) {
        toast.error('No questions available for the mock test');
        navigate('/guest-practice');
        return;
      }

      // Shuffle the combined questions for randomness
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
      
      setQuestions(shuffledQuestions);
      setAnswers(new Array(shuffledQuestions.length).fill(null));
    } catch (error: any) {
      console.error('Error loading questions:', error);
      toast.error('Failed to load questions');
      navigate('/guest-practice');
    } finally {
      setLoading(false);
    }
  };
  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelect = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    // Update score tracker
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setWrongAnswers(prev => prev + 1);
    }
    
    setShowAnswerFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowAnswerFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    setShowAnswerFeedback(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionTimeUp = () => {
    // Auto-advance to next question when 30 seconds are up
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswerFeedback(false);
    } else {
      // If it's the last question, submit the test
      handleSubmitTest();
    }
  };

  const handleSubmitTest = () => {
    setShowAnswerFeedback(false);
    setTestCompleted(true);
    setShowResults(true);
  };

  const handleTimeUp = () => {
    setTimeRemaining(0);
    setTimeUp(true);
    setTestCompleted(true);
    setShowResults(true);
    toast.warning('Time is up! Test submitted automatically.');
  };

  const handleTimeUpdate = (remaining: number) => {
    setTimeRemaining(remaining);
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    const detailedResults = questions.map((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correct_answer;
      if (isCorrect) correctAnswers++;
      
      return {
        question,
        userAnswer,
        isCorrect,
        questionIndex: index
      };
    });

    const percentage = Math.round((correctAnswers / questions.length) * 100);
    const passed = percentage >= 60; // Assuming 60% is passing

    return {
      correctAnswers,
      totalQuestions: questions.length,
      percentage,
      passed,
      detailedResults
    };
  };

  const handleRetakeTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers(new Array(questions.length).fill(null));
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimeRemaining(TEST_DURATION);
    setShowAnswerFeedback(false);
    setTestStarted(false);
    setTestCompleted(false);
    setShowResults(false);
    setTimeUp(false);
    loadQuestions(); // Reload questions for new randomization
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No Questions Available</h2>
          <button
            onClick={() => navigate('/guest-practice')}
            className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-2 px-4 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const results = testCompleted ? calculateResults() : null;

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
              <Award size={20} className="text-lime-400" />
              <span>LLR Mock Test</span>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!testStarted && !testCompleted && (
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                LLR Mock Test
              </h2>
              <p className="text-gray-400 text-lg">
                Complete mock test with {questions.length} questions from all subjects
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Mock Test Instructions</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• You have {TEST_DURATION / 60} minutes to complete the test</li>
                <li>• Each question has a 30-second timer</li>
                <li>• {questions.length} questions from all subjects (Road Signs, Traffic Rules, Safe Driving)</li>
                <li>• Questions auto-advance when time expires or after selecting an answer</li>
                <li>• Results will be shown immediately after completion</li>
              </ul>
            </div>

            <button
              onClick={handleStartTest}
              className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Start Mock Test
            </button>
            
            {/* Guest Notice - Moved to Bottom */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <User size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-yellow-400 mb-2">Guest Mock Test Mode</h3>
                  <p className="text-yellow-300 text-sm mb-3">
                    You're taking this mock test as a guest. Your results won't be saved or tracked.
                  </p>
                  <button
                    onClick={() => navigate('/auth')}
                    className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    <LogIn size={16} />
                    <span>Sign up to save results</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {testStarted && !showResults && (
          <div className="space-y-6">
            {/* Compact Header with Timer, Progress, and Score */}
            <CompactQuizHeader
              timeRemaining={timeRemaining}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
            />

            {/* Hidden Timer Component for Logic */}
            <Timer
              duration={TEST_DURATION}
              onTimeUp={handleTimeUp}
              isActive={testStarted && !testCompleted}
              onTimeUpdate={handleTimeUpdate}
            />

              {/* Question */}
              <QuestionCard
                question={questions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                selectedAnswer={answers[currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
                showFeedback={showAnswerFeedback}
                timerComponent={
                  <QuestionTimer
                    key={currentQuestionIndex}
                    duration={QUESTION_DURATION}
                    onTimeUp={handleQuestionTimeUp}
                    isActive={testStarted && !testCompleted}
                  />
                }
              />

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {t('previous')}
                </button>

                <span className="text-gray-400">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>

                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmitTest}
                    className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    {t('submit')}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    {t('next')}
                  </button>
                )}
              </div>
          </div>
        )}

        {showResults && results && (
          <div className="space-y-6">
            {/* Results Summary */}
            <div className="bg-gray-900 rounded-xl p-6 text-center">
              <div className={`text-6xl font-bold mb-4 ${
                results.passed ? 'text-green-400' : 'text-red-400'
              }`}>
                {results.percentage}%
              </div>
              
              <div className={`flex items-center justify-center space-x-2 mb-4 ${
                results.passed ? 'text-green-400' : 'text-red-400'
              }`}>
                {results.passed ? <CheckCircle size={24} /> : <XCircle size={24} />}
                <span className="text-xl font-semibold">
                  {results.passed ? t('passed') : t('failed')}
                </span>
              </div>

              <p className="text-gray-400 text-lg mb-6">
                {results.correctAnswers} out of {results.totalQuestions} questions correct
              </p>

              {/* Mock Test Badge */}
              <div className="bg-lime-400/10 border border-lime-400/30 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Award size={20} className="text-lime-400" />
                  <span className="font-semibold text-lime-400">LLR Mock Test Complete</span>
                </div>
                <p className="text-lime-300 text-sm">
                  You've completed a comprehensive test covering all subjects. Sign up to track your progress!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRetakeTest}
                  className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <RotateCcw size={18} />
                  <span>Retake Mock Test</span>
                </button>
                
                <button
                  onClick={() => navigate('/guest-practice')}
                  className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Practice Individual Subjects
                </button>
                
                <button
                  onClick={() => navigate('/auth')}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <LogIn size={18} />
                  <span>Sign Up to Save Progress</span>
                </button>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Review Answers</h3>
              <div className="space-y-4">
                {results.detailedResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      result.isCorrect
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-white">
                          Question {index + 1}
                        </span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {result.question.subject.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      {result.isCorrect ? (
                        <CheckCircle size={20} className="text-green-400" />
                      ) : (
                        <XCircle size={20} className="text-red-400" />
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-2">{result.question.question_text}</p>
                    
                    <div className="text-sm space-y-1">
                      {result.userAnswer ? (
                        <div className={`text-xs leading-relaxed ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                          Your Answer: {
                            result.userAnswer === 1 ? result.question.option_a :
                            result.userAnswer === 2 ? result.question.option_b :
                            result.userAnswer === 3 ? result.question.option_c :
                            result.question.option_d
                          }
                        </div>
                      ) : (
                        <div className="text-xs leading-relaxed text-gray-400">
                          Not Answered
                        </div>
                      )}
                      <div className="text-xs leading-relaxed text-green-400">
                        Correct Answer: {
                          result.question.correct_answer === 1 ? result.question.option_a :
                          result.question.correct_answer === 2 ? result.question.option_b :
                          result.question.correct_answer === 3 ? result.question.option_c :
                          result.question.option_d
                        }
                      </div>
                      {result.question.explanation && (
                        <div className="text-xs leading-relaxed text-gray-400 mt-2">
                          <strong>Explanation:</strong> {result.question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};