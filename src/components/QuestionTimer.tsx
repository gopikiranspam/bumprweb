import React, { useEffect, useState } from 'react';

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
    return `${seconds}s`;
  }, [isActive, onTimeUp]);

  return (
    <span className="text-gray-400 font-mono text-sm ml-2">
      [{formatTime(timeLeft)}]
    </span>
  );
};