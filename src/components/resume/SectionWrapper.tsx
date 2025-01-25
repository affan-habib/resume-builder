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
  User
} from 'lucide-react';

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
    'Education': <GraduationCap className="w-5 h-5" />,
    'Professional Experience': <Briefcase className="w-5 h-5" />,
    'Achievements': <Trophy className="w-5 h-5" />,
    'Awards': <Award className="w-5 h-5" />,
    'Certifications': <Scroll className="w-5 h-5" />,
    'Languages': <Languages className="w-5 h-5" />,
    'Interests': <Heart className="w-5 h-5" />,
    'Projects': <Code className="w-5 h-5" />,
    'References': <Users className="w-5 h-5" />,
    'Volunteer Experience': <Medal className="w-5 h-5" />,
    'Skills': <Wrench className="w-5 h-5" />,
    'Personal Details': <User className="w-5 h-5" />
  };

  return iconMap[title] || null;
};

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children, actions = [] }) => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isLoading = useSelector((state: RootState) => 
    state.loading.sectionLoading[titleToStateKey(title)]
  );
  const theme = useSelector((state: RootState) => state.settings.theme);
  const currentTemplateId = useSelector((state: RootState) => state.settings.template);
  
  const template = templates.find((t: { id: string }) => t.id === currentTemplateId);
  const styles = template?.sectionStyle;

  const isActive = activeSection === title;

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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
      className={`relative space-y-4 p-2 rounded cursor-pointer ${
        isActive ? 'border-blue-500 bg-yellow-100' : 'border-gray-200'
      } ${styles.background}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {sectionIcon && (
            <span style={{ color: theme }}>
              {sectionIcon}
            </span>
          )}
          <h3 
            className={`text-lg font-semibold ${styles.titleColor}`}
            style={{ color: theme }}
          >
            {title}
          </h3>
        </div>
        {isActive && (
          <div className="flex items-center space-x-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(e);
                }}
                className={`hover:opacity-75 focus:outline-none ${styles.titleColor}`}
                aria-label={action.ariaLabel}
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Content */}
      <div className={`${isLoading ? 'opacity-50' : ''} ${styles.contentColor}`}>
        {isLoading ? <LoadingSkeleton /> : children}
      </div>
    </div>
  );
};

export default SectionWrapper;
