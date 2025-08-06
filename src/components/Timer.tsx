import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
  onTimeUpdate?: (remaining: number) => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive, onTimeUpdate }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev <= 1 ? 0 : prev - 1;
        if (onTimeUpdate) {
          onTimeUpdate(newTime);
        }
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Clock size={20} className={getTimerColor()} />
          <span className="text-white font-medium">Time Remaining</span>
        </div>
        <span className={`font-mono text-xl font-bold ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            timeLeft <= duration * 0.2 ? 'bg-red-400' :
            timeLeft <= duration * 0.5 ? 'bg-yellow-400' : 'bg-lime-400'
          }`}
          style={{ width: getProgressWidth() }}
        />
      </div>
    </div>
  );
};