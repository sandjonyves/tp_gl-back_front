import React, { useState, useEffect } from 'react';
import { Car, Users } from 'lucide-react';
import { vehicleService } from '@/services/vehicle.service';
import { authService } from '@/services/auth.service';

interface Stats {
  title: string;
  value: string | number;
  icon: any;
  change: string;
  loading?: boolean;
}

export const DashboardStats = () => {
  const [stats, setStats] = useState<Stats[]>([
    { title: 'Total Cars', value: '0', icon: Car, change: '0%', loading: true },
    { title: 'Total Users', value: '0', icon: Users, change: '0%', loading: true },
  ]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const users = await authService.getAllUsers();
      const vehicles = await vehicleService.getAllVehicles();
      const totalCars = vehicles.length;
      const totalUsers = users.length; // Corrigé : utiliser users.length au lieu de 1

      setStats([
        {
          title: 'Total Cars',
          value: totalCars,
          icon: Car,
          change: '0%',
          loading: false,
        },
        {
          title: 'Total Users',
          value: totalUsers,
          icon: Users, // Corrigé : utiliser Users au lieu de users
          change: '0%',
          loading: false,
        },
      ]);
    } catch (error: any) {
      console.error('Error loading stats:', error);
      // Gérer spécifiquement les erreurs 404
      if (error.response?.status === 404) {
        setStats(prevStats =>
          prevStats.map(stat => ({
            ...stat,
            value: 0, // Afficher 0 pour les 404
            loading: false,
          }))
        );
      } else {
        // Gérer les autres erreurs
        setStats(prevStats =>
          prevStats.map(stat => ({
            ...stat,
            value: 'Erreur',
            loading: false,
          }))
        );
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              {stat.loading ? (
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              )}
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};