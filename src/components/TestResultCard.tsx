import React from 'react';
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw } from 'lucide-react';
import { TestResult } from '../types';
import { useLanguage } from '../contexts/LanguageProvider';

interface TestResultCardProps {
  result: TestResult;
  onRetakeTest: () => void;
  onViewDetails: () => void;
}

export const TestResultCard: React.FC<TestResultCardProps> = ({
  result,
  onRetakeTest,
  onViewDetails,
}) => {
  const { t } = useLanguage();
  const passed = result.passed;
  const percentage = Math.round((result.score / result.total_questions) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSubjectName = (subject: string) => {
    switch (subject) {
      case 'road_signs':
        return t('roadSigns');
      case 'road_rules':
        return t('trafficRules');
      case 'driving_principles':
        return t('drivingPrinciples');
      default:
        return subject;
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">
          {getSubjectName(result.subject)}
        </h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
          passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {passed ? <CheckCircle size={16} /> : <XCircle size={16} />}
          <span className="font-semibold">
            {passed ? t('passed') : t('failed')}
          </span>
        </div>
      </div>

      {/* Score Display */}
      <div className="text-center py-6">
        <div className={`text-6xl font-bold mb-2 ${
          passed ? 'text-green-400' : 'text-red-400'
        }`}>
          {percentage}%
        </div>
        <div className="text-gray-400 text-lg">
          {result.score} out of {result.total_questions} correct
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <Clock size={20} className="text-lime-400 mx-auto mb-2" />
          <div className="text-white font-semibold">
            {formatTime(result.time_taken)}
          </div>
          <div className="text-gray-400 text-sm">Time Taken</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <Trophy size={20} className="text-lime-400 mx-auto mb-2" />
          <div className="text-white font-semibold">
            {result.score}/{result.total_questions}
          </div>
          <div className="text-gray-400 text-sm">{t('score')}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onViewDetails}
          className="w-full bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {t('viewResults')}
        </button>
        
        <button
          onClick={onRetakeTest}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <RotateCcw size={18} />
          <span>{t('tryAgain')}</span>
        </button>
      </div>

      {/* Date */}
      <div className="text-center text-gray-400 text-sm">
        Completed on {new Date(result.completed_at).toLocaleDateString()}
      </div>
    </div>
  );
};