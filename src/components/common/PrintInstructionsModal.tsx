import React from 'react';
import { X } from 'lucide-react';

interface PrintInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
}

const PrintInstructionsModal: React.FC<PrintInstructionsModalProps> = ({
  isOpen,
  onClose,
  onPrint,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Download PDF Instructions</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">Please follow these steps to download your resume as PDF:</p>
          
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Click the "Print" button below</li>
            <li>Select <strong>"Save as PDF"</strong> as the destination</li>
            <li>Set margins to <strong>"None"</strong> in the More Settings section</li>
            <li>Ensure "Background graphics" is checked in More Settings</li>
            <li>Click "Save" to download your resume as PDF</li>
          </ol>

          <div className="flex gap-4 mt-6">
            <button
              onClick={onPrint}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintInstructionsModal;