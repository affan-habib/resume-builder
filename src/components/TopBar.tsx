import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Download, Layout, Brush, Type } from 'lucide-react';

interface TopBarProps {
  onUndo: () => void;
  onRedo: () => void;
  onThemeChange: () => void;
  onLayoutChange: () => void;
  onDownload: () => void;
  onFontChange: (font: string) => void;
}

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
const TopBar: React.FC<TopBarProps> = ({
  onUndo,
  onRedo,
  onThemeChange,
  onLayoutChange,
  onDownload,
  onFontChange,
}) => {
  const [showFontDropdown, setShowFontDropdown] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center gap-8 h-14 relative">
          <button
            onClick={onUndo}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Undo"
          >
            <ArrowLeft size={24} />
            <span className="text-sm">Undo</span>
          </button>
          <button
            onClick={onRedo}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Redo"
          >
            <ArrowRight size={24} />
            <span className="text-sm">Redo</span>
          </button>
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
              <ul className="absolute top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-48">
                {fonts.map((font) => (
                  <li
                    key={font}
                    onClick={() => {
                      onFontChange(font);
                      setShowFontDropdown(false);
                    }}
                    className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-100"
                  >
                    {font}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={onThemeChange}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Change Theme"
          >
            <Brush size={24} />
            <span className="text-sm">Theme</span>
          </button>
          <button
            onClick={onLayoutChange}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Change Layout"
          >
            <Layout size={24} />
            <span className="text-sm">Layout</span>
          </button>
          <button
            onClick={onDownload}
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
