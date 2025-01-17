import React from 'react';
import EntrySection from '../components/EntrySection';

const ProfessionalExperienceSection: React.FC = () => {
  return (
    <EntrySection
      sectionName="Professional Experience"
      showSubtitle={true}
      initialEntries={[
        {
          title: 'Software Engineer',
          subtitle: 'Tech Corp',
          dateRange: 'Jan 2020 - Dec 2022',
          keyPoints: ['Developed scalable APIs', 'Improved system performance by 40%'],
        },
      ]}
      onEntriesChange={(entries) => console.log('Updated Experiences:', entries)}
    />
  );
};

export default ProfessionalExperienceSection;
