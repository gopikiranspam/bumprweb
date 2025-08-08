import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Mail } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';

export const TermsConditionsPage: React.FC = () => {
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
              <FileText size={20} className="text-lime-400" />
              <span>Terms & Conditions</span>
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
            <FileText size={32} className="text-lime-400" />
            <h1 className="text-3xl font-bold text-white">Terms & Conditions</h1>
          </div>
          <p className="text-gray-400">Last updated: August 8, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 space-y-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Welcome to Bumpr.in. By accessing or using our website, you agree to the following terms and conditions. Please read them carefully.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Use of the Website</span>
              </h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>The content on this site is provided for educational purposes related to LLR preparation and driving knowledge.</li>
                <li>You agree not to use the website for any illegal or unauthorized activities.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Intellectual Property</span>
              </h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>All content, materials, and mock tests provided on Bumpr.in are the property of the website owner unless otherwise noted.</li>
                <li>Reproduction, redistribution, or commercial use without permission is prohibited.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>Accuracy of Information</span>
              </h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>We strive to provide accurate and updated information based on official sources.</li>
                <li>However, we do not guarantee 100% accuracy or completeness at all times.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <span>Ad Content</span>
              </h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>This site displays third-party ads via Google AdSense.</li>
                <li>We are not responsible for the content or actions of external advertisers.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <span>Changes to Terms</span>
              </h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>We may update these terms from time to time.</li>
                <li>Continued use of the website after changes implies your agreement to the updated terms.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">6</span>
                <span>Contact</span>
              </h2>
              <div className="bg-lime-500/10 border border-lime-500/30 rounded-lg p-4">
                <p className="text-lime-300 mb-2">If you have any questions or concerns, please contact us at:</p>
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