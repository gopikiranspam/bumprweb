import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ScoreTrackerProps {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
}

export const ScoreTracker: React.FC<ScoreTrackerProps> = ({
  correctAnswers,
  wrongAnswers,
  totalQuestions,
}) => {
  const answeredQuestions = correctAnswers + wrongAnswers;
  const unansweredQuestions = totalQuestions - answeredQuestions;

  return (
    <div className="bg-gray-900 rounded-xl p-4 space-y-4">
      <h3 className="text-lg font-semibold text-white text-center">Score Tracker</h3>
      
      <div className="space-y-3">
        {/* Correct Answers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle size={20} className="text-green-400" />
            <span className="text-white font-medium">Correct</span>
          </div>
          <span className="text-green-400 font-bold text-xl">
            {correctAnswers} ✓
          </span>
        </div>

        {/* Wrong Answers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <XCircle size={20} className="text-red-400" />
            <span className="text-white font-medium">Wrong</span>
          </div>
          <span className="text-red-400 font-bold text-xl">
            {wrongAnswers} ✗
          </span>
        </div>

        {/* Unanswered */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
            <span className="text-white font-medium">Remaining</span>
          </div>
          <span className="text-gray-400 font-bold text-xl">
            {unansweredQuestions}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Progress</span>
          <span>{answeredQuestions}/{totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-lime-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Accuracy */}
      {answeredQuestions > 0 && (
        <div className="text-center pt-2 border-t border-gray-700">
          <div className="text-sm text-gray-400">Accuracy</div>
          <div className="text-lime-400 font-bold text-lg">
            {Math.round((correctAnswers / answeredQuestions) * 100)}%
          </div>
        </div>
      )}
    </div>
  );
};