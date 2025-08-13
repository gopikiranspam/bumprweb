import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, CheckCircle, Globe, FileText, CreditCard, BookOpen, MapPin, User } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';

export const TipsPage: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: 'Check Your State\'s Portal',
      icon: Globe,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      content: [
        'If your state has its own RTO website (like Telangana, Maharashtra, Karnataka, etc.), use that directly.',
        'If not, go to Sarathi Parivahan LLR Application.'
      ]
    },
    {
      id: 2,
      title: 'Prepare the Documents in Advance',
      icon: FileText,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      content: [
        'Aadhaar card (linked to mobile number for OTP)',
        'Age proof (Aadhaar, Passport, Birth Certificate, etc.)',
        'Address proof (Aadhaar, Voter ID, Utility Bill)',
        'Passport-size photo (digital)',
        'Medical certificate if required (Form 1A, for age 40+)'
      ]
    },
    {
      id: 3,
      title: 'Apply Online & Pay Fees',
      icon: CreditCard,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      content: [
        'Fill the form on the portal, upload documents, and pay ₹150–₹200 (state-dependent).',
        'Choose an exam slot that\'s earliest available (morning slots are usually less crowded).'
      ]
    },
    {
      id: 4,
      title: 'Prepare for the Test (1 Day)',
      icon: BookOpen,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      content: [
        'Use free mock tests from www.bumpr.in best RTO mock test preparation webapp for new applicants.',
        'Questions are mostly signs, rules, and road safety basics.'
      ]
    },
    {
      id: 5,
      title: 'Appear for the Test',
      icon: MapPin,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      content: [
        'Take your Aadhaar-linked ID, application receipt, and originals.',
        'If online test at RTO, you get results instantly—pass = licence issued same day digitally.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/guest-practice')}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <Logo size="sm" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Award size={20} className="text-lime-400" />
              <span>LLR Tips & Guidance</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-lg">
            <User size={16} className="text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Guest</span>
          </div>
          <button
            onClick={() => navigate('/auth')}
            className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-2 px-4 rounded-lg transition-colors touch-target"
          >
            Login
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Award size={32} className="text-lime-400" />
            <h1 className="text-3xl font-bold text-white">LLR Tips & Guidance</h1>
          </div>
          <p className="text-gray-400 text-lg">The fastest and most affordable way to get your Learner's Licence</p>
        </div>

        {/* Introduction */}
        <div className="bg-lime-500/10 border border-lime-500/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-lime-400 mb-4">Quick Overview</h2>
          <p className="text-lime-300 leading-relaxed">
            The fastest and most affordable way to get a Learner's Licence (LLR) in India is to apply directly online 
            through your state's official transport website or Sarathi Parivahan, and skip middlemen or driving schools 
            unless you need practical training.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Here's the optimal plan:</h2>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div
                key={step.id}
                className={`${step.bgColor} border ${step.borderColor} rounded-xl p-6 space-y-4`}
              >
                {/* Step Header */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-lime-400 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      {step.id}
                    </div>
                    <Icon size={24} className={step.color} />
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                </div>

                {/* Step Content */}
                <div className="ml-11 space-y-3">
                  {step.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle size={16} className="text-lime-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-gray-900 rounded-xl p-6 mt-8 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Ready to Start Your LLR Journey?</h3>
          <p className="text-gray-400 mb-6">
            Practice with our free mock tests to ensure you pass on your first attempt!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/guest-mock-test')}
              className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Take Mock Test
            </button>
            <button
              onClick={() => navigate('/guest-practice')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Practice by Subject
            </button>
          </div>
        </div>

        {/* Guest Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-6">
          <div className="flex items-start space-x-3">
            <User size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
            <div className="text-left">
              <h3 className="font-semibold text-yellow-400 mb-2">Guest Mode</h3>
              <p className="text-yellow-300 text-sm mb-3">
                You're viewing tips as a guest. Sign up to access personalized guidance and track your progress.
              </p>
              <button
                onClick={() => navigate('/auth')}
                className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 px-4 rounded-lg transition-colors text-sm"
              >
                <span>Sign up for personalized tips</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};