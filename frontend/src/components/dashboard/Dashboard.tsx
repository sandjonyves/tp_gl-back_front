import React, { useState } from 'react';
import { Car, Users, Calendar, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui';
import { CarsManagement } from './CarsManagement';
import { UnderDevelopment } from './UnderDevelopment';

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('cars');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddNew = () => {
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          
          <nav className="flex-1 px-4 space-y-1">
            <button
              onClick={() => setActiveSection('cars')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === 'cars'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Car className="w-5 h-5" />
              <span>Cars Management</span>
            </button>
            
            <button
              onClick={() => setActiveSection('users')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === 'users'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Users Management</span>
            </button>
            
            <button
              onClick={() => setActiveSection('bookings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === 'bookings'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Bookings Management</span>
            </button>
            
            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === 'settings'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {activeSection === 'cars' && 'Cars Management'}
                {activeSection === 'users' && 'Users Management'}
                {activeSection === 'bookings' && 'Bookings Management'}
                {activeSection === 'settings' && 'Settings'}
              </h2>
              <p className="text-gray-600 mt-1">
                {activeSection === 'cars' && 'Manage your fleet of vehicles'}
                {activeSection === 'users' && 'Manage user accounts and permissions'}
                {activeSection === 'bookings' && 'View and manage booking requests'}
                {activeSection === 'settings' && 'Configure your application settings'}
              </p>
            </div>
            
            {activeSection === 'cars' && (
              <Button
                icon={Plus}
                onClick={handleAddNew}
              >
                Add a new car
              </Button>
            )}
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {activeSection === 'cars' && (
              <CarsManagement
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
              />
            )}
            {activeSection === 'users' && <UnderDevelopment section="users" />}
            {activeSection === 'bookings' && <UnderDevelopment section="bookings" />}
            {activeSection === 'settings' && <UnderDevelopment section="settings" />}
          </div>
        </div>
      </div>
    </div>
  );
}; 