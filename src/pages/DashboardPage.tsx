import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  Play,
  BarChart3,
  User,
  Settings
} from 'lucide-react';
import { Header } from '../components/Header';
import { DiagnosticsPanel } from '../components/DiagnosticsPanel';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageProvider';
import { db } from '../lib/supabase';
import { UserProgress, TestResult } from '../types';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [recentTests, setRecentTests] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const [progressResult, testsResult] = await Promise.all([
        db.getUserProgress(user.id),
        db.getUserTestResults(user.id, 5)
      ]);

      if (progressResult.data) {
        setProgress(progressResult.data);
      }

      if (testsResult.data) {
        setRecentTests(testsResult.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    {
      id: 'road_signs',
      name: t('roadSigns'),
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 'road_rules',
      name: t('trafficRules'),
      icon: BookOpen,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      id: 'driving_principles',
      name: t('drivingPrinciples'),
      icon: Award,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
  ];

  const getSubjectProgress = (subjectId: string) => {
    return progress.find(p => p.subject === subjectId);
  };

  const calculateOverallStats = () => {
    if (progress.length === 0) {
      return {
        totalTests: 0,
        averageScore: 0,
        passRate: 0,
        totalTime: 0
      };
    }

    const totalTests = progress.reduce((sum, p) => sum + p.total_tests_taken, 0);
    const totalPassed = progress.reduce((sum, p) => sum + p.tests_passed, 0);
    const totalScore = progress.reduce((sum, p) => sum + (p.average_score * p.total_tests_taken), 0);
    const totalTime = progress.reduce((sum, p) => sum + p.total_time_spent, 0);

    return {
      totalTests,
      averageScore: totalTests > 0 ? totalScore / totalTests : 0,
      passRate: totalTests > 0 ? (totalPassed / totalTests) * 100 : 0,
      totalTime
    };
  };

  const overallStats = calculateOverallStats();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-14 sm:pt-16">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.full_name}!
              </h1>
              <p className="text-gray-400">
                Ready to continue your driving test preparation?
              </p>
            </div>
            <button
              onClick={() => setShowDiagnostics(!showDiagnostics)}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <Settings size={16} />
              <span className="hidden sm:inline">Diagnostics</span>
            </button>
          </div>
        </div>

        {/* Diagnostics Panel */}
        {showDiagnostics && (
          <div className="mb-8">
            <DiagnosticsPanel />
          </div>
        )}

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-lime-400/10 p-2 rounded-lg">
                <BarChart3 size={20} className="text-lime-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {overallStats.totalTests}
                </div>
                <div className="text-gray-400 text-sm">{t('totalTests')}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-400/10 p-2 rounded-lg">
                <Target size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {Math.round(overallStats.averageScore)}%
                </div>
                <div className="text-gray-400 text-sm">{t('averageScore')}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-400/10 p-2 rounded-lg">
                <Award size={20} className="text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {Math.round(overallStats.passRate)}%
                </div>
                <div className="text-gray-400 text-sm">{t('passRate')}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-400/10 p-2 rounded-lg">
                <Clock size={20} className="text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {formatTime(overallStats.totalTime)}
                </div>
                <div className="text-gray-400 text-sm">Study Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {subjects.map((subject) => {
            const subjectProgress = getSubjectProgress(subject.id);
            const Icon = subject.icon;

            return (
              <div
                key={subject.id}
                className={`${subject.bgColor} border ${subject.borderColor} rounded-xl p-6 space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon size={24} className={subject.color} />
                    <h3 className="font-semibold text-white">{subject.name}</h3>
                  </div>
                </div>

                {subjectProgress ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Best Score</span>
                      <span className={subject.color}>{subjectProgress.best_score}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tests Taken</span>
                      <span className="text-white">{subjectProgress.total_tests_taken}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Pass Rate</span>
                      <span className="text-white">
                        {Math.round((subjectProgress.tests_passed / subjectProgress.total_tests_taken) * 100)}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    No tests taken yet
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/practice/${subject.id}`)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                  >
                    Practice
                  </button>
                  <button
                    onClick={() => navigate(`/test/${subject.id}`)}
                    className={`flex-1 bg-lime-400 hover:bg-lime-300 text-black font-semibold py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center space-x-1`}
                  >
                    <Play size={14} />
                    <span>Test</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Tests */}
        {recentTests.length > 0 && (
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Tests</h2>
            <div className="space-y-3">
              {recentTests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      test.passed ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <div>
                      <div className="text-white font-medium">
                        {subjects.find(s => s.id === test.subject)?.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {new Date(test.completed_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      test.passed ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {Math.round((test.score / test.total_questions) * 100)}%
                    </div>
                    <div className="text-gray-400 text-sm">
                      {test.score}/{test.total_questions}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};