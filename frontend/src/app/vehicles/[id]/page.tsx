'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, ArrowLeft, Calendar, Users, Fuel, Settings, Shield, Star, Loader2 } from 'lucide-react';
import { vehicleService } from '@/services/vehicle.service';
// Types
interface Vehicle {
  id?: number;
  make: string;
  model: string;
  year: number;
  registrationNumber: number;
  rentalPrice: number;
  // Ajoutez d'autres propriétés selon votre modèle
}

// Service API (à adapter selon votre structure)


export default function VehicleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const registrationNumber = params?.id as string;
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Images par défaut (vous pouvez les adapter selon votre système)
  const defaultImages = ["🚗", "🚙", "🏎️", "🚘"];

  // Features par défaut (à adapter selon vos données)
  const getVehicleFeatures = (vehicle: Vehicle) => [
    { icon: Users, label: "Seats", value: "5 places" },
    { icon: Settings, label: "Transmission", value: "Automatique" },
    { icon: Fuel, label: "Fuel", value: "Essence" },
    { icon: Shield, label: "Insurance", value: "Assurance incluse" }
  ];

  const getVehicleSpecs = (vehicle: Vehicle) => [
    { label: "Année", value: vehicle.year.toString() },
    { label: "Immatriculation", value: vehicle.registrationNumber.toString() },
    { label: "Prix/jour", value: `$${vehicle.rentalPrice}` },
    { label: "Marque", value: vehicle.make }
  ];

  // Chargement des données du véhicule
  useEffect(() => {
   
    if (!registrationNumber) return;

    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const vehicleData = await vehicleService.getVehicleByRegistrationNumber(
          parseInt(registrationNumber)
        );
        setVehicle(vehicleData);
        
        // Vérifier si le véhicule est en favoris (localStorage ou votre système)
        const favorites = JSON.parse(localStorage.getItem('favoriteCars') || '[]');
        setIsFavorite(favorites.includes(vehicleData.registrationNumber));
      } catch (err) {
        setError('Impossible de charger les détails du véhicule');
        console.error('Error fetching vehicle:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [registrationNumber]);

  const toggleFavorite = () => {
    if (!vehicle) return;
    
    const favorites = JSON.parse(localStorage.getItem('favoriteCars') || '[]');
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter((id: number) => id !== vehicle.registrationNumber);
    } else {
      updatedFavorites = [...favorites, vehicle.registrationNumber];
    }
    
    localStorage.setItem('favoriteCars', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleBooking = async () => {
    if (!vehicle || !startDate || !endDate) {
      alert('Veuillez sélectionner les dates de réservation');
      return;
    }

    // Logique de réservation à implémenter
    console.log('Booking:', {
      vehicleId: vehicle.registrationNumber,
      startDate,
      endDate
    });
    
    alert('Réservation en cours de traitement...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement des détails du véhicule...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Véhicule introuvable</h2>
          <p className="text-gray-600 mb-6">{error || 'Ce véhicule n\'existe pas ou n\'est plus disponible'}</p>
          <Link href="/vehicles" className="inline-block">
            <button className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all">
              Retour aux véhicules
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const features = getVehicleFeatures(vehicle);
  const specifications = getVehicleSpecs(vehicle);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-lg"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 flex items-center justify-center relative h-80">
              <div className="text-8xl">{defaultImages[selectedImage]}</div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {vehicle.year}
              </div>
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex space-x-3">
              {defaultImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl flex items-center justify-center text-2xl transition-all ${
                    selectedImage === index 
                      ? 'bg-gradient-to-br from-pink-100 to-purple-100 ring-2 ring-pink-300' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {image}
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {vehicle.make} {vehicle.model}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-500">(24 avis)</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">N° {vehicle.registrationNumber}</span>
              </div>
              
              <div className="flex items-baseline space-x-2 mb-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {vehicle.rentalPrice}
                </div>
                <div className="text-gray-500">/XAF</div>
              </div>
            </div>

           
           
          </div>
        </div>
      </div>
    </div>
  );
}