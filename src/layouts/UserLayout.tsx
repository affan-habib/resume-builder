import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './SideBar';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebarCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen || !isMobile}
        isMobile={isMobile}
        onClose={closeSidebar}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Mobile Menu Button */}
        {isMobile && !isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 bg-white p-2 rounded-full shadow-md z-50"
          >
            <Menu size={24} />
          </button>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
