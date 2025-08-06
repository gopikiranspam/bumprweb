import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  User,
  LogIn
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ProgressBar';
import { Timer } from '../components/Timer';
import { QuestionTimer } from '../components/QuestionTimer';
import { useLanguage } from '../contexts/LanguageProvider';
import { supabaseAdmin } from '../lib/supabase-admin';
import { Question } from '../types';
import { toast } from 'react-toastify';

export const GuestPracticeTestPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>([]);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

  const TEST_DURATION = 10 * 60; // 10 minutes in seconds
  const QUESTION_DURATION = 30; // 30 seconds per question

  useEffect(() => {
    if (subject) {
      loadQuestions();
    }
  }, [subject, language]);

  const loadQuestions = async () => {
    if (!subject) return;

    setLoading(true);
    try {
      const data = await supabaseAdmin.getTestQuestions(subject, language, 20);
      
      if (data && data.length > 0) {
        setQuestions(data);
        setAnswers(new Array(data.length).fill(null));
      } else {
        toast.error('No questions available for this subject');
        navigate('/guest-practice');
      }
    } catch (error: any) {
      console.error('Error loading questions:', error);
      toast.error('Failed to load questions');
      navigate('/guest-practice');
    } finally {
      setLoading(false);
    }
  };

  const getSubjectName = (subjectId: string) => {
    switch (subjectId) {
      case 'road_signs':
        return t('roadSigns');
      case 'road_rules':
        return t('trafficRules');
      case 'driving_principles':
        return t('drivingPrinciples');
      default:
        return subjectId;
    }
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelect = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    setShowAnswerFeedback(true);
    
    // Auto-advance after 2 seconds to show feedback
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        handleNextQuestion();
      } else {
        handleSubmitTest();
      }
    }, 2000);
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
    setTimeUp(true);
    setTestCompleted(true);
    setShowResults(true);
    toast.warning('Time is up! Test submitted automatically.');
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
            <h1 className="text-lg font-semibold text-white">
              {getSubjectName(subject || '')} - Practice Test
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
                {getSubjectName(subject || '')} Practice Test
              </h2>
              <p className="text-gray-400 text-lg">
                Test your knowledge with {questions.length} questions
              </p>
            </div>

            {/* Guest Notice */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <User size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-yellow-400 mb-2">Guest Practice Mode</h3>
                  <p className="text-yellow-300 text-sm mb-3">
                    You're taking this test as a guest. Your results won't be saved or tracked.
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

            <div className="bg-gray-900 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Test Instructions</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• You have {TEST_DURATION / 60} minutes to complete the test</li>
                <li>• Each question has a 30-second timer</li>
                <li>• {questions.length} multiple choice questions</li>
                <li>• Questions auto-advance when time expires or after selecting an answer</li>
                <li>• Results will be shown immediately after completion</li>
                <li>• You can retake the test as many times as you want</li>
              </ul>
            </div>

            <button
              onClick={handleStartTest}
              className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Start Practice Test
            </button>
          </div>
        )}

        {testStarted && !showResults && (
          <div className="space-y-6">
            {/* Timers and Progress */}
            <div className="grid md:grid-cols-2 gap-4">
              <Timer
                duration={TEST_DURATION}
                onTimeUp={handleTimeUp}
                isActive={testStarted && !testCompleted}
              />
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={questions.length}
              />
            </div>

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
                  duration={QUESTION_DURATION_PER_QUESTION}
                  onTimeUp={handleQuestionTimeUp}
                  isActive={testStarted && !testCompleted && !showAnswerFeedback}
                />
              }
            />

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0 || showAnswerFeedback}
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
                  disabled={showAnswerFeedback}
                  className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {t('submit')}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  disabled={showAnswerFeedback}
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

              {/* Guest Notice */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <User size={20} className="text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Guest Mode</span>
                </div>
                <p className="text-yellow-300 text-sm">
                  These results are not saved. Sign up to track your progress and access detailed analytics.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRetakeTest}
                  className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <RotateCcw size={18} />
                  <span>Retake Test</span>
                </button>
                
                <button
                  onClick={() => navigate('/guest-practice')}
                  className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Choose Another Subject
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
                      <span className="font-medium text-white">
                        Question {index + 1}
                      </span>
                      {result.isCorrect ? (
                        <CheckCircle size={20} className="text-green-400" />
                      ) : (
                        <XCircle size={20} className="text-red-400" />
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-2">{result.question.question_text}</p>
                    
                    <div className="text-sm space-y-1">
                      <div className={result.isCorrect ? 'text-green-400' : 'text-red-400'}>
                        Your answer: {result.userAnswer ? String.fromCharCode(64 + result.userAnswer) : 'Not answered'}
                      </div>
                      <div className="text-green-400">
                        Correct answer: {String.fromCharCode(64 + result.question.correct_answer)}
                      </div>
                      {result.question.explanation && (
                        <div className="text-gray-400 mt-2">
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