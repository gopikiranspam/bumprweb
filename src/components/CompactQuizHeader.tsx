import React from 'react';
import { Clock } from 'lucide-react';

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

  const answeredQuestions = correctAnswers + wrongAnswers;
  const accuracy = answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;

  const getTimerColor = () => {
    const totalDuration = 10 * 60; // 10 minutes
    const percentage = (timeRemaining / totalDuration) * 100;
    if (percentage <= 20) return 'text-red-400';
    if (percentage <= 50) return 'text-yellow-400';
    return 'text-lime-400';
  };

  const getProgressColor = () => {
    const totalDuration = 10 * 60; // 10 minutes
    const percentage = (timeRemaining / totalDuration) * 100;
    if (percentage <= 20) return '#ef4444'; // red-400
    if (percentage <= 50) return '#facc15'; // yellow-400
    return '#a3e635'; // lime-400
  };

  const progressPercentage = ((10 * 60 - timeRemaining) / (10 * 60)) * 100;
  const circumference = 2 * Math.PI * 20; // radius = 20
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;
  return (
    <div className="bg-gray-900 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between gap-6">
        {/* Timer Section */}
        <div className="flex items-center space-x-3 min-w-0">
          {/* Round Progress Bar */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 44 44">
              {/* Background circle */}
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="#374151"
                strokeWidth="3"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke={getProgressColor()}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            {/* Clock icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Clock size={16} className={getTimerColor()} />
            </div>
          </div>
          <div className="text-sm">
            <div className={`font-mono font-bold text-lg ${getTimerColor()}`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-gray-400 text-xs">Time Left</div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex-1 min-w-0">
          <div className="text-center">
            <div className="text-lg font-semibold text-white mb-1">
              {currentQuestion} of {totalQuestions}
            </div>
            <div className="text-gray-400 text-xs">Questions</div>
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