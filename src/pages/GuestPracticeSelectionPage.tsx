import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Target, 
  Award,
  Play,
  ArrowLeft,
  User,
  AlertCircle,
  Trophy
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../contexts/LanguageProvider';

export const GuestPracticeSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const subjects = [
    {
      id: 'road_signs',
      name: t('roadSigns'),
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      description: 'Learn and practice road signs recognition',
    },
    {
      id: 'road_rules',
      name: t('trafficRules'),
      icon: BookOpen,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      description: 'Master traffic rules and regulations',
    },
    {
      id: 'driving_principles',
      name: t('drivingPrinciples'),
      icon: Award,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      description: 'Practice safe driving principles',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/auth')}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <Logo size="sm" />
        </div>
        <LanguageSelector />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Key Selling Points */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-8 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm border border-gray-300 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-white to-green-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-blue-800 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-800 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white">
              Bumpr <span className="text-lime-400">India</span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 mb-8">
            India's #1 RTO Test Preparation Platform
          </p>
          
          {/* Key Selling Points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">99%</div>
              <div className="text-green-300 text-sm">Pass Rate</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">5min</div>
              <div className="text-blue-300 text-sm">Daily Practice</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400 mb-1">All</div>
              <div className="text-purple-300 text-sm">Indian States</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-400 mb-1">RTO</div>
              <div className="text-orange-300 text-sm">Approved</div>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Insights
          </h1>
          <p className="text-gray-400 text-lg">
            All the questions and answers as per India Motor Vehicles Act, 1988
          </p>
        </div>

        {/* LLR Mock Test Button */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-lime-400/10 to-green-400/10 border border-lime-400/30 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Trophy size={32} className="text-lime-400" />
              <h2 className="text-2xl font-bold text-white">LLR Mock Test</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Take a comprehensive mock test with questions from all subjects (20 questions, 10 minutes)
            </p>
            <button
              onClick={() => navigate('/guest-mock-test')}
              className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-flex items-center space-x-2"
            >
              <Trophy size={20} />
              <span>Start Mock Test</span>
            </button>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {subjects.map((subject) => {
            const Icon = subject.icon;

            return (
              <div
                key={subject.id}
                className={`${subject.bgColor} border ${subject.borderColor} rounded-xl p-6 space-y-4`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={24} className={subject.color} />
                  <h3 className="font-semibold text-white">{subject.name}</h3>
                </div>

                <p className="text-gray-400 text-sm">
                  {subject.description}
                </p>

                <button
                  onClick={() => navigate(`/guest-practice/${subject.id}`)}
                  className="w-full bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Play size={16} />
                  <span>Start Practice</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Features Notice */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 text-center flex items-center justify-center space-x-2">
            <div className="w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm"></div>
            <span>Trusted Across India</span>
          </h2>
          <div className="text-center space-y-4">
            <p className="text-gray-300 text-lg">
              Questions validated by RTO authorities and updated according to the latest Motor Vehicles Act, 1988
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full">Maharashtra</span>
              <span className="bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full">Karnataka</span>
              <span className="bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full">Tamil Nadu</span>
              <span className="bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full">Delhi</span>
              <span className="bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full">Gujarat</span>
              <span className="bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full">+ 23 More States</span>
            </div>
          </div>
        </div>
        
        {/* Guest Mode Notice - Moved to Bottom */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-8">
          <div className="flex items-start space-x-3">
            <User size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-400 mb-1">Guest Mode</h3>
              <p className="text-yellow-300 text-sm">
                You're practicing as a guest. Your progress and results won't be saved. 
                <button
                  onClick={() => navigate('/auth')}
                  className="text-yellow-400 hover:text-yellow-300 underline ml-1"
                >
                  Sign up
                </button>
                {' '}to track your progress and access all features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};