import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setActiveSection } from '../activeSectionSlice';
import TagSection from '../components/TagSection';

const InterestSection: React.FC = () => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);

  return (
    <TagSection
      title="Interests"
      placeholder="Interest"
      initialTags={['Reading', 'Traveling']}
      isActive={activeSection === 'interests'}
      onActivate={() => dispatch(setActiveSection('interests'))}
      onDeactivate={() => dispatch(setActiveSection(null))}
      onTagsChange={(tags) => console.log('Updated Interests:', tags)}
    />
  );
};

export default InterestSection;
