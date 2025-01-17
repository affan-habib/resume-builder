import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setActiveSection } from '../activeSectionSlice';
import TagSection from './TagSection';

const SkillsSection: React.FC = () => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);

  return (
    <TagSection
      title="Skills"
      placeholder="Skill"
      initialTags={['React', 'JavaScript']}
      isActive={activeSection === 'skills'}
      onActivate={() => dispatch(setActiveSection('skills'))}
      onDeactivate={() => dispatch(setActiveSection(null))}
      onTagsChange={(tags) => console.log('Updated Skills:', tags)}
    />
  );
};

export default SkillsSection;
