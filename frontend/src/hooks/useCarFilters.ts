import { useState, useEffect } from 'react';

interface Car {
  id: number;
  name: string;
  type: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  transmission: string;
  fuel: string;
  passengers: number;
  features: string[];
  available: boolean;
  popular: boolean;
}

interface Filters {
  location: string;
  dateFrom: string;
  dateTo: string;
  priceRange: [number, number];
  carType: string;
  transmission: string;
  fuelType: string;
  passengers: string;
}

export const useCarFilters = (cars: Car[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    location: '',
    dateFrom: '',
    dateTo: '',
    priceRange: [0, 500],
    carType: '',
    transmission: '',
    fuelType: '',
    passengers: '',
  });
  const [filteredCars, setFilteredCars] = useState(cars);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    let filtered = cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = !selectedFilters.location || 
                            car.location.toLowerCase().includes(selectedFilters.location.toLowerCase());
      const matchesCarType = !selectedFilters.carType || 
                           car.type === selectedFilters.carType;
      const matchesTransmission = !selectedFilters.transmission || 
                                car.transmission === selectedFilters.transmission;
      const matchesFuel = !selectedFilters.fuelType || 
                         car.fuel === selectedFilters.fuelType;
      const matchesPassengers = !selectedFilters.passengers || 
                              car.passengers >= parseInt(selectedFilters.passengers);
      const matchesPrice = car.price >= selectedFilters.priceRange[0] && 
                          car.price <= selectedFilters.priceRange[1];

      return matchesSearch && matchesLocation && matchesCarType && 
             matchesTransmission && matchesFuel && matchesPassengers && matchesPrice;
    });

    // Sort cars
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
    }

    setFilteredCars(filtered);
  }, [searchQuery, selectedFilters, sortBy, cars]);

  const clearFilters = () => {
    setSelectedFilters({
      location: '',
      dateFrom: '',
      dateTo: '',
      priceRange: [0, 500],
      carType: '',
      transmission: '',
      fuelType: '',
      passengers: '',
    });
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedFilters,
    setSelectedFilters,
    filteredCars,
    sortBy,
    setSortBy,
    clearFilters,
  };
}; 