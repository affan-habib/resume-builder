import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Settings, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isMobile,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const menuItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/home' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    { name: 'Logout', icon: <LogOut size={20} />, path: '/auth/login' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-md z-50
        ${isMobile ? (isOpen ? 'w-64' : 'w-0') : isCollapsed ? 'w-16' : 'w-64'}
        transition-all duration-300 overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          {!isMobile && (
            <button
              onClick={onToggleCollapse}
              className="text-gray-700 focus:outline-none"
            >
              {isCollapsed ? <X size={20} /> : <span>Collapse</span>}
            </button>
          )}
          {isMobile && (
            <button onClick={onClose} className="text-gray-700">
              <X size={24} />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                  isActive ? 'bg-gray-100 font-bold' : ''
                }`
              }
              onClick={isMobile ? onClose : undefined}
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
