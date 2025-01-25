import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSection } from '@/store/slices/activeSectionSlice';
import TopBar from '@/components/common/TopBar';
import CustomizeResumeLayout from '@/components/resume/CustomizeResumeLayout';
import { RootState } from '@/store/store';

const ResumeLayout: React.FC = () => {
    const dispatch = useDispatch();
    const [isLayoutVisible, setIsLayoutVisible] = useState(false);
    const { font, sections } = useSelector((state: RootState) => state.settings);

    return (

        <div
            className="min-h-screen bg-gray-100"
            onClick={() => dispatch(setActiveSection(null))}
        >
            <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-80 p-4">
                    <TopBar
                        onToggleLayout={() => setIsLayoutVisible(!isLayoutVisible)}
                        isLayoutVisible={isLayoutVisible}
                    />
                    <div className="pt-16 pb-8 px-4" style={{ fontFamily: font }}>
                        <div className="max-w-[21cm] mx-auto bg-white aspect-[1/1.4142] border border-gray-200">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
            <CustomizeResumeLayout
                visible={isLayoutVisible}
                onClose={() => setIsLayoutVisible(false)}
            />
        </div>
    );
};

export default ResumeLayout;
