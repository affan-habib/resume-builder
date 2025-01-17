import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar, List, Plus, X } from 'lucide-react';
import { setActiveSection } from '../activeSectionSlice';
import { RootState } from '../store';
import EditableField from './EditableField';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface ProjectEntry {
  title: string;
  dateRange: string;
  keyPoints: string[];
}

interface ProjectsSectionProps {
  initialProjects?: ProjectEntry[];
  onProjectsChange?: (projects: ProjectEntry[]) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  initialProjects = [],
  onProjectsChange,
}) => {
  const [projects, setProjects] = useState<ProjectEntry[]>(initialProjects);
  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);

  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === 'projects';

  const handleAddProject = () => {
    const newProject: ProjectEntry = {
      title: 'New Project',
      dateRange: '',
      keyPoints: ['New Key Point'],
    };
    setProjects([...projects, newProject]);
    onProjectsChange?.([...projects, newProject]);
  };

  const handleProjectChange = (index: number, field: keyof ProjectEntry, value: string) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
    onProjectsChange?.(updatedProjects);
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    onProjectsChange?.(updatedProjects);
  };

  const handleAddKeyPoint = (index: number) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, keyPoints: [...project.keyPoints, 'New Key Point'] } : project
    );
    setProjects(updatedProjects);
    onProjectsChange?.(updatedProjects);
  };

  const handleKeyPointChange = (projectIndex: number, keyPointIndex: number, value: string) => {
    const updatedProjects = projects.map((project, i) =>
      i === projectIndex
        ? {
            ...project,
            keyPoints: project.keyPoints.map((key, j) => (j === keyPointIndex ? value : key)),
          }
        : project
    );
    setProjects(updatedProjects);
    onProjectsChange?.(updatedProjects);
  };

  const handleRemoveKeyPoint = (projectIndex: number, keyPointIndex: number) => {
    const updatedProjects = projects.map((project, i) =>
      i === projectIndex
        ? { ...project, keyPoints: project.keyPoints.filter((_, j) => j !== keyPointIndex) }
        : project
    );
    setProjects(updatedProjects);
    onProjectsChange?.(updatedProjects);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection('projects'));
      }}
      className={`space-y-4 p-4 rounded border cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddProject();
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Add new project"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 bg-gray-200 rounded shadow-sm flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <EditableField
                value={project.title}
                placeholder="Project Title"
                onSave={(value) => handleProjectChange(index, 'title', value)}
                className="flex-grow focus:outline-none text-gray-800"
              />
              {project.dateRange && (
                <span className="text-sm text-gray-600">({project.dateRange})</span>
              )}
              {isActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDatePicker((prev) => (prev === index ? null : index));
                  }}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  aria-label="Pick date range"
                >
                  <Calendar size={18} />
                </button>
              )}
              {showDatePicker === index && (
                <div className="absolute mt-2 z-10">
                  <DateRangePicker
                    ranges={[
                      {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: 'selection',
                      },
                    ]}
                    onChange={(ranges) => {
                      const start = ranges.selection.startDate?.toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      });
                      const end = ranges.selection.endDate?.toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      });
                      handleProjectChange(index, 'dateRange', `${start} - ${end}`);
                      setShowDatePicker(null);
                    }}
                    showMonthAndYearPickers
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Key Points</span>
                {isActive && (
                  <button
                    onClick={() => handleAddKeyPoint(index)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label="Add key point"
                  >
                    <List size={20} />
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {project.keyPoints.map((keyPoint, keyPointIndex) => (
                  <div key={keyPointIndex} className="flex items-center gap-2">
                    <span className="text-gray-500">-</span>
                    <EditableField
                      value={keyPoint}
                      placeholder="Key Point"
                      onSave={(value) =>
                        handleKeyPointChange(index, keyPointIndex, value)
                      }
                      className="flex-grow text-sm text-gray-800 focus:outline-none"
                    />
                    {isActive && (
                      <button
                        onClick={() => handleRemoveKeyPoint(index, keyPointIndex)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                        aria-label="Remove key point"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveProject(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2 self-end"
                aria-label="Remove project"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
