import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Loader2 } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageProvider';
import { toast } from 'react-toastify';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signInWithPhone, verifyOTP, signInWithGoogle } = useAuth();
  const { t } = useLanguage();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = phoneNumber.startsWith('+91') 
        ? phoneNumber 
        : `+91${phoneNumber}`;
      
      const { error } = await signInWithPhone(formattedPhone);
      
      if (error) throw error;
      
      setStep('otp');
      toast.success('OTP sent successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 4) {
      toast.error('Please enter a valid 4-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = phoneNumber.startsWith('+91') 
        ? phoneNumber 
        : `+91${phoneNumber}`;
      
      const { error } = await verifyOTP(formattedPhone, otp);
      
      if (error) throw error;
      
      // Check if user needs to complete profile
      // This would be handled by the auth state change
    } catch (error: any) {
      toast.error(error.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <Logo size="md" />
        <LanguageSelector />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">
              {t('welcome')}
            </h1>
            <p className="text-gray-400 text-lg">
              {t('tagline')}
            </p>
          </div>

          {/* Auth Forms */}
          <div className="bg-gray-900 rounded-2xl p-6 space-y-6">
            {step === 'phone' && (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    {t('phoneNumber')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !phoneNumber}
                  className="w-full bg-lime-400 hover:bg-lime-300 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <span>Send OTP</span>
                  )}
                </button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleOTPVerify} className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    {t('enterOTP')}
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="4-digit code"
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white text-center text-xl tracking-widest placeholder-gray-400 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                    maxLength={4}
                    disabled={loading}
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Sent to +91{phoneNumber}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 4}
                  className="w-full bg-lime-400 hover:bg-lime-300 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <span>{t('verify')}</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="w-full text-lime-400 hover:text-lime-300 font-medium py-2 transition-colors"
                >
                  Change phone number
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">or</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Mail size={20} />
              <span>{t('continueWithGoogle')}</span>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-400 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};