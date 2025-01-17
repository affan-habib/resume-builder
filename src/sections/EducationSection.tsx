import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setActiveSection } from '../activeSectionSlice';
import EditableField from '../components/EditableField';
import { Plus, X } from 'lucide-react';

const EducationSection: React.FC = () => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);

  const [education, setEducation] = React.useState([
    { institution: 'University A', degree: 'Bachelor\'s', startDate: '2020', endDate: '2024' },
  ]);

  const isActive = activeSection === 'education';

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection('education'));
      }}
      className={`space-y-4 p-2 rounded cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-50' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEducation([
                ...education,
                { institution: 'New Institution', degree: 'New Degree', startDate: 'Start', endDate: 'End' },
              ]);
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Add new education"
          >
            <Plus size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {education.map((entry, index) => (
          <div key={index} className="rounded flex flex-col gap-2">
            <EditableField
              value={entry.institution}
              placeholder="Institution"
              onSave={(value) =>
                setEducation(
                  education.map((item, i) =>
                    i === index ? { ...item, institution: value } : item
                  )
                )
              }
            />
            <EditableField
              value={entry.degree}
              placeholder="Degree"
              onSave={(value) =>
                setEducation(
                  education.map((item, i) =>
                    i === index ? { ...item, degree: value } : item
                  )
                )
              }
              className='font-medium'
            />
            <div className="flex gap-2">
              <EditableField
                value={entry.startDate}
                placeholder="Start Date"
                onSave={(value) =>
                  setEducation(
                    education.map((item, i) =>
                      i === index ? { ...item, startDate: value } : item
                    )
                  )
                }
              />
              <EditableField
                value={entry.endDate}
                placeholder="End Date"
                onSave={(value) =>
                  setEducation(
                    education.map((item, i) =>
                      i === index ? { ...item, endDate: value } : item
                    )
                  )
                }
              />
            </div>
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEducation(education.filter((_, i) => i !== index));
                }}
                className="self-end text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Remove education entry"
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

export default EducationSection;
