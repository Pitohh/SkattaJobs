import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import TabNavigation from './TabNavigation';
import { useAuthStore } from '../store/authStore';

const Layout: React.FC = () => {
  const { user } = useAuthStore();
  const showTabNavigation = user?.role === 'client' || user?.role === 'prestataire';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className={`${showTabNavigation ? 'pb-20' : 'pb-4'}`}>
        <Outlet />
      </main>

      {showTabNavigation && <TabNavigation />}
    </div>
  );
};

export default Layout;