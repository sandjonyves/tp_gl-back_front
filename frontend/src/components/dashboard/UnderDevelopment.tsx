import React from 'react';

interface UnderDevelopmentProps {
  section: string;
}

export const UnderDevelopment = ({ section }: UnderDevelopmentProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
      <div className="text-6xl mb-4">🚧</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {section.charAt(0).toUpperCase() + section.slice(1)} Management
      </h3>
      <p className="text-gray-600">This section is under development. Coming soon!</p>
    </div>
  );
}; 