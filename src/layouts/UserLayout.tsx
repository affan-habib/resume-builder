import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, User, Settings, LogOut, Menu, X } from 'lucide-react';

const UserLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { name: 'Home', icon: <Home size={20} />, path: '/home' },
        { name: 'Profile', icon: <User size={20} />, path: '/profile' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
        { name: 'Logout', icon: <LogOut size={20} />, path: '/auth/login' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`bg-white border-r border-gray-200 shadow-md transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
                    }`}
            >
                {/* Toggle Button */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-gray-700 focus:outline-none"
                    >
                        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
                    </button>
                    {!isCollapsed && <h1 className="text-lg font-semibold">Dashboard</h1>}
                </div>

                {/* Menu Items */}
                <nav className="mt-4">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-bold' : ''
                                }`
                            }
                        >
                            {item.icon}
                            {!isCollapsed && <span>{item.name}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout;
