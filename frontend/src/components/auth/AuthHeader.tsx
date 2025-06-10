import React from 'react';
import Link from 'next/link';

export const AuthHeader = () => {
  return (
    <div className="flex justify-between items-center p-6">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">🚗</span>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Propelize
        </span>
      </div>
      <div className="hidden md:flex space-x-8 text-gray-600">
        <Link href="#" className="hover:text-pink-500 transition-colors">Cars</Link>
        <Link href="#" className="hover:text-pink-500 transition-colors">About</Link>
        <Link href="#" className="hover:text-pink-500 transition-colors">Contact</Link>
      </div>
      <Link href="/auth/signin">
        <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all">
          Sign In
        </button>
      </Link>
    </div>
  );
}; 