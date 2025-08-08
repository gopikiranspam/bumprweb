import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';

export const DisclaimerPage: React.FC = () => {
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
              <AlertTriangle size={20} className="text-yellow-400" />
              <span>Disclaimer</span>
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
            <AlertTriangle size={32} className="text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Disclaimer</h1>
          </div>
          <p className="text-gray-400">Last updated: August 8, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 space-y-8">
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Educational Purpose Only</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The content provided on Bumpr.in is intended for educational and informational purposes only. It is designed to help users prepare for the Learner's License (LLR) test and understand basic driving rules and procedures in India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>No Government Affiliation</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Bumpr.in is not affiliated with any government or RTO authority. We provide content based on publicly available data from official government sources.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>No Guarantee of Results</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                While we provide mock tests and study materials based on RTO syllabus, we do not guarantee that using our site will result in passing the official LLR test. Success depends on individual learning and understanding.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <span>External Links and Ads</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may show third-party advertisements or link to other websites. We do not control or endorse their content and are not responsible for any actions or damages that may arise from visiting those sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <span>Use at Your Own Risk</span>
              </h2>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-300 leading-relaxed">
                  By using this site, you acknowledge that you are using the content at your own risk. We are not liable for any loss, damages, or inconvenience caused by reliance on the information provided here.
                </p>
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