import React from 'react';
import EntrySection from '../components/EntrySection';

const ProjectsSection: React.FC = () => {
  return (
    <EntrySection
      sectionName="Projects"
      showSubtitle={true}
      initialEntries={[
        {
          title: 'Project Management App',
          subtitle: 'Team Lead',
          dateRange: 'Jan 2021 - Dec 2021',
          keyPoints: ['Managed team of 5 developers', 'Delivered project on time'],
        },
      ]}
      onEntriesChange={(entries) => console.log('Updated Projects:', entries)}
    />
  );
};

export default ProjectsSection;
