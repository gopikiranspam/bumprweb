import React from 'react';
import { Calendar, FileText, Trophy, Clock, Car, CheckCircle, Award } from 'lucide-react';

export const LicenseProcessFlowchart: React.FC = () => {
  const steps = [
    {
      id: 1,
      type: 'step',
      title: 'Book LLR Slot',
      description: 'Schedule your learner\'s license test appointment',
      icon: Calendar,
      color: 'blue',
      hasButton: true
    },
    {
      id: 2,
      type: 'step',
      title: 'Pass LLR Exam',
      description: 'Take and pass the written test',
      icon: FileText,
      color: 'green',
      hasButton: true
    },
    {
      id: 3,
      type: 'milestone',
      title: 'Get the LLR',
      description: 'Receive your Learner\'s License',
      icon: Trophy,
      color: 'lime',
      hasButton: false
    },
    {
      id: 4,
      type: 'step',
      title: 'Wait 30 Days',
      description: 'Mandatory waiting period before permanent license',
      icon: Clock,
      color: 'yellow',
      hasButton: false
    },
    {
      id: 5,
      type: 'step',
      title: 'Learn Driving',
      description: 'Practice driving with a qualified instructor',
      icon: Car,
      color: 'purple',
      hasButton: true
    },
    {
      id: 6,
      type: 'step',
      title: 'Apply for Permanent License',
      description: 'Submit application for permanent driving license',
      icon: FileText,
      color: 'indigo',
      hasButton: true
    },
    {
      id: 7,
      type: 'step',
      title: 'Driving Test Passed',
      description: 'Successfully complete the practical driving test',
      icon: CheckCircle,
      color: 'green',
      hasButton: false
    },
    {
      id: 8,
      type: 'milestone',
      title: 'Get Permanent License',
      description: 'Receive your permanent driving license',
      icon: Award,
      color: 'lime',
      hasButton: false
    }
  ];

  const getColorClasses = (color: string, type: string) => {
    const baseColors = {
      blue: type === 'milestone' ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      green: type === 'milestone' ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'bg-green-500/10 border-green-500/30 text-green-400',
      lime: type === 'milestone' ? 'bg-lime-400/20 border-lime-400/50 text-lime-400' : 'bg-lime-500/10 border-lime-500/30 text-lime-400',
      yellow: type === 'milestone' ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      purple: type === 'milestone' ? 'bg-purple-500/20 border-purple-500/40 text-purple-400' : 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      indigo: type === 'milestone' ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400' : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
    };
    return baseColors[color as keyof typeof baseColors] || baseColors.blue;
  };

  const getIconBgColor = (color: string, type: string) => {
    const iconColors = {
      blue: type === 'milestone' ? 'bg-blue-500/30' : 'bg-blue-500/20',
      green: type === 'milestone' ? 'bg-green-500/30' : 'bg-green-500/20',
      lime: type === 'milestone' ? 'bg-lime-400/30' : 'bg-lime-500/20',
      yellow: type === 'milestone' ? 'bg-yellow-500/30' : 'bg-yellow-500/20',
      purple: type === 'milestone' ? 'bg-purple-500/30' : 'bg-purple-500/20',
      indigo: type === 'milestone' ? 'bg-indigo-500/30' : 'bg-indigo-500/20'
    };
    return iconColors[color as keyof typeof iconColors] || iconColors.blue;
  };

  return (
    <section className="bg-gray-900 rounded-xl p-6 sm:p-8 mt-6 sm:mt-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Your Complete License Journey
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Follow these 8 simple steps to get your driving license in India. 
          From booking your LLR slot to receiving your permanent license.
        </p>
      </div>

      {/* Desktop Flow - Horizontal */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-700 via-lime-400/30 to-gray-700"></div>
          
          {/* Steps Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {steps.slice(0, 4).map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative">
                  {/* Step Card */}
                  <div className={`${getColorClasses(step.color, step.type)} border-2 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                    step.type === 'milestone' ? 'shadow-lg shadow-lime-400/10' : ''
                  }`}>
                    {/* Step Number */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className={`w-6 h-6 rounded-full ${step.type === 'milestone' ? 'bg-lime-400 text-black' : 'bg-gray-700 text-white'} flex items-center justify-center text-xs font-bold`}>
                        {step.id}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className={`${getIconBgColor(step.color, step.type)} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      step.type === 'milestone' ? 'animate-pulse' : ''
                    }`}>
                      <Icon size={24} />
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-white text-sm mb-2">{step.title}</h3>
                    <p className="text-gray-300 text-xs mb-3 leading-relaxed">{step.description}</p>

                    {/* Button */}
                    {step.hasButton && (
                      <button className="bg-lime-400 hover:bg-lime-300 text-black font-medium py-1.5 px-3 rounded-lg text-xs transition-colors">
                        Learn More
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-4 gap-6">
            {steps.slice(4, 8).map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative">
                  {/* Step Card */}
                  <div className={`${getColorClasses(step.color, step.type)} border-2 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                    step.type === 'milestone' ? 'shadow-lg shadow-lime-400/10' : ''
                  }`}>
                    {/* Step Number */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className={`w-6 h-6 rounded-full ${step.type === 'milestone' ? 'bg-lime-400 text-black' : 'bg-gray-700 text-white'} flex items-center justify-center text-xs font-bold`}>
                        {step.id}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className={`${getIconBgColor(step.color, step.type)} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      step.type === 'milestone' ? 'animate-pulse' : ''
                    }`}>
                      <Icon size={24} />
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-white text-sm mb-2">{step.title}</h3>
                    <p className="text-gray-300 text-xs mb-3 leading-relaxed">{step.description}</p>

                    {/* Button */}
                    {step.hasButton && (
                      <button className="bg-lime-400 hover:bg-lime-300 text-black font-medium py-1.5 px-3 rounded-lg text-xs transition-colors">
                        Learn More
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connecting Arrow */}
          <div className="absolute top-32 right-6 transform rotate-90">
            <div className="w-8 h-8 border-r-2 border-b-2 border-lime-400 transform rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Tablet Flow - 2x4 Grid */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className={`absolute ${index % 2 === 0 ? 'top-1/2 -right-3 w-6 h-0.5' : 'top-full left-1/2 w-0.5 h-6'} bg-lime-400/30`}></div>
                )}

                {/* Step Card */}
                <div className={`${getColorClasses(step.color, step.type)} border-2 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                  step.type === 'milestone' ? 'shadow-lg shadow-lime-400/10' : ''
                }`}>
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className={`w-6 h-6 rounded-full ${step.type === 'milestone' ? 'bg-lime-400 text-black' : 'bg-gray-700 text-white'} flex items-center justify-center text-xs font-bold`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`${getIconBgColor(step.color, step.type)} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    step.type === 'milestone' ? 'animate-pulse' : ''
                  }`}>
                    <Icon size={24} />
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-white text-sm mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-xs mb-3 leading-relaxed">{step.description}</p>

                  {/* Button */}
                  {step.hasButton && (
                    <button className="bg-lime-400 hover:bg-lime-300 text-black font-medium py-1.5 px-3 rounded-lg text-xs transition-colors">
                      Learn More
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Flow - Vertical */}
      <div className="block md:hidden">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-lime-400/30"></div>
                )}

                {/* Step Card */}
                <div className={`${getColorClasses(step.color, step.type)} border-2 rounded-xl p-4 transition-all duration-300 ${
                  step.type === 'milestone' ? 'shadow-lg shadow-lime-400/10' : ''
                }`}>
                  <div className="flex items-start space-x-4">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full ${step.type === 'milestone' ? 'bg-lime-400 text-black' : 'bg-gray-700 text-white'} flex items-center justify-center text-xs font-bold mb-2`}>
                        {step.id}
                      </div>
                      <div className={`${getIconBgColor(step.color, step.type)} w-10 h-10 rounded-full flex items-center justify-center ${
                        step.type === 'milestone' ? 'animate-pulse' : ''
                      }`}>
                        <Icon size={20} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm mb-1">{step.title}</h3>
                      <p className="text-gray-300 text-xs mb-3 leading-relaxed">{step.description}</p>

                      {/* Button */}
                      {step.hasButton && (
                        <button className="bg-lime-400 hover:bg-lime-300 text-black font-medium py-1.5 px-3 rounded-lg text-xs transition-colors">
                          Learn More
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8 sm:mt-12 pt-6 border-t border-gray-700">
        <p className="text-gray-400 text-sm mb-4">
          Ready to start your driving license journey?
        </p>
        <button className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-6 rounded-lg transition-colors">
          Begin Your Journey
        </button>
      </div>
    </section>
  );
};