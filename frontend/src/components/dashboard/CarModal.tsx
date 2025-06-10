import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button, Input, Select } from '@/components/ui';
import { Vehicle } from '@/services/vehicle.service';

interface CarModalProps {
  editingCar: Vehicle | null;
  setEditingCar: (car: Vehicle | null) => void;
  setShowAddModal: (show: boolean) => void;
  onAdd: (carData: Omit<Vehicle, 'id'>) => Promise<void>;
  onUpdate: (id: number, carData: Partial<Vehicle>) => Promise<void>;
}

export const CarModal = ({
  editingCar,
  setEditingCar,
  setShowAddModal,
  onAdd,
  onUpdate,
}: CarModalProps) => {
  const [formData, setFormData] = useState<Omit<Vehicle, 'id'>>({
    registrationNumber: 0,
    make: '',
    model: '',
    year: new Date().getFullYear(),
    rentalPrice: 0,
  });

  useEffect(() => {
    if (editingCar) {
      setFormData({
        registrationNumber: editingCar.registrationNumber,
        make: editingCar.make,
        model: editingCar.model,
        year: editingCar.year,
        rentalPrice: editingCar.rentalPrice,
      });
    }
  }, [editingCar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCar && editingCar.registrationNumber) {
       
        await onUpdate(editingCar.registrationNumber, formData);
      } else {
        await onAdd(formData);
      }
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      registrationNumber: 0,
      make: '',
      model: '',
      year: new Date().getFullYear(),
      rentalPrice: 0,
    });
    setEditingCar(null);
    setShowAddModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6 mt-12">
          <h2 className="text-xl font-bold text-gray-900">
            {editingCar ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            icon={X}
            onClick={handleClose}
            className="hover:bg-gray-100"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className='grid grid-cols-2 gap-2'>
               <Input
            label="Registration Number"
            value={formData.registrationNumber}
            onChange={(e) => setFormData({ ...formData, registrationNumber: parseInt(e.target.value) })}
            required
            type="number"
            pattern="[0-9\-]+"
            title="Please enter a valid registration number (letters, numbers, and hyphens only)"
          />

          <Input
            label="Make"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            required
          />

          <Input
            label="Model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />

          <Input
            label="Year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            required
            min={1900}
            max={new Date().getFullYear() + 1}
          />

          <Input
            label="Rental Price"
            type="number"
            value={formData.rentalPrice}
            onChange={(e) => setFormData({ ...formData, rentalPrice: parseFloat(e.target.value) })}
            required
            min={0}
            step={0.01}
          />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingCar ? 'Update' : 'Add'} Vehicle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}; 