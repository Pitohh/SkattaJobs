import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  Menu, 
  X, 
  LogOut, 
  Settings,
  Briefcase,
  Users,
  BarChart3
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Déconnexion réussie');
    navigate('/login');
  };

  const getAdminLinks = () => {
    if (user?.role !== 'admin') return [];
    
    return [
      { to: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
      { to: '/admin/users', label: 'Utilisateurs', icon: Users },
      { to: '/admin/job-management', label: 'Gestion Jobs', icon: Briefcase },
      { to: '/admin/stats', label: 'Statistiques', icon: BarChart3 },
    ];
  };

  const adminLinks = getAdminLinks();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SkattaJobs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user?.role === 'admin' && (
              <div className="flex items-center space-x-6">
                {adminLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${location.pathname === link.to
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>

            {/* Admin Links */}
            {user?.role === 'admin' && (
              <div className="space-y-2">
                {adminLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${location.pathname === link.to
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;