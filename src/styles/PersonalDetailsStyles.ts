export interface PersonalDetailsStyle {
  container: string;
  profileWrapper: string;
  profileImage: string;
  textWrapper: string;
  name: string;
  title: string;
  summary: string;
  contactGrid: string;
  contactItem: string;
  contactIcon: string;
}

export const personalDetailsStylesMap: Record<string, PersonalDetailsStyle> = {
  modern: {
    container: 'space-y-6 p-10 pb-4 cursor-pointer bg-white border border-gray-200',
    profileWrapper: 'flex items-center gap-6',
    profileImage: '',
    textWrapper: 'flex-1 space-y-2',
    name: 'text-2xl font-semibold text-gray-900',
    title: 'text-lg text-gray-700',
    summary: 'text-sm text-gray-600',
    contactGrid: 'grid grid-cols-2 gap-4 text-gray-700',
    contactItem: 'flex items-center space-x-2',
    contactIcon: 'w-5 h-5 mr-2',
  },
  professional: {
    container: 'space-y-6 p-10 pb-4 cursor-pointer bg-gray-900 text-white border border-gray-700',
    profileWrapper: 'flex items-center gap-6',
    profileImage: '',
    textWrapper: 'flex-1 space-y-2',
    name: 'text-2xl font-semibold text-gray-200',
    title: 'text-lg text-gray-300',
    summary: 'text-sm text-gray-400',
    contactGrid: 'grid grid-cols-2 gap-4 text-gray-300',
    contactItem: 'flex items-center space-x-2',
    contactIcon: 'w-5 h-5 mr-2',
  },
  minimal: {
    container: 'space-y-6 p-10 pb-4 cursor-pointer bg-gray-50 border border-gray-300',
    profileWrapper: 'flex items-center gap-6',
    profileImage: '',
    textWrapper: 'flex-1 space-y-2',
    name: 'text-2xl font-semibold text-gray-900',
    title: 'text-lg text-gray-700',
    summary: 'text-sm text-gray-600',
    contactGrid: 'grid grid-cols-2 gap-4 text-gray-600',
    contactItem: 'flex items-center space-x-2',
    contactIcon: 'w-5 h-5 mr-2',
  },
  bold: {
    container: 'space-y-6 p-10 pb-4 cursor-pointer bg-gray-50 border border-gray-400',
    profileWrapper: 'flex items-center gap-6',
    profileImage: '',
    textWrapper: 'flex-1 space-y-2',
    name: 'text-2xl font-semibold text-gray-900',
    title: 'text-lg text-gray-700',
    summary: 'text-sm text-gray-600',
    contactGrid: 'grid grid-cols-2 gap-4 text-gray-600',
    contactItem: 'flex items-center space-x-2',
    contactIcon: 'w-5 h-5 mr-2',
  },
};
