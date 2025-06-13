import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Grid, List, ArrowUpDown, X } from 'lucide-react';
import { Button, Input, Table, Card } from '@/components/ui';
import { CarModal } from './CarModal';
import { vehicleService, Vehicle } from '@/services/vehicle.service';

interface CarsManagementProps {
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PriceFilter {
  min: number;
  max: number;
}

export const CarsManagement: React.FC<CarsManagementProps> = ({
  showAddModal,
  setShowAddModal,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingCar, setEditingCar] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>({ min: 0, max: 1000 });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [filteredTestCars, setFilteredCars] = useState<Vehicle[]>([]);
  useEffect(() => {
    loadVehicles();
   
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const vehicles = await vehicleService.getAllVehicles();
      setFilteredCars(vehicles);
       // Debug log
      setCars(vehicles);
      
      setError(null);
    } catch (err: any) {
      console.error('Error loading vehicles:', err);
      setError(err.message.includes('forbidden') ? 'Accès refusé : permissions insuffisantes' : 'Échec du chargement des véhicules. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCar = (car: Vehicle) => {
    setEditingCar(car);
    setShowAddModal(true);
  };

  const handleDeleteCar = async (registrationNumber: number) => {
    try {
      await vehicleService.deleteVehicle(registrationNumber);
      setCars(cars.filter(car => car.registrationNumber !== registrationNumber));
    } catch (err: any) {
      console.error('Error deleting vehicle:', err);
      setError(err.message.includes('forbidden') ? 'Accès refusé : impossible de supprimer' : 'Échec de la suppression du véhicule. Veuillez réessayer.');
    }
  };

  const handleAddCar = async (carData: Omit<Vehicle, 'registrationNumber'>) => {
    try {
      const newCar = await vehicleService.createVehicle(carData);
      setCars([...cars, newCar]);
      setShowAddModal(false);
    } catch (err: any) {
      console.error('Error adding vehicle:', err);
      setError(err.message.includes('forbidden') ? 'Accès refusé : impossible d\'ajouter' : 'Échec de l\'ajout du véhicule. Veuillez réessayer.');
    }
  };

  const handleUpdateCar = async (registrationNumber: number, carData: Partial<Vehicle>) => {
    try {
      const updatedCar = await vehicleService.updateVehicle(registrationNumber, carData);
      setCars(cars.map(car => 
        car.registrationNumber === registrationNumber ? updatedCar : car
      ));
      setShowAddModal(false);
      setEditingCar(null);
    } catch (err: any) {
      console.error('Error updating vehicle:', err);
      setError(err.message.includes('forbidden') ? 'Accès refusé : impossible de modifier' : 'Échec de la modification du véhicule. Veuillez réessayer.');
    }
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      String(car.registrationNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (car.make || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (car.model || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = 
      (car.rentalPrice || 0) >= priceFilter.min && 
      (car.rentalPrice || 0) <= priceFilter.max;

    return matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortOrder === 'asc') {
      return (a.rentalPrice || 0) - (b.rentalPrice || 0);
    } else if (sortOrder === 'desc') {
      return (b.rentalPrice || 0) - (a.rentalPrice || 0);
    }
    return 0;
  });

  const handlePriceFilterChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setPriceFilter(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  const clearFilters = () => {
    setPriceFilter({ min: 0, max: 1000 });
    setSearchTerm('');
    setSortOrder(null);
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    setShowFilters(false);
  };

  const columns = [
    {
      header: 'Véhicule',
      accessor: (car: Vehicle) => (
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🚗</div>
          <div>
            <div className="font-medium text-gray-900">{car.make} {car.model}</div>
            <div className="text-sm text-gray-500">{car.registrationNumber}</div>
          </div>
        </div>
      )
    },
    { 
      header: 'Année', 
      accessor: (car: Vehicle) => car.year 
    },
    {
      header: 'Prix',
      accessor: (car: Vehicle) => (
        <span className="font-bold text-pink-600">${car.rentalPrice}/jour</span>
      )
    },
    {
      header: 'Actions',
      accessor: (car: Vehicle) => (
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Edit2}
            onClick={(e) => {
              e.stopPropagation();
              handleEditCar(car);
            }}
            className="hover:text-blue-600 hover:bg-blue-50"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCar(car.registrationNumber);
            }}
            className="hover:text-red-600 hover:bg-red-50"
          />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Input
            icon={Search}
            placeholder="Rechercher un véhicule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <div className="relative">
            <Button
              variant="outline"
              icon={ArrowUpDown}
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-pink-50 border-pink-200 text-pink-600' : ''}
            >
              Trier par prix
            </Button>
            {showFilters && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                <button
                  onClick={() => handleSort('asc')}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                    sortOrder === 'asc' ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                  }`}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Prix : croissant</span>
                </button>
                <button
                  onClick={() => handleSort('desc')}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                    sortOrder === 'desc' ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                  }`}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Prix : décroissant</span>
                </button>
                {sortOrder && (
                  <button
                    onClick={() => {
                      setSortOrder(null);
                      setShowFilters(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2 mt-1 border-t border-gray-100"
                  >
                    <X className="w-4 h-4" />
                    <span>Supprimer le tri</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <Button
              variant="ghost"
              size="sm"
              icon={Grid}
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-white shadow-sm' : ''}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={List}
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-white shadow-sm' : ''}
            />
          </div>
          <Button
            icon={Plus}
            onClick={() => {
              setEditingCar(null);
              setShowAddModal(true);
            }}
          >
            Ajouter un véhicule
          </Button>
        </div>
      </div>

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-sm text-gray-500">
          Total véhicules : {cars.length}, Filtrés : {filteredCars.length}
          {sortOrder && (
            <span className="ml-2 text-pink-600">
              (Trié par prix {sortOrder === 'asc' ? 'croissant' : 'décroissant'})
            </span>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64 text-blue-600">Chargement des véhicules...</div>
      ) : filteredCars.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Aucun véhicule trouvé</h3>
          <p className="text-gray-600 mb-4">Essayez d'ajuster vos critères de recherche ou vos filtres</p>
          <Button onClick={clearFilters} className="px-6 py-3">
            Supprimer tous les filtres
          </Button>
        </div>
      ) : (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map(car => (
              <Card key={`car-${car.registrationNumber}`} hover className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🚗</div>
                  <h3 className="text-xl font-bold text-gray-900">{car.make} {car.model}</h3>
                  <p className="text-gray-600">{car.registrationNumber}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-600">${car.rentalPrice}</span>
                    <span className="text-gray-500">/jour</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span>Année : {car.year}</span>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Edit2}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCar(car);
                      }}
                      className="hover:text-blue-600 hover:bg-blue-50"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCar(car.registrationNumber);
                      }}
                      className="hover:text-red-600 hover:bg-red-50"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Table
            columns={columns}
            data={filteredCars}
            onRowClick={(car) => handleEditCar(car)}
          />
        )
      )}

      {showAddModal && (
        <CarModal
          editingCar={editingCar}
          setEditingCar={setEditingCar}
          setShowAddModal={setShowAddModal}
          onAdd={handleAddCar}
          onUpdate={handleUpdateCar}
        />
      )}
    </div>
  );
};