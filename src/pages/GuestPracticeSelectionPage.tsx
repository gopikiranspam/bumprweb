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
    <div className="min-h-screen bg-black safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-800 safe-area-left safe-area-right">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/auth')}
            className="p-3 rounded-lg hover:bg-gray-800 transition-colors touch-target"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <Logo size="sm" />
        </div>
        <LanguageSelector />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 safe-area-left safe-area-right">
        {/* Hero Section with Key Selling Points */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              <span className="text-lime-400">Bumpr</span> <span className="text-white">India</span>
            </h1>
          </div>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
            India's #1 RTO Test Preparation Platform
          </p>
        </div>

        {/* Trusted Across India Section - Moved to Top */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 text-center flex items-center justify-center space-x-2">
            <div className="w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm"></div>
            <span>Trusted Across India</span>
          </h2>
          <div className="text-center space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-base sm:text-lg">
              All the questions and answers as per India Motor Vehicles Act, 1988
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <span className="bg-lime-400/10 text-lime-400 px-2 sm:px-3 py-1 rounded-full">Maharashtra</span>
              <span className="bg-lime-400/10 text-lime-400 px-2 sm:px-3 py-1 rounded-full">Karnataka</span>
              <span className="bg-lime-400/10 text-lime-400 px-2 sm:px-3 py-1 rounded-full">Tamil Nadu</span>
              <span className="bg-lime-400/10 text-lime-400 px-2 sm:px-3 py-1 rounded-full">Delhi</span>
              <span className="bg-lime-400/10 text-lime-400 px-2 sm:px-3 py-1 rounded-full">Gujarat</span>
              <span className="bg-lime-400/10 text-lime-400 px-2 sm:px-3 py-1 rounded-full">+ 23 More States</span>
            </div>
          </div>
        </div>

        {/* LLR Mock Test Button */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-lime-400/10 to-green-400/10 border border-lime-400/30 rounded-xl p-4 sm:p-6 text-center">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <Trophy size={32} className="text-lime-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">LLR Mock Test</h2>
            </div>
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              Take a comprehensive mock test with questions from all subjects (20 questions, 10 minutes)
            </p>
            <button
              onClick={() => navigate('/guest-mock-test')}
              className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors inline-flex items-center space-x-2 touch-target"
            >
              <Trophy size={20} />
              <span>Start Mock Test</span>
            </button>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {subjects.map((subject) => {
            const Icon = subject.icon;

            return (
              <div
                key={subject.id}
                className={`${subject.bgColor} border ${subject.borderColor} rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Icon size={24} className={subject.color} />
                  <h3 className="font-semibold text-white text-sm sm:text-base">{subject.name}</h3>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm">
                  {subject.description}
                </p>

                <button
                  onClick={() => navigate(`/guest-practice/${subject.id}`)}
                  className="w-full bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 touch-target"
                >
                  <Play size={16} />
                  <span>Start Practice</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* LLR Complete Syllabus Button */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-lime-400/10 to-green-400/10 border border-lime-400/30 rounded-xl p-4 sm:p-6 text-center">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <BookOpen size={32} className="text-lime-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">{t('llrCompleteSyllabus')}</h2>
            </div>
            <button
              onClick={() => navigate('/guest-study-guide')}
              className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors touch-target"
            >
              {t('start')}
            </button>
          </div>
        </div>

        {/* Guest Mode Notice - Moved to Bottom */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-6 sm:mt-8">
          <div className="flex items-start space-x-3">
            <User size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-400 mb-1 text-sm sm:text-base">Guest Mode</h3>
              <p className="text-yellow-300 text-xs sm:text-sm">
                You're practicing as a guest. Your progress and results won't be saved. 
                <button
                  onClick={() => navigate('/auth')}
                  className="text-yellow-400 hover:text-yellow-300 underline ml-1 touch-target"
                >
                  Sign up
                </button>
                {' '}to track your progress and access all features.
              </p>
            </div>
          </div>
        </div>

        {/* Professional Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 mt-12 sm:mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Company Info */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl font-bold">
                    <span className="text-lime-400">Bumpr</span> <span className="text-white">India</span>
                  </span>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">
                  India's #1 RTO Test Preparation Platform. Ace your driving license test with comprehensive mock tests.
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href="https://instagram.com/bumpr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-lime-400 transition-colors touch-target"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.218-3.323 1.218zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.875-.875-1.365-2.026-1.365-3.323s.49-2.448 1.365-3.323c.875-.926 2.026-1.416 3.323-1.416s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323z"/>
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/bumpr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-lime-400 transition-colors touch-target"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/bumpr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-lime-400 transition-colors touch-target"
                    aria-label="Twitter"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">Quick Links</h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/practice" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                      Practice Tests
                    </a>
                  </li>
                  <li>
                    <a href="/mock-test" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                      Mock Tests
                    </a>
                  </li>
                  <li>
                    <a href="/results" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                      Results
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">Legal</h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li>
                    <a href="/privacy-policy" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms-conditions" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="/refund-policy" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a href="/disclaimer" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                      Disclaimer
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">Contact</h3>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                  <p>Email: support@bumpr.in</p>
                  <p>Phone: +91 8185020283</p>
                  <p>Address: Hyderabad, Telangana, India, 500074</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-gray-400 text-xs sm:text-sm">
                © 2024 Bumpr India. All rights reserved.
              </p>
              <div className="flex space-x-4 sm:space-x-6">
                <a href="/sitemap" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                  Sitemap
                </a>
                <a href="/accessibility" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                  Accessibility
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-lime-400 transition-colors text-xs sm:text-sm touch-target">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};