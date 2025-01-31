import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Download, Layout, Brush, Type, FileText, LogOut } from 'lucide-react';
import { setFont, setTheme, setTemplate } from '@/store/slices/settingsSlice';
import { RootState } from '@/store/store';
import { useResumeManager } from '@/hooks/useResumeActions';
import { clearUser } from '@/store/slices/userSlice';

const fonts = [
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Raleway',
  'Nunito',
  'Poppins',
  'Merriweather',
  'Playfair Display',
  'Source Sans Pro',
  'Work Sans',
];

const templates = ['modern', 'professional', 'minimal', 'bold'];

const themeColors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Gray', value: '#4b5563' },
];

interface TopBarProps {
  onToggleLayout: () => void;
  isLayoutVisible: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onToggleLayout, isLayoutVisible }) => {
  const dispatch = useDispatch();
  const currentFont = useSelector((state: RootState) => state.settings.font);
  const currentTheme = useSelector((state: RootState) => state.settings.theme);
  const currentTemplate = useSelector((state: RootState) => state.settings.template);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateResumeData } = useResumeManager();

  const handleFontChange = (font: string) => {
    dispatch(setFont(font));
    setShowFontDropdown(false);
  };

  const handleThemeChange = (color: string) => {
    dispatch(setTheme(color));
    setShowThemeDropdown(false);
  };

  const handleTemplateChange = (template: string) => {
    dispatch(setTemplate(template));
    setShowTemplateDropdown(false);
  };

  const closeAllDropdowns = () => {
    setShowFontDropdown(false);
    setShowThemeDropdown(false);
    setShowTemplateDropdown(false);
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      updateResumeData();
      const response = await axios.post(
        'https://puppeteer-backend-e21oj7lyl-affanhabibs-projects-8bf99f86.vercel.app/api/generate-pdf',
        {},
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10 no-print">
      <div className="max-w-3xl px-4 flex justify-between items-center h-16 ml-auto mr-10">
        <div className="flex items-center justify-center gap-8">
          {/* Template Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowTemplateDropdown((prev) => !prev);
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Change Template"
            >
              <FileText size={16} />
              <span className="text-sm">Template</span>
            </button>
            {showTemplateDropdown && (
              <ul className="absolute top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-40">
                {templates.map((template) => (
                  <li
                    key={template}
                    onClick={() => handleTemplateChange(template)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      currentTemplate === template ? 'bg-gray-200' : ''
                    }`}
                  >
                    {template.charAt(0).toUpperCase() + template.slice(1)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Font Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowFontDropdown((prev) => !prev);
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Change Font"
            >
              <Type size={16} />
              <span className="text-sm">Font</span>
            </button>
            {showFontDropdown && (
              <ul className="absolute top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-48">
                {fonts.map((font) => (
                  <li
                    key={font}
                    onClick={() => handleFontChange(font)}
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                      currentFont === font ? 'font-bold' : ''
                    }`}
                  >
                    {font}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowThemeDropdown((prev) => !prev);
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Change Theme"
            >
              <Brush size={16} />
              <span className="text-sm">Theme</span>
            </button>
            {showThemeDropdown && (
              <ul className="absolute top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-48">
                {themeColors.map((color) => (
                  <li
                    key={color.value}
                    onClick={() => handleThemeChange(color.value)}
                    className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }} />
                    {color.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Layout Button */}
          <button
            onClick={() => {
              closeAllDropdowns();
              onToggleLayout();
            }}
            className={`flex items-center gap-2 focus:outline-none ${
              isLayoutVisible ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'
            }`}
            aria-label="Toggle Layout"
          >
            <Layout size={16} />
            <span className="text-sm">Layout</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Download"
          >
            <Download size={16} />
            <span className="text-sm">{loading ? 'Downloading...' : 'Download'}</span>
          </button>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="text-gray-700 hover:text-gray-900 focus:outline-none" aria-label="Logout">
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
