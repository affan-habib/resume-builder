import React from 'react';
import { useSelector } from 'react-redux';
import PersonalDetails from '../sections/PersonalDetails';
import SkillsSection from '../sections/SkillsSection';
import InterestSection from '../sections/InterestSection';
import EducationSection from '../sections/EducationSection';
import LanguageSection from '../sections/LanguageSection';
import ProjectsSection from '../sections/ProjectsSection';
import ProfessionalExperienceSection from '../sections/ProfessionalExperienceSection';
import AchievementSection from '../sections/AchievementSection';
import ReferencesSection from '../sections/ReferencesSection';
import VolunteerExperienceSection from '../sections/VolunteerExperienceSection';
import AwardsSection from '../sections/AwardsSection';
import CertificationsSection from '../sections/CertificationsSection';
import { RootState } from '../store';

const Resume: React.FC = () => {
  const font = useSelector((state: RootState) => state.settings.font);

  return (

    <div className="pt-16 pb-8 px-4" style={{ fontFamily: font }}
    >
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
              <CertificationsSection />
              <AwardsSection />
              <VolunteerExperienceSection />
              <InterestSection />
              <LanguageSection />
              <ProjectsSection />
              <ReferencesSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
