'use client';

import React, { useState } from 'react';
import { Car, BookOpen, Users, Settings, BarChart3 } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { CarsManagement } from '@/components/dashboard/CarsManagement';
import { UnderDevelopment } from '@/components/dashboard/UnderDevelopment';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'cars', name: 'Cars Management', icon: Car },
    // { id: 'bookings', name: 'Bookings', icon: BookOpen },
    // { id: 'users', name: 'Users', icon: Users },
    // { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <DashboardStats />
            <QuickActions setActiveTab={setActiveTab} setShowAddModal={setShowAddModal} />
          </div>
        )}

        {activeTab === 'cars' && (
          <CarsManagement showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
        )}

        {/* {['bookings', 'users', 'settings'].includes(activeTab) && (
          <UnderDevelopment section={activeTab} />
        )} */}
      </div>
    </div>
  );
} 