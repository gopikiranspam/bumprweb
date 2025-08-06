import React from 'react';
import { Clock, Target, TrendingUp } from 'lucide-react';

interface CompactQuizHeaderProps {
  timeRemaining: number;
  currentQuestion: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export const CompactQuizHeader: React.FC<CompactQuizHeaderProps> = ({
  timeRemaining,
  currentQuestion,
  totalQuestions,
  correctAnswers,
  wrongAnswers
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentQuestion / totalQuestions) * 100;
  const answeredQuestions = correctAnswers + wrongAnswers;
  const accuracy = answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;

  const getTimerColor = () => {
    const totalDuration = 10 * 60; // 10 minutes
    const percentage = (timeRemaining / totalDuration) * 100;
    if (percentage <= 20) return 'text-red-400';
    if (percentage <= 50) return 'text-yellow-400';
    return 'text-lime-400';
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between gap-6">
        {/* Timer Section */}
        <div className="flex items-center space-x-2 min-w-0">
          <Clock size={18} className={getTimerColor()} />
          <div className="text-sm">
            <div className={`font-mono font-bold ${getTimerColor()}`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-gray-400 text-xs">Time Left</div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-white">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span className="text-xs text-lime-400 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-lime-400 to-lime-300 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Score Section */}
        <div className="flex items-center space-x-4 min-w-0">
          <div className="flex items-center space-x-1">
            <span className="text-green-400 font-bold text-lg">{correctAnswers}</span>
            <span className="text-green-400 text-sm">✓</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-red-400 font-bold text-lg">{wrongAnswers}</span>
            <span className="text-red-400 text-sm">✗</span>
          </div>
          {answeredQuestions > 0 && (
            <div className="text-xs text-gray-400">
              {accuracy}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};