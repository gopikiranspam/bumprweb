import React, { useState } from 'react';
import { Calendar, FileText, Trophy, Clock, Car, CheckCircle, Award, Info } from 'lucide-react';

export const LicenseProcessFlowchart: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const steps = [
    {
      id: 1,
      title: 'Book LLR Slot',
      icon: Calendar,
      hasButton: true,
      buttonText: 'Apply Now',
      buttonStyle: 'bg-gray-700 hover:bg-gray-600 text-white'
    },
    {
      id: 2,
      title: 'Pass LLR Exam',
      icon: FileText,
      hasButton: true,
      buttonText: 'Mock Test',
      buttonStyle: 'bg-gray-700 hover:bg-gray-600 text-white'
    },
    {
      id: 3,
      title: 'Get the LLR',
      icon: Trophy,
      hasButton: false,
      hasTooltip: true,
      tooltipText: 'You can apply for a permanent license after 30 days from the date of LLR issuance but within the 180-day validity period.'
    },
    {
      id: 4,
      title: 'Wait 30 Days',
      icon: Clock,
      hasButton: false,
      hasTooltip: true,
      tooltipText: 'You can apply for a permanent license after 30 days from the date of LLR issuance but within the 180-day validity period.'
    },
    {
      id: 5,
      title: 'Learn Driving',
      icon: Car,
      hasButton: true,
      buttonText: 'Find Tutor',
      buttonStyle: 'bg-gray-700 hover:bg-gray-600 text-white'
    },
    {
      id: 6,
      title: 'Book Driving Test',
      icon: FileText,
      hasButton: true,
      buttonText: 'Apply Now',
      buttonStyle: 'bg-gray-700 hover:bg-gray-600 text-white'
    },
    {
      id: 7,
      title: 'Pass Driving Test',
      icon: CheckCircle,
      hasButton: false,
      hasTooltip: true,
      tooltipText: 'You will get the license through post at your mentioned address'
    },
    {
      id: 8,
      title: 'Get Permanent License',
      icon: Award,
      hasButton: false
    }
  ];

  const handleTooltipToggle = (stepId: string) => {
    setActiveTooltip(activeTooltip === stepId ? null : stepId);
  };

  return (
    <section className="bg-gray-900 rounded-xl p-4 sm:p-6 mt-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
          Your License Journey
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-400">
          8 simple steps to get your driving license
        </p>
      </div>

      {/* Vertical Flow for All Devices */}
      <div className="space-y-3 sm:space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const tooltipId = `tooltip-${step.id}`;
          
          return (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-6 w-0.5 h-6 sm:h-8 bg-gray-700 z-0"></div>
              )}

              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Step Circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-gray-800 text-white border-2 border-gray-600">
                    <Icon size={20} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-medium text-sm sm:text-base lg:text-lg">
                      {step.title}
                    </h3>
                    
                    {/* Info Icon with Tooltip */}
                    {step.hasTooltip && (
                      <div className="relative">
                        <button
                          onClick={() => handleTooltipToggle(tooltipId)}
                          onMouseEnter={() => setActiveTooltip(tooltipId)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded-full hover:bg-blue-400/10"
                          aria-label="More information"
                        >
                          <Info size={16} />
                        </button>
                        
                        {/* Tooltip */}
                        {activeTooltip === tooltipId && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20">
                            <div className="bg-gray-800 text-white text-xs rounded-lg p-3 shadow-lg border border-gray-600 max-w-xs">
                              <div className="relative">
                                {step.tooltipText}
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Modern Button */}
                  {step.hasButton && (
                    <button className={`${step.buttonStyle} font-medium text-xs py-1 px-3 rounded-md transition-colors touch-target`}>
                      {step.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};