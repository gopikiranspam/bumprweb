import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Database, 
  Shield, 
  Settings,
  RefreshCw
} from 'lucide-react';
import { supabaseAdmin } from '../lib/supabase-admin';

interface DiagnosticResult {
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

export const DiagnosticsPanel: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<{
    config: DiagnosticResult | null;
    health: DiagnosticResult | null;
    tables: DiagnosticResult | null;
    auth: DiagnosticResult | null;
  }>({
    config: null,
    health: null,
    tables: null,
    auth: null
  });
  const [loading, setLoading] = useState(false);

  const runDiagnostics = async () => {
    setLoading(true);
    
    try {
      // 1. Config validation
      const config = supabaseAdmin.validateConfig();
      setDiagnostics(prev => ({
        ...prev,
        config: {
          status: config.isValid ? 'success' : 'error',
          message: config.isValid 
            ? 'Environment variables configured correctly' 
            : `Missing: ${config.missing.join(', ')}`,
          details: config
        }
      }));

      if (!config.isValid) {
        setLoading(false);
        return;
      }

      // 2. Health check
      const health = await supabaseAdmin.healthCheck();
      setDiagnostics(prev => ({
        ...prev,
        health: {
          status: health.status === 'success' ? 'success' : 'error',
          message: health.status === 'success' 
            ? 'Database connection healthy' 
            : health.message || 'Health check failed',
          details: health.data
        }
      }));

      // 3. Table verification
      try {
        const tables = await supabaseAdmin.verifyTables();
        const allTablesExist = Object.values(tables).every(exists => exists);
        setDiagnostics(prev => ({
          ...prev,
          tables: {
            status: allTablesExist ? 'success' : 'error',
            message: allTablesExist 
              ? 'All required tables exist' 
              : 'Some tables are missing',
            details: tables
          }
        }));
      } catch (error: any) {
        setDiagnostics(prev => ({
          ...prev,
          tables: {
            status: 'error',
            message: error.message,
            details: null
          }
        }));
      }

      // 4. Auth test
      const auth = await supabaseAdmin.testAuth();
      setDiagnostics(prev => ({
        ...prev,
        auth: {
          status: auth.authEnabled ? 'success' : 'error',
          message: auth.authEnabled 
            ? 'Authentication system working' 
            : auth.error || 'Authentication not working',
          details: auth
        }
      }));

    } catch (error: any) {
      console.error('Diagnostics error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'error':
        return <XCircle className="text-red-400" size={20} />;
      case 'warning':
        return <AlertCircle className="text-yellow-400" size={20} />;
      default:
        return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  const diagnosticItems = [
    {
      key: 'config',
      title: 'Environment Configuration',
      icon: <Settings size={20} className="text-blue-400" />,
      result: diagnostics.config
    },
    {
      key: 'health',
      title: 'Database Health',
      icon: <Database size={20} className="text-green-400" />,
      result: diagnostics.health
    },
    {
      key: 'tables',
      title: 'Table Verification',
      icon: <Database size={20} className="text-purple-400" />,
      result: diagnostics.tables
    },
    {
      key: 'auth',
      title: 'Authentication',
      icon: <Shield size={20} className="text-orange-400" />,
      result: diagnostics.auth
    }
  ];

  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">System Diagnostics</h2>
        <button
          onClick={runDiagnostics}
          disabled={loading}
          className="flex items-center space-x-2 bg-lime-400 hover:bg-lime-300 disabled:bg-gray-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="space-y-4">
        {diagnosticItems.map((item) => (
          <div
            key={item.key}
            className="bg-gray-800 rounded-lg p-4 flex items-start space-x-4"
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">{item.title}</h3>
                {item.result && getStatusIcon(item.result.status)}
              </div>
              {item.result ? (
                <div className="space-y-2">
                  <p className={`text-sm ${
                    item.result.status === 'success' ? 'text-green-400' :
                    item.result.status === 'error' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {item.result.message}
                  </p>
                  {item.result.details && (
                    <details className="text-xs text-gray-400">
                      <summary className="cursor-pointer hover:text-gray-300">
                        View Details
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-700 rounded text-xs overflow-x-auto">
                        {JSON.stringify(item.result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-lime-400"></div>
                  <span className="text-sm text-gray-400">Running check...</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {diagnostics.config?.status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-red-400 mb-2">Configuration Required</h4>
          <p className="text-red-300 text-sm mb-3">
            To complete the Supabase setup, you need to:
          </p>
          <ol className="text-red-300 text-sm space-y-1 list-decimal list-inside">
            <li>Create a Supabase project at <a href="https://supabase.com" className="underline" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
            <li>Copy your project URL and anon key from the API settings</li>
            <li>Update the values in your <code className="bg-gray-800 px-1 rounded">.env</code> file</li>
            <li>Apply the database migrations using the Supabase CLI</li>
          </ol>
        </div>
      )}
    </div>
  );
};