import React from 'react';
import { BookOpen } from 'lucide-react';

export const SupervisorSection = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          Encadrement
        </h3>
      </div>
      <div className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
        <p className="font-medium text-gray-900">Dr. Alain Mvondo</p>
        <p className="text-sm text-gray-500">Encadrant du projet</p>
      </div>
    </div>
  );
}; 