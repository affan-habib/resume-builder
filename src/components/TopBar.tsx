import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, ArrowRight, Download, Layout, Brush, Type } from 'lucide-react';
import { undo, redo, setFont, changeTheme, changeLayout, download } from '../settingsSlice';
import { RootState } from '../store';

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

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const currentFont = useSelector((state: RootState) => state.settings.font);
  const [showFontDropdown, setShowFontDropdown] = useState(false);

  const handleFontChange = (font: string) => {
    dispatch(setFont(font));
    setShowFontDropdown(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center gap-8 h-14 relative">
          {/* Undo Button */}
          <button
            onClick={() => dispatch(undo())}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Undo"
          >
            <ArrowLeft size={24} />
            <span className="text-sm">Undo</span>
          </button>

          {/* Redo Button */}
          <button
            onClick={() => dispatch(redo())}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Redo"
          >
            <ArrowRight size={24} />
            <span className="text-sm">Redo</span>
          </button>

          {/* Font Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFontDropdown((prev) => !prev)}
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
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                      currentFont === font ? 'font-bold' : ''
                    }`}
                    role="menuitem"
                  >
                    {font}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Theme Button */}
          <button
            onClick={() => dispatch(changeTheme())}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Change Theme"
          >
            <Brush size={24} />
            <span className="text-sm">Theme</span>
          </button>

          {/* Layout Button */}
          <button
            onClick={() => dispatch(changeLayout())}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Change Layout"
          >
            <Layout size={24} />
            <span className="text-sm">Layout</span>
          </button>

          {/* Download Button */}
          <button
            onClick={() => dispatch(download())}
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
