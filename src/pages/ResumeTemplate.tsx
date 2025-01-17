import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from './activeSectionSlice';
import PersonalDetails from './sections/PersonalDetails';
import SkillsSection from './sections/SkillsSection';
import InterestSection from './sections/InterestSection';
import EducationSection from './sections/EducationSection';
import LanguageSection from './sections/LanguageSection';
import ProjectsSection from './sections/ProjectsSection';
import ProfessionalExperienceSection from './sections/ProfessionalExperienceSection';
import AchievementSection from './sections/AchievementSection';

const App: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="min-h-screen bg-gray-500"
      onClick={() => dispatch(setActiveSection(null))} // Deactivate sections on outside click
    >
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <h2 className="text-base font-medium text-gray-900">Resume Editor</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-8 px-4">
        <div className="max-w-[21cm] mx-auto bg-white aspect-[1/1.4142] border border-gray-200">
          <div className="p-8 flex flex-col gap-4">
            {/* Personal Details Section */}
            <PersonalDetails />
            <div className="grid grid-cols-2 gap-4">
              <div className='space-y-4'>
                <SkillsSection />
                <EducationSection />
                <ProfessionalExperienceSection />
                <AchievementSection/>
              </div>
              <div className='space-y-4'>
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

export default App;
