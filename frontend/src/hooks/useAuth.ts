'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { authService } from '@/services/auth.service';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export function useAuth() {
  // const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


    
  const user = () => {
    const user = localStorage.getItem('user');
    console.log(user)
    return user ? JSON.parse(user) : null;
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    authService.logout()
    router.push('/auth/signin');
  };

  const checkRoleAndRedirect = () => {
    const currentUser = user();
    if (!currentUser) {
      router.push('/auth/signin');
      return;
    }

    const currentPath = window.location.pathname;
    if (currentUser.role === 'admin' && !currentPath.startsWith('/dashboard')) {
      router.push('/dashboard');
    } else if (currentUser.role === 'user' && !currentPath.startsWith('/vehicles')) {
      router.push('/vehicles');
    }
  };

  useEffect(() => {
    checkRoleAndRedirect();
  }, []);

  // Exemple d'utilisation
 

 

  return {
    user,
    logout,
    loading,
    checkRoleAndRedirect
  };
} 