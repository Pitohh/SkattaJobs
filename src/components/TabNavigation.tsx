import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Briefcase, 
  User, 
  Calendar,
  Heart,
  PlusCircle,
  BarChart3
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const TabNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const getTabsForRole = () => {
    switch (user?.role) {
      case 'client':
        return [
          { to: '/home', label: 'Accueil', icon: Home },
          { to: '/search', label: 'Recherche', icon: Search },
          { to: '/job-posting', label: 'Publier', icon: PlusCircle },
          { to: '/favorites', label: 'Favoris', icon: Heart },
          { to: '/client-dashboard', label: 'Dashboard', icon: BarChart3 },
        ];
      case 'prestataire':
        return [
          { to: '/home', label: 'Accueil', icon: Home },
          { to: '/my-jobs', label: 'Mes Jobs', icon: Briefcase },
          { to: '/availability', label: 'Disponibilité', icon: Calendar },
          { to: '/stage-offers', label: 'Stages', icon: Search },
          { to: '/provider-profile', label: 'Profil', icon: User },
        ];
      default:
        return [];
    }
  };

  const tabs = getTabsForRole();

  if (tabs.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = location.pathname === tab.to;
          
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : ''}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;