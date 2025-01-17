import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../activeSectionSlice';
import PersonalDetails from '../sections/PersonalDetails';
import SkillsSection from '../sections/SkillsSection';
import InterestSection from '../sections/InterestSection';
import EducationSection from '../sections/EducationSection';
import LanguageSection from '../sections/LanguageSection';
import ProjectsSection from '../sections/ProjectsSection';
import ProfessionalExperienceSection from '../sections/ProfessionalExperienceSection';
import AchievementSection from '../sections/AchievementSection';
import TopBar from '../components/TopBar';

const Resume: React.FC = () => {
  const dispatch = useDispatch();
  const [font, setFont] = useState('');

  const handleUndo = () => {
    console.log('Undo action triggered');
  };

  const handleRedo = () => {
    console.log('Redo action triggered');
  };

  const handleFontChange = (selectedFont: string) => {
    setFont(selectedFont);
    console.log(`Font changed to: ${selectedFont}`);
  };

  const handleThemeChange = () => {
    console.log('Theme change action triggered');
  };

  const handleLayoutChange = () => {
    console.log('Layout change action triggered');
  };

  const handleDownload = () => {
    console.log('Download action triggered');
  };

  return (
    <div
      className="min-h-screen bg-gray-100"
      onClick={() => dispatch(setActiveSection(null))} // Deactivate sections on outside click
      style={{ fontFamily: font }} // Apply the selected font globally
    >
      {/* Top Bar */}
      <TopBar
        onUndo={handleUndo}
        onRedo={handleRedo}
        onFontChange={handleFontChange}
        onThemeChange={handleThemeChange}
        onLayoutChange={handleLayoutChange}
        onDownload={handleDownload}
      />

      {/* Main Content */}
      <div className="pt-16 pb-8 px-4">
        <div className="max-w-[21cm] mx-auto bg-white aspect-[1/1.4142] border border-gray-200">
          <div className="p-8 flex flex-col gap-4">
            {/* Personal Details Section */}
            <PersonalDetails />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <SkillsSection />
                <EducationSection />
                <ProfessionalExperienceSection />
                <AchievementSection />
              </div>
              <div className="space-y-4">
                <InterestSection />
                <LanguageSection />
                <ProjectsSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
