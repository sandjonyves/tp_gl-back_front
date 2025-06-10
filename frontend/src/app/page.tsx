'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectHeader } from '@/components/dashboard/ProjectHeader';
import { ProjectDescription } from '@/components/dashboard/ProjectDescription';
import { TeamSection } from '@/components/dashboard/TeamSection';
import { SupervisorSection } from '@/components/dashboard/SupervisorSection';
import { ProjectAccess } from '@/components/dashboard/ProjectAccess';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProjectHeader />
        <ProjectDescription />
        <TeamSection />
        <SupervisorSection />
        <ProjectAccess />
      </div>
    </main>
  );
} 