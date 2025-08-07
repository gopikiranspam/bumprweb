import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'te' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    appName: 'Bumpr',
    tagline: 'Ace Your Driving Test',
    welcome: 'Welcome to Bumpr',
    getStarted: 'Get Started',
    login: 'Login',
    register: 'Register',
    phoneNumber: 'Phone Number',
    enterOTP: 'Enter OTP',
    verify: 'Verify',
    continueWithGoogle: 'Continue with Google',
    dashboard: 'Dashboard',
    practiceTest: 'Practice Test',
    mockTest: 'Mock Test',
    progress: 'Progress',
    profile: 'Profile',
    roadSigns: 'Road Signs',
    trafficRules: 'Traffic Rules',
    drivingPrinciples: 'Safe Driving',
    startTest: 'Start Test',
    timeRemaining: 'Time Remaining',
    question: 'Question',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit Test',
    score: 'Score',
    passed: 'Passed',
    failed: 'Failed',
    tryAgain: 'Try Again',
    viewResults: 'View Results',
    explanation: 'Explanation',
    totalTests: 'Total Tests',
    averageScore: 'Average Score',
    bestScore: 'Best Score',
    passRate: 'Pass Rate',
    llrCompleteSyllabus: 'LLR Complete Syllabus',
    start: 'Start',
  },
  te: {
    appName: 'బంప్ర్',
    tagline: 'మీ డ్రైవింగ్ టెస్ట్‌లో విజయం సాధించండి',
    welcome: 'బంప్ర్‌కు స్వాగతం',
    getStarted: 'ప్రారంభించండి',
    login: 'లాగిన్',
    register: 'నమోదు',
    phoneNumber: 'ఫోన్ నంబర్',
    enterOTP: 'OTP నమోదు చేయండి',
    verify: 'ధృవీకరించండి',
    continueWithGoogle: 'గూగుల్‌తో కొనసాగించండి',
    dashboard: 'డాష్‌బోర్డ్',
    practiceTest: 'అభ్యాస పరీక్ష',
    mockTest: 'మాక్ టెస్ట్',
    progress: 'పురోగతి',
    profile: 'ప్రొఫైల్',
    roadSigns: 'రోడ్ సంకేతాలు',
    trafficRules: 'ట్రాఫిక్ నియమాలు',
    drivingPrinciples: 'సురక్షిత డ్రైవింగ్',
    startTest: 'పరీక్ష ప్రారంభించండి',
    timeRemaining: 'మిగిలిన సమయం',
    question: 'ప్రశ్న',
    next: 'తదుపరి',
    previous: 'మునుపటి',
    submit: 'పరీక్ష జమ చేయండి',
    score: 'స్కోర్',
    passed: 'ఉత్తీర్ణత',
    failed: 'అనుత్తీర్ణత',
    tryAgain: 'మళ్లీ ప్రయత్నించండి',
    viewResults: 'ఫలితాలు చూడండి',
    explanation: 'వివరణ',
    totalTests: 'మొత్తం పరీక్షలు',
    averageScore: 'సగటు స్కోర్',
    bestScore: 'అత్యుత్తమ స్కోర్',
    passRate: 'ఉత్తీర్ణత రేటు',
    llrCompleteSyllabus: 'LLR పూర్తి సిలబస్',
    start: 'ప్రారంభించండి',
  },
  hi: {
    appName: 'बम्पर',
    tagline: 'अपने ड्राइविंग टेस्ट में सफलता पाएं',
    welcome: 'बम्पर में आपका स्वागत है',
    getStarted: 'शुरू करें',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    phoneNumber: 'फोन नंबर',
    enterOTP: 'OTP दर्ज करें',
    verify: 'सत्यापित करें',
    continueWithGoogle: 'गूगल के साथ जारी रखें',
    dashboard: 'डैशबोर्ड',
    practiceTest: 'अभ्यास परीक्षा',
    mockTest: 'मॉक टेस्ट',
    progress: 'प्रगति',
    profile: 'प्रोफाइल',
    roadSigns: 'सड़क संकेत',
    trafficRules: 'ट्रैफिक नियम',
    drivingPrinciples: 'सुरक्षित ड्राइविंग',
    startTest: 'परीक्षा शुरू करें',
    timeRemaining: 'बचा हुआ समय',
    question: 'प्रश्न',
    next: 'अगला',
    previous: 'पिछला',
    submit: 'परीक्षा जमा करें',
    score: 'स्कोर',
    passed: 'उत्तीर्ण',
    failed: 'अनुत्तीर्ण',
    tryAgain: 'फिर से कोशिश करें',
    viewResults: 'परिणाम देखें',
    explanation: 'व्याख्या',
    totalTests: 'कुल परीक्षाएं',
    averageScore: 'औसत स्कोर',
    bestScore: 'सर्वोत्तम स्कोर',
    passRate: 'पास दर',
    llrCompleteSyllabus: 'LLR पूर्ण पाठ्यक्रम',
    start: 'शुरू करें',
  },
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('bumpr_language') as Language;
    if (savedLanguage && ['en', 'te', 'hi'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('bumpr_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};