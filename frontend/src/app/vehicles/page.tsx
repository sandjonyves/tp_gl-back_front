'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, MapPin, Calendar, Users, Star, Heart, Settings, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { vehicleService, Vehicle } from '@/services/vehicle.service';
import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default function UserDashboard() {
  const { user, logout, checkRoleAndRedirect } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 500],
    year: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteCars, setFavoriteCars] = useState(new Set<number>());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('registration');
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // useEffect(() => {
  //   checkRoleAndRedirect();
  // }, []);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const vehicles = await vehicleService.getAllVehicles();
      
      // Validation et nettoyage des données
      if (Array.isArray(vehicles)) {
        const validatedVehicles = vehicles.map(vehicle => ({
          registrationNumber: vehicle.registrationNumber || 0,
          make: vehicle.make || 'Marque inconnue',
          model: vehicle.model || 'Modèle inconnu',
          year: vehicle.year || new Date().getFullYear(),
          rentalPrice: vehicle.rentalPrice || 0,
          ...vehicle
        }));
        
        setCars(validatedVehicles);
        console.log('Vehicles loaded:', validatedVehicles.length, 'vehicles');
      } else {
        console.warn('Les données reçues ne sont pas un tableau:', vehicles);
        setCars([]);
      }
    } catch (err: any) {
      console.error('Error loading vehicles:', err);
      setError(
        err.message?.includes('forbidden') 
          ? 'Accès refusé : permissions insuffisantes' 
          : 'Échec du chargement des véhicules'
      );
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrage et tri des véhicules avec useMemo pour optimiser les performances
  const filteredCars = useMemo(() => {
    if (!Array.isArray(cars)) return [];

    let filtered = cars.filter(car => {
      if (!car) return false;

      // Recherche textuelle sécurisée
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        String(car.registrationNumber || '').toLowerCase().includes(searchLower) ||
        String(car.make || '').toLowerCase().includes(searchLower) ||
        String(car.model || '').toLowerCase().includes(searchLower);
      
      // Filtre par année
      const matchesYear = !selectedFilters.year || 
        Number(car.year) === parseInt(selectedFilters.year);
      
      // Filtre par prix
      const price = Number(car.rentalPrice) || 0;
      const matchesPrice = price >= selectedFilters.priceRange[0] && 
        price <= selectedFilters.priceRange[1];

      return matchesSearch && matchesYear && matchesPrice;
    });

    // Tri sécurisé
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (Number(a.rentalPrice) || 0) - (Number(b.rentalPrice) || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (Number(b.rentalPrice) || 0) - (Number(a.rentalPrice) || 0));
        break;
      case 'year':
        filtered.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
        break;
      default:
        filtered.sort((a, b) => (Number(a.registrationNumber) || 0) - (Number(b.registrationNumber) || 0));
        break;
    }

    return filtered;
  }, [searchQuery, selectedFilters, sortBy, cars]);

  const toggleFavorite = (carId: number) => {
    const newFavorites = new Set(favoriteCars);
    if (newFavorites.has(carId)) {
      newFavorites.delete(carId);
    } else {
      newFavorites.add(carId);
    }
    setFavoriteCars(newFavorites);
  };

  const clearFilters = () => {
    setSelectedFilters({
      priceRange: [0, 500],
      year: ''
    });
    setSearchQuery('');
  };

  const handlePriceRangeChange = (value: string) => {
    const numValue = Math.max(0, parseInt(value) || 500);
    setSelectedFilters(prev => ({ 
      ...prev, 
      priceRange: [prev.priceRange[0], numValue] 
    }));
  };

  // Gestion du chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des véhicules...</p>
        </div>
      </div>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="text-red-500 text-xl text-center">{error}</div>
        <button 
          onClick={loadVehicles}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f8f4ff 0%, #e8f5ff 100%)'
    }}>
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-2xl animate-bounce opacity-10">✨</div>
      <div className="absolute top-40 right-20 text-2xl animate-pulse opacity-10">🚗</div>
      <div className="absolute bottom-20 left-20 text-2xl animate-bounce opacity-10 delay-1000">💎</div>

      {/* Header */}
      <DashboardHeader/>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-pink-100 rounded-full text-pink-600 text-sm mb-4">
            ✨ Welcome back, {user?.name || 'User'}!
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Find Your Perfect Ride
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing cars for every journey. From city cruisers to adventure vehicles, we've got the perfect ride waiting for you.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by car name, type, or registration..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedFilters.year}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, year: e.target.value }))}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors appearance-none bg-white min-w-[120px]"
                >
                  <option value="">Any Year</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all ${
                  showFilters 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'border border-gray-300 text-gray-600 hover:border-pink-300'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {(searchQuery || selectedFilters.year || selectedFilters.priceRange[1] !== 500) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 text-red-600 border border-red-300 rounded-xl hover:bg-red-50 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={selectedFilters.year}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">Any Year</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price: ${selectedFilters.priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={selectedFilters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>$0</span>
                    <span>$500</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Available Cars ({filteredCars.length})
            </h2>
            <p className="text-gray-600">Find the perfect car for your next adventure</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="registration">Registration Number</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year">Newest First</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 transition-colors ${
                  viewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 transition-colors ${
                  viewMode === 'list' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Cars Grid/List */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {cars.length === 0 ? 'No cars available' : 'No cars found'}
            </h3>
            <p className="text-gray-600 mb-4">
              {cars.length === 0 
                ? 'Please check back later or contact support' 
                : 'Try adjusting your search criteria or filters'
              }
            </p>
            {cars.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredCars.map((car, index) => (
              <div
                key={car.registrationNumber || `car-${index}`}
                className={`bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Car Image/Icon */}
                <div className={`${
                  viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'
                } bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center relative`}>
                  <div className="text-6xl">🚗</div>
                  
                  <button
                    onClick={() => toggleFavorite(car.registrationNumber)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favoriteCars.has(car.registrationNumber) 
                          ? 'fill-pink-500 text-pink-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                {/* Car Details */}
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {car.make} {car.model}
                      </h3>
                      <p className="text-gray-600 text-sm">Year: {car.year}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        ${car.rentalPrice}
                      </div>
                      <div className="text-gray-500 text-sm">/day</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <span>Registration: {car.registrationNumber}</span>
                    </div>
                  </div>

                  <Link 
                    href={`/vehicles/${car.registrationNumber}`}
                    className="block w-full"
                  >
                    <button
                      className="w-full py-3 rounded-xl font-semibold transition-all bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transform hover:scale-105"
                    >
                      View Details ✨
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}