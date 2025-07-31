import React from 'react';
import { Menu, User, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageProvider';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenu = true }) => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showMenu && (
              <button
                onClick={onMenuClick}
                className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} className="text-white" />
              </button>
            )}
            <Logo size="sm" />
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {user && (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                    {user.profile_picture_url ? (
                      <img 
                        src={user.profile_picture_url} 
                        alt={user.full_name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-black" />
                    )}
                  </div>
                  <span className="text-white text-sm font-medium">
                    {user.full_name}
                  </span>
                </div>
                
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut size={18} className="text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};