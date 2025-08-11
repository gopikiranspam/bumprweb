import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageProvider';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 sm:space-x-2 bg-gray-800 hover:bg-gray-700 px-2 sm:px-3 py-2 rounded-lg transition-colors touch-target"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={16} className="text-lime-400" />
        <span className="text-xs sm:text-sm font-medium text-white min-w-[2rem] sm:min-w-[3rem]">
          {currentLanguage?.native}
        </span>
        <ChevronDown 
          size={12} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-full mt-2 w-36 sm:w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'en' | 'te' | 'hi');
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 sm:px-4 py-3 text-xs sm:text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors touch-target ${
                  language === lang.code 
                    ? 'bg-lime-400/10 text-lime-400' 
                    : 'text-white'
                }`}
                role="option"
                aria-selected={language === lang.code}
              >
                <div className="font-medium">{lang.native}</div>
                <div className="text-xs text-gray-400 hidden sm:block">{lang.name}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};