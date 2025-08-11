import React from 'react';
import { Calendar, FileText, Trophy, Clock, Car, CheckCircle, Award } from 'lucide-react';

export const LicenseProcessFlowchart: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Book LLR Slot',
      icon: Calendar,
      hasButton: true
    },
    {
      id: 2,
      title: 'Pass LLR Exam',
      icon: FileText,
      hasButton: true
    },
    {
      id: 3,
      title: 'Get the LLR',
      icon: Trophy,
      hasButton: false
    },
    {
      id: 4,
      title: 'Wait 30 Days',
      icon: Clock,
      hasButton: false
    },
    {
      id: 5,
      title: 'Learn Driving',
      icon: Car,
      hasButton: true
    },
    {
      id: 6,
      title: 'Book Driving Test',
      icon: FileText,
      hasButton: true
    },
    {
      id: 7,
      title: 'Pass Driving Test',
      icon: CheckCircle,
      hasButton: false
    },
    {
      id: 8,
      title: 'Get Permanent License',
      icon: Award,
      hasButton: false
    }
  ];

  return (
    <section className="bg-gray-900 rounded-xl p-6 mt-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Your License Journey
        </h2>
        <p className="text-gray-400">
          8 simple steps to get your driving license
        </p>
      </div>

      {/* Desktop Flow - Single Row (Landscape only) */}
      <div className="hidden lg:landscape:block">
        <div className="flex items-start justify-between relative max-w-6xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-6 left-12 right-12 h-0.5 bg-gray-700 z-0"></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="relative flex flex-col items-center z-10 flex-1 max-w-28">
                {/* Step Circle */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 bg-gray-800 text-white border-2 border-gray-600">
                  <Icon size={20} />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-white font-medium text-xs mb-2 leading-tight min-h-[2.5rem] flex items-center justify-center">
                    {step.title}
                  </h3>
                  
                  {step.hasButton && (
                    <button className="bg-lime-400 hover:bg-lime-300 text-black font-medium text-xs py-1.5 px-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                      Learn
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Portrait Flow - Vertical */}
      <div className="block lg:landscape:hidden">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-6 w-0.5 h-8 bg-gray-700"></div>
                )}

                <div className="flex items-center space-x-4">
                  {/* Step Circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-gray-800 text-white border-2 border-gray-600">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-center justify-between">
                    <h3 className="text-white font-medium text-sm">
                      {step.title}
                    </h3>
                    
                    {step.hasButton && (
                      <button className="bg-lime-400 hover:bg-lime-300 text-black font-medium text-xs py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md touch-target">
                        Learn
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8 pt-6 border-t border-gray-700">
        <button className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
          Start Your Journey
        </button>
      </div>
    </section>
  );
};