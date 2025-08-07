import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  showFeedback?: boolean;
  showExplanation?: boolean;
  timerComponent?: React.ReactNode;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
  showFeedback = false,
  showExplanation = false,
  timerComponent,
}) => {
  const options = [
    { value: 1, text: question.option_a },
    { value: 2, text: question.option_b },
    { value: 3, text: question.option_c },
    { value: 4, text: question.option_d },
  ];

  const getOptionStyle = (optionValue: number) => {
    if (!showFeedback && !showExplanation) {
      return selectedAnswer === optionValue
        ? 'bg-lime-400 text-black border-lime-400'
        : 'bg-gray-800 text-white border-gray-600 hover:border-gray-500';
    }

    // Show feedback or explanation mode
    if (optionValue === question.correct_answer) {
      return 'bg-green-500/20 text-green-400 border-green-500';
    }
    if (selectedAnswer === optionValue && optionValue !== question.correct_answer) {
      return 'bg-red-500/20 text-red-400 border-red-500';
    }
    return 'bg-gray-800 text-gray-400 border-gray-600';
  };

  const getOptionCircleStyle = (optionValue: number) => {
    if (!showFeedback && !showExplanation) {
      return selectedAnswer === optionValue
        ? 'border-black bg-black text-lime-400'
        : 'border-current';
    }

    // Show feedback or explanation mode
    if (optionValue === question.correct_answer) {
      return 'border-green-400 bg-green-400 text-green-900';
    }
    if (selectedAnswer === optionValue && optionValue !== question.correct_answer) {
      return 'border-red-400 bg-red-400 text-red-900';
    }
    return 'border-current';
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-sm sm:text-base font-semibold text-white">
              Question {questionNumber}
            </h3>
            <div className="text-sm sm:text-base font-semibold text-lime-400">
              {timerComponent}
            </div>
          </div>
          {question.difficulty_level && (
            <span className={`px-2 py-1 rounded text-xs font-medium ml-2 flex-shrink-0 ${
              question.difficulty_level === 'easy' ? 'bg-green-500/20 text-green-400' :
              question.difficulty_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {question.difficulty_level}
            </span>
          )}
        </div>

        {question.image_url && (
          <div className="w-full h-40 sm:h-48 bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={question.image_url}
              alt="Question illustration"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        )}

        <p className="text-white text-sm sm:text-base leading-relaxed">
          {question.question_text}
        </p>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => !showFeedback && !showExplanation && onAnswerSelect(option.value)}
            disabled={showFeedback || showExplanation}
            className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 touch-target ${getOptionStyle(option.value)} ${
              !showFeedback && !showExplanation ? 'hover:scale-[1.02] active:scale-[0.98]' : 'cursor-default'
            }`}
          >
            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5 ${getOptionCircleStyle(option.value)}`}>
                {String.fromCharCode(64 + option.value)}
              </div>
              <span className="flex-1 font-medium text-xs sm:text-sm leading-relaxed text-left">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>

      {(showFeedback || showExplanation) && question.explanation && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4">
          <h4 className="font-semibold text-blue-400 mb-2">Explanation</h4>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};