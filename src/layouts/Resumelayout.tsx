import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '@/store/slices/activeSectionSlice';

const ResumeLayout: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <div
            className="min-h-screen bg-gray-100"
            onClick={() => dispatch(setActiveSection(null))}
        >
            <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-80 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ResumeLayout;
