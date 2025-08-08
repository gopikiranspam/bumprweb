import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Target, Users, Mail, CheckCircle } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';

export const AboutPage: React.FC = () => {
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
              <Heart size={20} className="text-lime-400" />
              <span>About Us</span>
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
            <Heart size={32} className="text-lime-400" />
            <h1 className="text-3xl font-bold text-white">About Us</h1>
          </div>
          <p className="text-gray-400 text-lg">Making driving license preparation simple and accessible for everyone</p>
        </div>

        {/* Hero Quote */}
        <div className="bg-gradient-to-r from-lime-500/10 to-green-500/10 border border-lime-500/30 rounded-xl p-6 sm:p-8 mb-8">
          <blockquote className="text-xl sm:text-2xl font-medium text-white text-center italic mb-4">
            "I struggled to pass my LLR exam. Not because I didn't try — but because I didn't know where to start."
          </blockquote>
          <p className="text-gray-300 text-center">
            Hi, I'm the creator of Bumpr.in, and just like you, I once found the process of getting a Learner's License (LLR) confusing, frustrating, and overwhelming.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Target size={24} className="text-lime-400" />
            <span>My Story</span>
          </h2>
          
          <div className="space-y-4 text-gray-300">
            <p className="leading-relaxed">When I wanted to apply for my LLR:</p>
            
            <ul className="space-y-3 list-none">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>I didn't know how to apply</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>I couldn't find a trusted website with complete, clear information</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>I had no idea about the LLR syllabus, test format, or even fees</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>I searched for mock tests, road signs practice, and driving basics, but most sites were either outdated, incomplete, or filled with ads</span>
              </li>
            </ul>
            
            <p className="leading-relaxed font-medium text-lime-300 mt-6">
              That struggle made me realize — if I'm facing this, millions of people across India probably are too.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Target size={24} className="text-lime-400" />
            <span>Our Mission</span>
          </h2>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            That's why I created Bumpr.in — to make it easy, clear, and stress-free for anyone to learn about:
          </p>
          
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-lime-400 mt-0.5 flex-shrink-0" />
              <span>How to apply for a Learner's License (LLR) and Permanent License</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-lime-400 mt-0.5 flex-shrink-0" />
              <span>What's included in the LLR syllabus (as per the official Motor Vehicles Act, 1988)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-lime-400 mt-0.5 flex-shrink-0" />
              <span>Free mock tests designed to match the real exam</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-lime-400 mt-0.5 flex-shrink-0" />
              <span>Practice for road signs, driving rules, and safety</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-lime-400 mt-0.5 flex-shrink-0" />
              <span>FAQs and step-by-step guidance on every stage — from LLR to permanent driving license</span>
            </li>
          </ul>
        </div>

        {/* Why Different Section */}
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Why Bumpr.in Is Different</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-lime-500/10 border border-lime-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-lime-400 mb-2">Simple language, not confusing jargon</h3>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Based on real RTO syllabus – no guesswork</h3>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-green-400 mb-2">100% free to practice – no hidden charges</h3>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">Works great on mobile – learn anytime, anywhere</h3>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 sm:col-span-2">
              <h3 className="font-semibold text-yellow-400 mb-2">Built by someone who's been in your shoes</h3>
            </div>
          </div>
        </div>

        {/* Who We Help Section */}
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Users size={24} className="text-lime-400" />
            <span>Who We Help</span>
          </h2>
          
          <p className="text-gray-300 leading-relaxed mb-4">Whether you're:</p>
          
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>A student learning to drive for the first time</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>A working professional applying for a license after years of delay</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>A parent helping your child pass the LLR</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Or someone who simply wants to drive legally and safely</span>
            </li>
          </ul>
          
          <p className="text-lime-300 font-medium mt-6">Bumpr.in is here for you.</p>
        </div>

        {/* Vision Section */}
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Our Vision</h2>
          
          <p className="text-gray-300 leading-relaxed mb-4">
            We want to become India's most trusted learning platform for driving-related education — not just for LLR, but for all things driving:
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Test preparation</h3>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Licensing updates</h3>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Road safety awareness</h3>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Driving school guidance</h3>
            </div>
          </div>
          
          <p className="text-lime-300 font-medium mt-6 text-center">
            Because every Indian deserves to drive confidently, legally, and safely.
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-lime-500/10 to-green-500/10 border border-lime-500/30 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Join Us on the Journey</h2>
          
          <div className="space-y-4 text-gray-300 text-center">
            <p>If you've struggled, you're not alone.</p>
            <p>If you've passed your test because of Bumpr.in, tell others.</p>
            <p>And if you're just starting — we're here to guide you, step-by-step.</p>
          </div>
          
          <p className="text-lime-300 font-semibold text-center mt-6">
            Thanks for being part of this mission.
          </p>
          <p className="text-white font-bold text-center text-lg mt-2">
            Let's get India driving smart and safe — one learner at a time.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Questions? Suggestions?</h2>
          
          <div className="text-center">
            <p className="text-gray-300 mb-4">Reach out to us at:</p>
            <div className="flex items-center justify-center space-x-2">
              <Mail size={20} className="text-lime-400" />
              <a 
                href="mailto:support@bumpr.in" 
                className="text-lime-400 hover:text-lime-300 font-medium text-lg"
              >
                support@bumpr.in
              </a>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <button
            onClick={() => navigate('/guest-practice')}
            className="bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};