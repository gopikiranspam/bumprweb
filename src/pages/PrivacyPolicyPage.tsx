import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Mail } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';

export const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <Logo size="sm" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Shield size={20} className="text-lime-400" />
              <span>Privacy Policy</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <button
            onClick={() => navigate('/auth')}
            className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-2 px-4 rounded-lg transition-colors touch-target"
          >
            Login
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield size={32} className="text-lime-400" />
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-gray-400">Last updated: August 8, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 space-y-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Welcome to Bumpr.in. Your privacy is important to us.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>What We Do</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We provide mock tests and learning materials for the Learner's License (LLR) test based on the official RTO syllabus. Our content includes driving principles, road signs, safety information, application procedures, and FAQs related to Indian driving licenses and driving schools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Information We Collect</span>
              </h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Basic information like your email (if you sign up or contact us)</li>
                <li>Device/browser information for analytics</li>
                <li>Anonymous usage data via cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>How We Use the Information</span>
              </h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>To improve our content and user experience</li>
                <li>To respond to your queries and feedback</li>
                <li>To display relevant ads via Google AdSense</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <span>Google AdSense & Cookies</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use Google AdSense to show advertisements. Google may use cookies to serve ads based on your visits to our website and other websites on the Internet.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-300 mb-2">You can opt out of personalized advertising by visiting:</p>
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lime-400 hover:text-lime-300 underline font-medium"
                >
                  👉 https://www.google.com/settings/ads
                </a>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <span>Data Security</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We do not share your personal information with anyone except as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">6</span>
                <span>Third-party Links</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our site may contain links to other websites. We are not responsible for the privacy practices of those external sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">7</span>
                <span>Your Choices</span>
              </h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>You can clear or block cookies through your browser settings</li>
                <li>You can contact us to request removal of your personal data (if provided)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">8</span>
                <span>Contact Us</span>
              </h2>
              <div className="bg-lime-500/10 border border-lime-500/30 rounded-lg p-4">
                <p className="text-lime-300 mb-2">If you want to delete the account and have any questions please contact us:</p>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-lime-400" />
                  <a 
                    href="mailto:support@bumpr.in" 
                    className="text-lime-400 hover:text-lime-300 font-medium"
                  >
                    support@bumpr.in
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/guest-practice')}
            className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};