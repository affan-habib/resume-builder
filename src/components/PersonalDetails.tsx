import React from 'react';
import { User } from 'lucide-react';

export function PersonalDetails() {
  return (
    <div className="p-8 border-b">
      <div className="flex gap-8">
        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
          <User className="w-16 h-16 text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="h-8 w-48 bg-gray-200 rounded mb-3" />
          <div className="h-6 w-64 bg-gray-100 rounded mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-3/4 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}