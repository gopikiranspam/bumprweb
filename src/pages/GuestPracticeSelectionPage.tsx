import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Target, 
  Award,
  Play,
  ArrowLeft,
  User,
  AlertCircle
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
        {/* Guest Mode Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8">
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

        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Practice Tests
          </h1>
          <p className="text-gray-400 text-lg">
            Choose a subject to start practicing for your driving test
          </p>
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
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <AlertCircle size={20} className="text-lime-400" />
            <span>Guest Practice Features</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-lime-400">Available:</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Practice questions in all subjects</li>
                <li>• Multi-language support</li>
                <li>• Instant feedback and explanations</li>
                <li>• Unlimited practice attempts</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-red-400">Not Available:</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Progress tracking</li>
                <li>• Test result history</li>
                <li>• Performance analytics</li>
                <li>• Personalized recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};