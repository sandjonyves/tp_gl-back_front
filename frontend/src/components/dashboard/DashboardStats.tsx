import React, { useState, useEffect } from 'react';
import { Car, BookOpen, Users, DollarSign } from 'lucide-react';
import { vehicleService } from '@/services/vehicle.service';

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
      // Charger les véhicules
      const vehicles = await vehicleService.getAllVehicles();
      
      // Calculer les statistiques
      const totalCars = vehicles.length;
      const totalUsers = 1

      // Mettre à jour les stats
      setStats([
        {
          title: 'Total Cars',
          value: totalCars,
          icon: Car,
          change: '0%',
          loading: false
        },
        {
          title: 'Total Users',
          value: totalUsers,
          icon: Users,
          change: '0%',
          loading: false
        }
      ]);
    } catch (error) {
      console.error('Error loading stats:', error);
      // En cas d'erreur, afficher des valeurs par défaut
      setStats(prevStats => prevStats.map(stat => ({
        ...stat,
        value: 'No Cars',
        loading: false
      })));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              {stat.loading ? (
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              )}
              <p className="text-sm text-green-600 font-medium">{stat.change}</p>
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