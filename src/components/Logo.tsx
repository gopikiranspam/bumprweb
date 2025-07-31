import React from 'react';
import { Car } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl md:text-4xl',
  };

  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-lime-400 rounded-full blur-sm opacity-75"></div>
        <div className="relative bg-lime-400 p-2 rounded-full">
          <Car 
            size={iconSizes[size]} 
            className="text-black" 
            strokeWidth={2.5}
          />
        </div>
      </div>
      <span className={`font-bold text-white ${sizeClasses[size]} tracking-tight`}>
        Bumpr
      </span>
    </div>
  );
};