import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PersonalDetails from '@/sections/resume/PersonalDetails';
import SkillsSection from '@/sections/resume/SkillsSection';
import InterestSection from '@/sections/resume/InterestSection';
import EducationSection from '@/sections/resume/EducationSection';
import LanguageSection from '@/sections/resume/LanguageSection';
import ProjectsSection from '@/sections/resume/ProjectsSection';
import ProfessionalExperienceSection from '@/sections/resume/ProfessionalExperienceSection';
import AchievementSection from '@/sections/resume/AchievementSection';
import ReferencesSection from '@/sections/resume/ReferencesSection';
import VolunteerExperienceSection from '@/sections/resume/VolunteerExperienceSection';
import AwardsSection from '@/sections/resume/AwardsSection';
import CertificationsSection from '@/sections/resume/CertificationsSection';
import { RootState } from '@/store/store';
import { useResumeManager } from '@/hooks/useResumeActions';

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
  const { sections } = useSelector((state: RootState) => state.settings);
  const { fetchResume } = useResumeManager();
  // useEffect(() => {
  //   fetchResume();
  // }, [fetchResume]);

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
    </>
  );
};

export default Resume;
