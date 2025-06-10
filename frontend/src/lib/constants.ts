import { Car } from '../types';

export const SAMPLE_CARS: Car[] = [
  {
    id: 1,
    name: 'Ocean Breeze',
    type: 'Convertible',
    image: '🏎️',
    price: 89,
    rating: 4.9,
    reviews: 156,
    location: 'Miami Beach',
    transmission: 'Automatic',
    fuel: 'Gasoline',
    passengers: 2,
    features: ['GPS', 'Bluetooth', 'AC'],
    available: true,
    popular: true
  },
  {
    id: 2,
    name: 'City Explorer',
    type: 'Compact SUV',
    image: '🚙',
    price: 65,
    rating: 4.7,
    reviews: 203,
    location: 'Downtown',
    transmission: 'Automatic',
    fuel: 'Hybrid',
    passengers: 5,
    features: ['GPS', 'Backup Camera', 'Apple CarPlay'],
    available: true,
    popular: false
  },
  {
    id: 3,
    name: 'Luxury Cruiser',
    type: 'Sedan',
    image: '🚗',
    price: 120,
    rating: 4.8,
    reviews: 89,
    location: 'Airport',
    transmission: 'Automatic',
    fuel: 'Gasoline',
    passengers: 4,
    features: ['Leather Seats', 'Premium Sound', 'GPS'],
    available: true,
    popular: true
  },
  {
    id: 4,
    name: 'Adventure Beast',
    type: 'SUV',
    image: '🚜',
    price: 95,
    rating: 4.6,
    reviews: 134,
    location: 'Mountain View',
    transmission: 'Manual',
    fuel: 'Diesel',
    passengers: 7,
    features: ['4WD', 'Roof Rack', 'GPS'],
    available: false,
    popular: false
  },
  {
    id: 5,
    name: 'Eco Friendly',
    type: 'Electric',
    image: '⚡',
    price: 75,
    rating: 4.9,
    reviews: 267,
    location: 'Tech District',
    transmission: 'Automatic',
    fuel: 'Electric',
    passengers: 4,
    features: ['Fast Charging', 'Autopilot', 'Premium Interior'],
    available: true,
    popular: true
  },
  {
    id: 6,
    name: 'Family Van',
    type: 'Minivan',
    image: '🚐',
    price: 85,
    rating: 4.5,
    reviews: 112,
    location: 'Suburbs',
    transmission: 'Automatic',
    fuel: 'Gasoline',
    passengers: 8,
    features: ['Captain Chairs', 'Entertainment System', 'GPS'],
    available: true,
    popular: false
  }
];

export const CAR_TYPES = [
  'Convertible',
  'Compact SUV',
  'Sedan',
  'SUV',
  'Electric',
  'Minivan'
];

export const TRANSMISSION_TYPES = [
  'Automatic',
  'Manual'
];

export const FUEL_TYPES = [
  'Gasoline',
  'Hybrid',
  'Electric',
  'Diesel'
];

export const PASSENGER_OPTIONS = [
  '2',
  '4',
  '5',
  '7',
  '8'
]; 