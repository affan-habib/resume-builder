import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Download, Layout, Brush, Type, FileText } from 'lucide-react';
import { setFont, setTheme, setTemplate, templates } from '@/store/slices/settingsSlice';
import { RootState } from '@/store/store';

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

  const handleFontChange = (font: string) => {
    dispatch(setFont(font));
    setShowFontDropdown(false);
  };

  const handleThemeChange = (color: string) => {
    dispatch(setTheme(color));
    setShowThemeDropdown(false);
  };

  const handleTemplateChange = (templateId: string) => {
    dispatch(setTemplate(templateId));
    setShowTemplateDropdown(false);
  };

  const closeAllDropdowns = () => {
    setShowFontDropdown(false);
    setShowThemeDropdown(false);
    setShowTemplateDropdown(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10 no-print">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center gap-8 h-14 relative">
          {/* Template Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowTemplateDropdown(prev => !prev);
              }}
              className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Change Template"
            >
              <FileText size={24} />
              <span className="text-sm">Template</span>
            </button>
            {showTemplateDropdown && (
              <ul
                className="absolute top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-56"
                role="menu"
                aria-labelledby="template-menu"
              >
                {templates.map((template) => (
                  <li
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${currentTemplate === template.id ? 'bg-gray-50' : ''
                      }`}
                    role="menuitem"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{template.name}</span>
                      <div className={`mt-1 text-xs p-2 rounded ${template.personalDetailsStyle.background} ${template.personalDetailsStyle.textColor}`}>
                        Preview
                      </div>
                    </div>
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
                setShowFontDropdown(prev => !prev);
              }}
              className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Change Font"
            >
              <Type size={24} />
              <span className="text-sm">Font</span>
            </button>
            {showFontDropdown && (
              <ul
                className="absolute top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-48"
                role="menu"
                aria-labelledby="font-menu"
              >
                {fonts.map((font) => (
                  <li
                    key={font}
                    onClick={() => handleFontChange(font)}
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${currentFont === font ? 'font-bold' : ''
                      }`}
                    role="menuitem"
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
                setShowThemeDropdown(prev => !prev);
              }}
              className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Change Theme"
            >
              <Brush size={24} />
              <span className="text-sm">Theme</span>
            </button>
            {showThemeDropdown && (
              <ul
                className="absolute top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-48"
                role="menu"
                aria-labelledby="theme-menu"
              >
                {themeColors.map((color) => (
                  <li
                    key={color.value}
                    onClick={() => handleThemeChange(color.value)}
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 flex items-center gap-2 ${currentTheme === color.value ? 'font-bold' : ''
                      }`}
                    role="menuitem"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
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
            className={`flex flex-col items-center focus:outline-none ${isLayoutVisible ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'
              }`}
            aria-label="Toggle Layout"
          >
            <Layout size={24} />
            <span className="text-sm">Layout</span>
          </button>

          {/* Download Button */}
          <button
            onClick={() => {
              closeAllDropdowns();
              window.print()
            }}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Download"
          >
            <Download size={24} />
            <span className="text-sm">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
