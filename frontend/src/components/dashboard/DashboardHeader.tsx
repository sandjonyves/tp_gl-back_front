import React, { useState } from 'react';
import { Car, LogOut, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

interface User {
  name: string;
  role: string;
}

export const DashboardHeader = () => {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // const userStr = localStorage.getItem('user');
  // const user: User | null = userStr ? JSON.parse(userStr) : null;

  const handleLogout = async () => {
    const response = await authService.logout()
    if (response){
      localStorage.removeItem('user')
      router.push('/auth/signin');
    }else{
      alert('impossible de se deconnecter')
    }
   
  };

  // if (!user) return null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Propelize Admin
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-3 py-2 hover:from-pink-200 hover:to-purple-200 transition-all"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {/* {user.name.charAt(0).toUpperCase()} */}A
                </div>
                {/* <span className="text-sm text-pink-600 font-medium">{user.name}</span> */}
                <ChevronDown className={`w-4 h-4 text-pink-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    {/* <p className="text-sm font-medium text-gray-900">{user.name}</p> */}
                    {/* <p className="text-xs text-gray-500">{user.role}</p> */}
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 