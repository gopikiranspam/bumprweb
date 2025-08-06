import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface QuestionTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

export const QuestionTimer: React.FC<QuestionTimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

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
  }, [isActive, onTimeUp]);

  const getTimerColor = () => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage <= 20) return 'text-red-400';
    if (percentage <= 50) return 'text-yellow-400';
    return 'text-lime-400';
  };

  const getProgressWidth = () => {
    return `${(timeLeft / duration) * 100}%`;
  };

  const getBgColor = () => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage <= 20) return 'bg-red-400';
    if (percentage <= 50) return 'bg-yellow-400';
    return 'bg-lime-400';
  };

  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Clock size={16} className={getTimerColor()} />
          <span className="text-white font-medium text-sm">Question Timer</span>
        </div>
        <span className={`font-mono text-lg font-bold ${getTimerColor()}`}>
          {timeLeft}s
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${getBgColor()}`}
          style={{ width: getProgressWidth() }}
        />
      </div>
    </div>
  );
};