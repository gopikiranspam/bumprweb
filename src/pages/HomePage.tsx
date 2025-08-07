import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Target, 
  Award,
  Play,
  User,
  Trophy,
  CheckCircle,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageProvider';
import { useAuth } from '../hooks/useAuth';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();

  // Redirect authenticated users to dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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

  const features = [
    {
      icon: CheckCircle,
      title: 'Official Questions',
      description: 'Questions as per India Motor Vehicles Act, 1988'
    },
    {
      icon: Users,
      title: 'Multi-Language Support',
      description: 'Available in English, Hindi, and Telugu'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics'
    },
    {
      icon: Star,
      title: 'High Success Rate',
      description: 'Join thousands who passed their RTO test'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-14 sm:pt-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                <span className="text-lime-400">Bumpr</span>{' '}
                <span className="text-white">India</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
                India's #1 RTO Test Preparation Platform
              </p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Ace your driving license test with comprehensive mock tests in multiple languages
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors touch-target"
              >
                Get Started - Sign Up
              </button>
              <button
                onClick={() => navigate('/guest-practice')}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors touch-target"
              >
                Try as Guest
              </button>
            </div>
          </div>
        </div>

        {/* Trusted Across India Section */}
        <div className="bg-gray-900/50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center space-x-3">
                <div className="w-8 h-6 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm"></div>
                <span>Trusted Across India</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                All questions and answers as per India Motor Vehicles Act, 1988
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Gujarat', 'Telangana', 'Andhra Pradesh', '+ 21 More States'].map((state) => (
                <span
                  key={state}
                  className="bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full text-sm"
                >
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Why Choose Bumpr?</h2>
              <p className="text-gray-400 text-lg">Everything you need to pass your RTO test</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-gray-900 rounded-xl p-6 text-center">
                    <div className="bg-lime-400/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-lime-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="py-12 sm:py-16 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Start Practicing Now</h2>
              <p className="text-gray-400 text-lg">Choose your preferred way to prepare</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Mock Test */}
              <div className="bg-gradient-to-r from-lime-400/10 to-green-400/10 border border-lime-400/30 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Trophy size={32} className="text-lime-400" />
                  <h3 className="text-xl font-bold text-white">LLR Mock Test</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Complete mock test with 20 questions from all subjects
                </p>
                <button
                  onClick={() => navigate('/guest-mock-test')}
                  className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Start Mock Test
                </button>
              </div>

              {/* Study Guide */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen size={32} className="text-blue-400" />
                  <h3 className="text-xl font-bold text-white">LLR Syllabus Book</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Complete study guide with all questions and explanations
                </p>
                <button
                  onClick={() => navigate('/guest-study-guide')}
                  className="bg-blue-400 hover:bg-blue-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Start Reading
                </button>
              </div>
            </div>

            {/* Subject Practice */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <div
                    key={subject.id}
                    className={`${subject.bgColor} border ${subject.borderColor} rounded-xl p-6`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon size={24} className={subject.color} />
                      <h3 className="font-semibold text-white">{subject.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      {subject.description}
                    </p>
                    <button
                      onClick={() => navigate(`/guest-practice/${subject.id}`)}
                      className="w-full bg-lime-400 hover:bg-lime-300 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Practice Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">
                    <span className="text-lime-400">Bumpr</span> <span className="text-white">India</span>
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  India's #1 RTO Test Preparation Platform. Ace your driving license test with comprehensive mock tests.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/practice" className="text-gray-400 hover:text-lime-400 transition-colors text-sm">Practice Tests</a></li>
                  <li><a href="/mock-test" className="text-gray-400 hover:text-lime-400 transition-colors text-sm">Mock Tests</a></li>
                  <li><a href="/study-guide" className="text-gray-400 hover:text-lime-400 transition-colors text-sm">Study Guide</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="/privacy" className="text-gray-400 hover:text-lime-400 transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-400 hover:text-lime-400 transition-colors text-sm">Terms & Conditions</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Contact</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Email: support@bumpr.in</p>
                  <p>Phone: +91 8185020283</p>
                  <p>Hyderabad, Telangana, India</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-6 text-center">
              <p className="text-gray-400 text-sm">
                © 2024 Bumpr India. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};