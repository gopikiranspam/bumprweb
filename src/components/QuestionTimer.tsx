import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface QuestionTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
  questionIndex: number; // to reset timer when question changes
}

export const QuestionTimer: React.FC<QuestionTimerProps> = ({ 
  duration, 
  onTimeUp, 
  isActive, 
  questionIndex 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [questionIndex, duration]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp, questionIndex]);

  const getTimerColor = () => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage <= 20) return 'text-red-400';
    if (percentage <= 50) return 'text-yellow-400';
    return 'text-lime-400';
  };

  const getProgressWidth = () => {
    return `${(timeLeft / duration) * 100}%`;
  };

  return (
    <div className="bg-gray-800 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Clock size={16} className={getTimerColor()} />
          <span className="text-white text-sm font-medium">Question Timer</span>
        </div>
        <span className={`font-mono text-lg font-bold ${getTimerColor()}`}>
          {timeLeft}s
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full transition-all duration-1000 ${
            timeLeft <= duration * 0.2 ? 'bg-red-400' :
            timeLeft <= duration * 0.5 ? 'bg-yellow-400' : 'bg-lime-400'
          }`}
          style={{ width: getProgressWidth() }}
        />
      </div>
    </div>
  );
};