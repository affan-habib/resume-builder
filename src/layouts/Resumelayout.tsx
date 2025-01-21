import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../activeSectionSlice';

const ResumeLayout: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <div
            className="min-h-screen bg-gray-100"
            onClick={() => dispatch(setActiveSection(null))}
        >
            <TopBar />
            <Outlet />
        </div>
    );
};

export default ResumeLayout;
