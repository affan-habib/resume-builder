import React from 'react';
import { ArrowLeft, ArrowRight, Download, Layout, Brush, Type } from 'lucide-react';

interface TopBarProps {
  onUndo: () => void;
  onRedo: () => void;
  onFontChange: () => void;
  onThemeChange: () => void;
  onLayoutChange: () => void;
  onDownload: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  onUndo,
  onRedo,
  onFontChange,
  onThemeChange,
  onLayoutChange,
  onDownload,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center gap-8 h-14">
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
          <button
            onClick={onFontChange}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Change Font"
          >
            <Type size={24} />
            <span className="text-sm">Font</span>
          </button>
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
