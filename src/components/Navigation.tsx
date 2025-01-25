import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8">
      <button
        onClick={onPrevious}
        disabled={currentSlide === 0}
        className="p-2 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <div className="text-white">
        {currentSlide + 1} / {totalSlides}
      </div>
      <button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="p-2 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};