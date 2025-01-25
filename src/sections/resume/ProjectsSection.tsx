import React, { useState } from 'react';
import type { Range } from 'react-date-range';

interface DateRangeSelection {
  selection: Range;
}
import { Plus, Calendar, X, Edit3 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addProject, editProject, removeProject } from '@/store/slices/resumeSlice';
import EditableField from '@/components/common/EditableField';
import SectionWrapper from '@/components/resume/SectionWrapper';
import ListSection from '@/components/common/ListSection';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const ProjectsSection: React.FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.resume.projects);
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const title = 'Projects';
  const isActive = activeSection === title;
  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);
  const [editingLink, setEditingLink] = useState<{ index: number; field: 'repositoryLink' | 'liveDemoLink' } | null>(null);

  const handleAddProject = () => {
    const newProject = {
      name: '',
      keyPoints: [''],
      technologies: [],
      repositoryLink: '',
      liveDemoLink: '',
      role: '',
      startDate: '',
      endDate: '',
    };
    dispatch(addProject(newProject));
  };

  const handleProjectChange = (index: number, field: keyof typeof projects[0], value: any) => {
    dispatch(editProject({ index, field, value }));
  };

  const handleRemoveProject = (index: number) => {
    dispatch(removeProject(index));
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddProject,
      ariaLabel: 'Add new project',
    },
  ];

  return (
    <SectionWrapper title={title} actions={isActive ? actions : []}>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
            {/* Project Name */}
            <EditableField
              value={project.name}
              placeholder="Project Name"
              onSave={(value) => handleProjectChange(index, 'name', value)}
              className="flex-grow text-gray-800"
            />

            {/* Role */}
            <EditableField
              value={project.role}
              placeholder="Role"
              onSave={(value) => handleProjectChange(index, 'role', value)}
              className="flex-grow text-gray-600"
            />

            {/* Date Range */}
            <div className="flex items-center space-x-2">
              {project.startDate && project.endDate && (
                <span className="text-sm text-gray-600">{`${project.startDate} - ${project.endDate}`}</span>
              )}
              {isActive && (
                <button
                  onClick={() => setShowDatePicker((prev) => (prev === index ? null : index))}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  aria-label="Pick date range"
                >
                  <Calendar size={18} />
                </button>
              )}
              {isActive && showDatePicker === index && (
                <div className="absolute mt-2 z-10">
                  <DateRangePicker
                    ranges={[
                      {
                        startDate: new Date(project.startDate || Date.now()),
                        endDate: new Date(project.endDate || Date.now()),
                        key: 'selection',
                      },
                    ]}
                    onChange={(ranges: DateRangeSelection) => {
                      const start = ranges.selection.startDate?.toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      });
                      const end = ranges.selection.endDate?.toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      });
                      handleProjectChange(index, 'startDate', start || '');
                      handleProjectChange(index, 'endDate', end || '');
                      setShowDatePicker(null);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Key Points */}
            <ListSection
              items={project.keyPoints || []}
              placeholder="Key Point"
              isActive={isActive}
              onAddItem={() =>
                handleProjectChange(index, 'keyPoints', [...(project.keyPoints || []), 'New Key Point'])
              }
              onItemChange={(keyIndex, value) =>
                handleProjectChange(
                  index,
                  'keyPoints',
                  project.keyPoints.map((point, i) => (i === keyIndex ? value : point))
                )
              }
              onRemoveItem={(keyIndex) =>
                handleProjectChange(
                  index,
                  'keyPoints',
                  project.keyPoints.filter((_, i) => i !== keyIndex)
                )
              }
            />

            {/* Links (Repository and Live Demo) */}
            <div className="flex items-center space-x-4">
              {/* Repository Link */}
              <div className="relative">
                {isActive && editingLink?.index === index && editingLink?.field === 'repositoryLink' ? (
                  <EditableField
                    value={project.repositoryLink}
                    placeholder="Repository Link"
                    onSave={(value) => {
                      handleProjectChange(index, 'repositoryLink', value);
                      setEditingLink(null);
                    }}
                    className="absolute top-0 left-0 bg-white border border-gray-300 shadow-md p-2 z-10"
                  />
                ) : (
                  <button
                    onClick={(e) => {
                      if (isActive) {
                        e.stopPropagation();
                        setEditingLink({ index, field: 'repositoryLink' });
                      } else {
                        window.open(project.repositoryLink || '#', '_blank');
                      }
                    }}
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    View Code
                    {isActive && (
                      <Edit3 size={16} className="ml-2 text-gray-600 hover:text-gray-800" />
                    )}
                  </button>
                )}
              </div>

              {/* Live Demo Link */}
              <div className="relative">
                {isActive && editingLink?.index === index && editingLink?.field === 'liveDemoLink' ? (
                  <EditableField
                    value={project.liveDemoLink}
                    placeholder="Live Demo Link"
                    onSave={(value) => {
                      handleProjectChange(index, 'liveDemoLink', value);
                      setEditingLink(null);
                    }}
                    className="absolute top-0 left-0 bg-white border border-gray-300 shadow-md p-2 z-10"
                  />
                ) : (
                  <button
                    onClick={(e) => {
                      if (isActive) {
                        e.stopPropagation();
                        setEditingLink({ index, field: 'liveDemoLink' });
                      } else {
                        window.open(project.liveDemoLink || '#', '_blank');
                      }
                    }}
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    View Demo
                    {isActive && (
                      <Edit3 size={16} className="ml-2 text-gray-600 hover:text-gray-800" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Remove Project Button */}
            {isActive && (
              <button
                onClick={() => handleRemoveProject(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2 self-end"
                aria-label="Remove project"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
