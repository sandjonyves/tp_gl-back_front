import React from 'react';
import { Users } from 'lucide-react';

export const TeamSection = () => {
  const teamMembers = [
    { name: 'Wouatchou Yves', role: 'Devops' },
    { name: 'Wirngo Obed', role: 'Développeur front' },
    { name: 'Mouope Stefan', role: 'Développeur full' },
    { name: 'Dabout Nestline', role: 'Testeuse' },
    { name: 'Domkam Yvan', role: 'Développeur back' },
    { name: 'Tindi Ornella', role: 'Développeuse full stack' },
    { name: 'Cindy joyce', role: 'devellopeuse front' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          Notre équipe
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
            <p className="font-medium text-gray-900">{member.name}</p>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 


// import React, { useState, useEffect } from 'react';
// import { Search, Plus, Edit2, Trash2, Filter, Grid, List, Star, MapPin, X, ArrowUpDown } from 'lucide-react';
// import { Button, Input, Table, Card, Badge } from '@/components/ui';
// import { CarModal } from './CarModal';
// import { vehicleService, Vehicle } from '@/services/vehicle.service';

// interface CarsManagementProps {
//   showAddModal: boolean;
//   setShowAddModal: (show: boolean) => void;
// }

// interface PriceFilter {
//   min: number;
//   max: number;
// }

// export const CarsManagement = ({ showAddModal, setShowAddModal }: CarsManagementProps) => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [editingCar, setEditingCar] = useState<Vehicle | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [cars, setCars] = useState<Vehicle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [priceFilter, setPriceFilter] = useState<PriceFilter>({ min: 0, max: 1000 });
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

//   useEffect(() => {
//     loadVehicles();
//   }, []);

//   const loadVehicles = async () => {
//     try {
//       setLoading(true);
//       const vehicles = await vehicleService.getAllVehicles();
//       console.log('Loaded vehicles:', vehicles); // Debug log
//       setCars(vehicles);
//       setError(null);
//     } catch (err) {
//       console.error('Error loading vehicles:', err);
//       setError('Failed to load vehicles');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditCar = (car: Vehicle) => {
//     setEditingCar(car);
//     setShowAddModal(true);
//   };

//   const handleDeleteCar = async (registrationNumber: number) => {
//     try {
//       await vehicleService.deleteVehicle(registrationNumber);
//       setCars(cars.filter(car => car.registrationNumber !== registrationNumber));
//     } catch (err) {
//       console.error('Error deleting vehicle:', err);
//     }
//   };

//   const handleAddCar = async (carData: Omit<Vehicle, 'registrationNumber'>) => {
//     try {
//       const newCar = await vehicleService.createVehicle(carData);
//       console.log('Added new car:', newCar); // Debug log
//       setCars([...cars, newCar]);
//       setShowAddModal(false);
//     } catch (err) {
//       console.error('Error adding vehicle:', err);
//     }
//   };

//   const handleUpdateCar = async (registrationNumber: number, carData: Partial<Vehicle>) => {
//     try {
//       const updatedCar = await vehicleService.updateVehicle(registrationNumber, carData);
//       console.log('Updated car:', updatedCar); // Debug log
//       setCars(cars.map(car => car.registrationNumber === registrationNumber ? updatedCar : car));
//       setShowAddModal(false);
//       setEditingCar(null);
//     } catch (err) {
//       console.error('Error updating vehicle:', err);
//     }
//   };

//   const filteredCars = cars.filter(car => {
//     const matchesSearch = 
//       String(car.registrationNumber).toLowerCase().includes(searchTerm.toLowerCase()) ||
//       car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       car.model.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesPrice = 
//       car.rentalPrice >= priceFilter.min && 
//       car.rentalPrice <= priceFilter.max;

//     return matchesSearch && matchesPrice;
//   }).sort((a, b) => {
//     if (sortOrder === 'asc') {
//       return a.rentalPrice - b.rentalPrice;
//     } else if (sortOrder === 'desc') {
//       return b.rentalPrice - a.rentalPrice;
//     }
//     return 0;
//   });

//   const handlePriceFilterChange = (type: 'min' | 'max', value: string) => {
//     const numValue = value === '' ? 0 : Number(value);
//     setPriceFilter(prev => ({
//       ...prev,
//       [type]: numValue
//     }));
//   };

//   const clearFilters = () => {
//     setPriceFilter({ min: 0, max: 1000 });
//     setSearchTerm('');
//   };

//   const handleSort = (order: 'asc' | 'desc') => {
//     setSortOrder(order);
//     setShowFilters(false);
//   };

//   const columns = [
//     {
//       header: 'Vehicle',
//       accessor: (car: Vehicle) => (
//         <div className="flex items-center space-x-3">
//           <div className="text-2xl">🚗</div>
//           <div>
//             <div className="font-medium text-gray-900">{car.make} {car.model}</div>
//             <div className="text-sm text-gray-500">{car.registrationNumber}</div>
//           </div>
//         </div>
//       )
//     },
//     { 
//       header: 'Year', 
//       accessor: (car: Vehicle) => car.year 
//     },
//     {
//       header: 'Price',
//       accessor: (car: Vehicle) => (
//         <span className="font-bold text-pink-600">${car.rentalPrice}/day</span>
//       )
//     },
//     {
//       header: 'Actions',
//       accessor: (car: Vehicle) => (
//         <div className="flex justify-end space-x-2">
//           <Button
//             variant="ghost"
//             size="sm"
//             icon={Edit2}
//             onClick={() => handleEditCar(car)}
//             className="hover:text-blue-600 hover:bg-blue-50"
//           />
//           <Button
//             variant="ghost"
//             size="sm"
//             icon={Trash2}
//             onClick={() => handleDeleteCar(car.registrationNumber)}
//             className="hover:text-red-600 hover:bg-red-50"
//           />
//         </div>
//       )
//     }
//   ];

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // if (error) {
//   //   return <div className="text-red-500">{error}</div>;
//   // }

//   return (
//     <div className="space-y-6">
//       {/* Header Actions */}
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <div className="flex items-center space-x-4">
//           <Input
//             icon={Search}
//             placeholder="Search vehicles..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-64"
//           />
//           <div className="relative">
//             <Button
//               variant="outline"
//               icon={ArrowUpDown}
//               onClick={() => setShowFilters(!showFilters)}
//               className={showFilters ? 'bg-pink-50 border-pink-200 text-pink-600' : ''}
//             >
//               Sort by Price
//             </Button>

//             {showFilters && (
//               <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
//                 <button
//                   onClick={() => handleSort('asc')}
//                   className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
//                     sortOrder === 'asc' ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
//                   }`}
//                 >
//                   <ArrowUpDown className="w-4 h-4" />
//                   <span>Price: Low to High</span>
//                 </button>
//                 <button
//                   onClick={() => handleSort('desc')}
//                   className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
//                     sortOrder === 'desc' ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
//                   }`}
//                 >
//                   <ArrowUpDown className="w-4 h-4" />
//                   <span>Price: High to Low</span>
//                 </button>
//                 {sortOrder && (
//                   <button
//                     onClick={() => {
//                       setSortOrder(null);
//                       setShowFilters(false);
//                     }}
//                     className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2 mt-1 border-t border-gray-100"
//                   >
//                     <X className="w-4 h-4" />
//                     <span>Clear Sort</span>
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <div className="flex bg-gray-100 rounded-xl p-1">
//             <Button
//               variant="ghost"
//               size="sm"
//               icon={Grid}
//               onClick={() => setViewMode('grid')}
//               className={viewMode === 'grid' ? 'bg-white shadow-sm' : ''}
//             />
//             <Button
//               variant="ghost"
//               size="sm"
//               icon={List}
//               onClick={() => setViewMode('list')}
//               className={viewMode === 'list' ? 'bg-white shadow-sm' : ''}
//             />
//           </div>
          
//           <Button
//             icon={Plus}
//             onClick={() => {
//               setEditingCar(null);
//               setShowAddModal(true);
//             }}
//           >
//             Add Vehicle
//           </Button>
//         </div>
//       </div>

//       {/* Debug info */}
//       <div className="text-sm text-gray-500">
//         Total vehicles: {cars.length}, Filtered: {filteredCars.length}
//         {sortOrder && (
//           <span className="ml-2 text-pink-600">
//             (Sorted by price {sortOrder === 'asc' ? 'ascending' : 'descending'})
//           </span>
//         )}
//       </div>

//       {filteredCars.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">No cars found</h3>
//             <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
//             {/* <button
//               onClick={clearFilters}
//               className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all"
//             >
//               Clear All Filters
//             </button> */}
//           </div>
//         )}

//       {/* Vehicles grid/List */}
//       {viewMode === 'grid' ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredCars.map(car => (
//             <Card key={`car-${car.registrationNumber}`} hover className="p-6">
//               <div className="text-center mb-4">
//                 <div className="text-4xl mb-2">🚗</div>
//                 <h3 className="text-xl font-bold text-gray-900">{car.make} {car.model}</h3>
//                 <p className="text-gray-600">{car.registrationNumber}</p>
//               </div>
              
//               <div className="space-y-3 text-sm">
//                 <div className="flex items-center justify-between">
//                   <span className="text-2xl font-bold text-pink-600">${car.rentalPrice}</span>
//                   <span className="text-gray-500">/day</span>
//                 </div>
                
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <span>Year: {car.year}</span>
//                 </div>
                
//                 <div className="flex justify-end space-x-2 pt-2">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     icon={Edit2}
//                     onClick={() => handleEditCar(car)}
//                     className="hover:text-blue-600 hover:bg-blue-50"
//                   />
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     icon={Trash2}
//                     onClick={() => handleDeleteCar(car.registrationNumber)}
//                     className="hover:text-red-600 hover:bg-red-50"
//                   />
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <Table
//           columns={columns}
//           data={filteredCars}
//           onRowClick={(car) => handleEditCar(car)}
//         />
//       )}

       {/* {showAddModal && (
        <CarModal
          editingCar={editingCar}
          setEditingCar={setEditingCar}
          setShowAddModal={setShowAddModal}
          onAdd={handleAddCar}
          onUpdate={handleUpdateCar}
        />
      )} */}
//     </div>
//   );
// }; 