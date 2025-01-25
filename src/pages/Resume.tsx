import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PersonalDetails from '@/sections/PersonalDetails';
import SkillsSection from '@/sections/SkillsSection';
import InterestSection from '@/sections/InterestSection';
import EducationSection from '@/sections/EducationSection';
import LanguageSection from '@/sections/LanguageSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ProfessionalExperienceSection from '@/sections/ProfessionalExperienceSection';
import AchievementSection from '@/sections/AchievementSection';
import ReferencesSection from '@/sections/ReferencesSection';
import VolunteerExperienceSection from '@/sections/VolunteerExperienceSection';
import AwardsSection from '@/sections/AwardsSection';
import CertificationsSection from '@/sections/CertificationsSection';
import TopBar from '@/components/common/TopBar';
import Layout from '@/pages/Layout';
import { RootState } from '@/store/store';

// Map section IDs to their components
const sectionComponents = {
  personalDetails: PersonalDetails,
  skills: SkillsSection,
  education: EducationSection,
  experience: ProfessionalExperienceSection,
  achievements: AchievementSection,
  certifications: CertificationsSection,
  awards: AwardsSection,
  volunteer: VolunteerExperienceSection,
  interests: InterestSection,
  languages: LanguageSection,
  projects: ProjectsSection,
  references: ReferencesSection,
};

const Resume: React.FC = () => {
  const { font, sections } = useSelector((state: RootState) => state.settings);
  const [isLayoutVisible, setIsLayoutVisible] = useState(false);

  // Filter visible sections and sort by order
  const visibleSections = sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  // Separate sections by column
  const fullWidthSections = visibleSections.filter(section => section.column === 'full');
  const leftColumnSections = visibleSections.filter(section => section.column === 'left');
  const rightColumnSections = visibleSections.filter(section => section.column === 'right');

  const renderSection = (sectionConfig: typeof sections[0]) => {
    const Component = sectionComponents[sectionConfig.id as keyof typeof sectionComponents];
    return Component ? <Component key={sectionConfig.id} /> : null;
  };

  return (
    <>
      <TopBar
        onToggleLayout={() => setIsLayoutVisible(!isLayoutVisible)}
        isLayoutVisible={isLayoutVisible}
      />
      <div className="pt-16 pb-8 px-4" style={{ fontFamily: font }}>
        <div className="max-w-[21cm] mx-auto bg-white aspect-[1/1.4142] border border-gray-200">
          {fullWidthSections.map(renderSection)}
          <div className="p-8 pt-4 flex flex-col gap-4">
            {/* Full width sections (like Personal Details) */}

            {/* Two-column layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                {leftColumnSections.map(renderSection)}
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {rightColumnSections.map(renderSection)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Component */}
      <Layout
        visible={isLayoutVisible}
        onClose={() => setIsLayoutVisible(false)}
      />
    </>
  );
};

export default Resume;
