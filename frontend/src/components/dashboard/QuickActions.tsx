import React from 'react';
import { Plus, Eye, Users } from 'lucide-react';

interface QuickActionsProps {
  setActiveTab: (tab: string) => void;
  setShowAddModal: (show: boolean) => void;
}

export const QuickActions = ({ setActiveTab, setShowAddModal }: QuickActionsProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => {
            setActiveTab('cars');
            // setShowAddModal(true);
          }}
          className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>View Cars</span>
        </button>
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105">
          <Eye className="w-5 h-5" />
          <span></span>
        </button>
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all transform hover:scale-105">
          <Users className="w-5 h-5" />
          <span>Manage Users</span>
        </button>
      </div>
    </div>
  );
}; 