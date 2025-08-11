import React from 'react';
import { Calendar, FileText, Trophy, Clock, Car, CheckCircle, Award } from 'lucide-react';

export const LicenseProcessFlowchart: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Book LLR Slot',
      icon: Calendar,
      type: 'step',
      hasButton: true
    },
    {
      id: 2,
      title: 'Pass LLR Exam',
      icon: FileText,
      type: 'step',
      hasButton: true
    },
    {
      id: 3,
      title: 'Get the LLR',
      icon: Trophy,
      type: 'milestone',
      hasButton: false
    },
    {
      id: 4,
      title: 'Wait 30 Days',
      icon: Clock,
      type: 'step',
      hasButton: false
    },
    {
      id: 5,
      title: 'Learn Driving',
      icon: Car,
      type: 'step',
      hasButton: true
    },
    {
      id: 6,
      title: 'Apply for Permanent License',
      icon: FileText,
      type: 'step',
      hasButton: true
    },
    {
      id: 7,
      title: 'Driving Test Passed',
      icon: CheckCircle,
      type: 'step',
      hasButton: false
    },
    {
      id: 8,
      title: 'Get Permanent License',
      icon: Award,
      type: 'milestone',
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

      {/* Desktop Flow - Single Row */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between relative">
          {/* Connection Line */}
          <div className="absolute top-6 left-12 right-12 h-0.5 bg-gray-700"></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isMilestone = step.type === 'milestone';
            
            return (
              <div key={step.id} className="relative flex flex-col items-center z-10">
                {/* Step Circle */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                  isMilestone 
                    ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/25' 
                    : 'bg-gray-800 text-white border-2 border-gray-600'
                }`}>
                  <Icon size={20} />
                </div>
                
                {/* Step Number */}
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  isMilestone ? 'bg-lime-300 text-black' : 'bg-gray-700 text-white'
                }`}>
                  {step.id}
                </div>

                {/* Content */}
                <div className="text-center max-w-24">
                  <h3 className="text-white font-medium text-sm mb-2 leading-tight">
                    {step.title}
                  </h3>
                  
                  {step.hasButton && (
                    <button className="bg-lime-400 hover:bg-lime-300 text-black font-medium py-1 px-3 rounded text-xs transition-colors">
                      Learn
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Flow - Vertical */}
      <div className="block lg:hidden">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isMilestone = step.type === 'milestone';
            
            return (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-6 w-0.5 h-8 bg-gray-700"></div>
                )}

                <div className="flex items-center space-x-4">
                  {/* Step Circle */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isMilestone 
                        ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/25' 
                        : 'bg-gray-800 text-white border-2 border-gray-600'
                    }`}>
                      <Icon size={20} />
                    </div>
                    
                    {/* Step Number */}
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      isMilestone ? 'bg-lime-300 text-black' : 'bg-gray-700 text-white'
                    }`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-center justify-between">
                    <h3 className="text-white font-medium text-sm">
                      {step.title}
                    </h3>
                    
                    {step.hasButton && (
                      <button className="bg-lime-400 hover:bg-lime-300 text-black font-medium py-1.5 px-3 rounded text-xs transition-colors">
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
        <button className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-2 px-6 rounded-lg transition-colors">
          Start Your Journey
        </button>
      </div>
    </section>
  );
};