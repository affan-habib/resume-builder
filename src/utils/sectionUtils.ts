import type { ResumeState } from '../types/resume';

export const titleToStateKey = (title: string): keyof ResumeState => {
    const mapping: Record<string, keyof ResumeState> = {
        'Personal Information': 'personalInformation',
        'Work Experience': 'workExperience',
        'Education': 'education',
        'Skills': 'skills',
        'Certifications': 'certifications',
        'Projects': 'projects',
        'Languages': 'languages',
        'Awards': 'awards',
        'Volunteer Experience': 'volunteerExperience',
        'References': 'references',
        'Achievements': 'achievements',
        'Interests': 'interests'
    };
    
    return mapping[title] || 'personalInformation';
};