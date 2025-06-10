import React from 'react';

export const WelcomeMessage = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-block px-4 py-2 bg-pink-100 rounded-full text-pink-600 text-sm mb-4">
        ✨ Join the adventure!
      </div>
      <h1 className="text-4xl font-bold mb-4">
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Create Your Account
        </span>
      </h1>
      <p className="text-gray-600">
        Start your journey with amazing cars and unforgettable experiences
      </p>
    </div>
  );
}; 