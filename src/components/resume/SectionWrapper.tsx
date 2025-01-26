// src/components/SectionWrapper.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setActiveSection } from '../../store/slices/activeSectionSlice';
import { titleToStateKey } from '../../utils/sectionUtils';
import { templates } from '../../store/slices/settingsSlice';
import {
  GraduationCap,
  Briefcase,
  Trophy,
  Award,
  Scroll,
  Languages,
  Heart,
  Code,
  Users,
  Medal,
  Wrench,
  User,
} from 'lucide-react';
import { sectionStylesMap, SectionStyles } from '../../styles/sectionStyles';

interface Action {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  ariaLabel: string;
}

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
  actions?: Action[];
}

const getSectionIcon = (title: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    Education: <GraduationCap style={{ width: '20px', height: '20px' }} />,
    'Professional Experience': <Briefcase style={{ width: '20px', height: '20px' }} />,
    Achievements: <Trophy style={{ width: '20px', height: '20px' }} />,
    Awards: <Award style={{ width: '20px', height: '20px' }} />,
    Certifications: <Scroll style={{ width: '20px', height: '20px' }} />,
    Languages: <Languages style={{ width: '20px', height: '20px' }} />,
    Interests: <Heart style={{ width: '20px', height: '20px' }} />,
    Projects: <Code style={{ width: '20px', height: '20px' }} />,
    References: <Users style={{ width: '20px', height: '20px' }} />,
    'Volunteer Experience': <Medal style={{ width: '20px', height: '20px' }} />,
    Skills: <Wrench style={{ width: '20px', height: '20px' }} />,
    'Personal Details': <User style={{ width: '20px', height: '20px' }} />,
  };

  return iconMap[title] || null;
};

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children, actions = [] }) => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isLoading = useSelector(
    (state: RootState) => state.loading.sectionLoading[titleToStateKey(title)]
  );
  const theme = useSelector((state: RootState) => state.settings.theme);
  const currentTemplateId = useSelector((state: RootState) => state.settings.template);

  const template = templates.find((t) => t.id === currentTemplateId);
  const styles: SectionStyles | undefined = template?.sectionStyle;

  const isActive = activeSection === title;

  const LoadingSkeleton = () => (
    <div style={{ animation: 'pulse 2s infinite', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ height: '16px', backgroundColor: '#e2e8f0', borderRadius: '4px', width: '75%' }}></div>
      <div style={{ height: '16px', backgroundColor: '#e2e8f0', borderRadius: '4px', width: '50%' }}></div>
      <div style={{ height: '16px', backgroundColor: '#e2e8f0', borderRadius: '4px', width: '66%' }}></div>
    </div>
  );

  const sectionIcon = getSectionIcon(title);

  if (!styles) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection(title));
      }}
      style={{
        ...styles.wrapper,
        border: isActive ? '2px solid #3b82f6' : styles.wrapper.border,
        backgroundColor: isActive ? '#fefcbf' : styles.wrapper.backgroundColor,
        cursor: 'pointer',
      }}
    >
      {/* Optional Background SVG */}
      {styles.backgroundSvg && <div style={styles.backgroundSvg}></div>}

      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {sectionIcon && <span style={{ color: theme }}>{sectionIcon}</span>}
          <h3 style={{ ...styles.title, color: theme }}>{title}</h3>
        </div>
        {isActive && (
          <div style={{ display: 'flex', gap: '8px' }}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(e);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: 1,
                }}
                aria-label={action.ariaLabel}
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Content */}
      <div
        style={{
          ...styles.content,
          opacity: isLoading ? 0.5 : 1,
          padding: styles.content.padding || '0',
        }}
      >
        {isLoading ? <LoadingSkeleton /> : children}
      </div>
    </div>
  );
};

export default SectionWrapper;
