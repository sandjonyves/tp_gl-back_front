import api from './api';

export interface Vehicle {
  
  registrationNumber: number;
  make: string;
  model: string;
  year: number;
  rentalPrice: number;
}

class VehicleService {
  async getAllVehicles(): Promise<Vehicle[]> {
    const response = await api.get<Vehicle[]>('/vehicles');
    return response.data;
  }

  async getVehicleByRegistrationNumber(registrationNumber: number): Promise<Vehicle> {
    const response = await api.get<Vehicle>(`vehicles/search/registration/${registrationNumber}`);
    return response.data;
  }

  async createVehicle(vehicle: Omit<Vehicle, 'registrationNumber'>): Promise<Vehicle> {
    const response = await api.post<Vehicle>('/vehicles', vehicle);
    return response.data;
  }

  async updateVehicle(registrationNumber: number, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    console.log(registrationNumber)
    const response = await api.put<Vehicle>(`/vehicles/${registrationNumber}`, vehicle);
    return response.data;
  }

  async deleteVehicle(registrationNumber: number): Promise<void> {
    console.log(registrationNumber)
    await api.delete(`/vehicles/${registrationNumber}`);
  }

  async searchByRegistration(registrationNumber: string): Promise<Vehicle> {
    const response = await api.get<Vehicle>(`/vehicles/search/registration/${registrationNumber}`);
    return response.data;
  }

  async searchByPrice(maxPrice: number): Promise<Vehicle[]> {
    const response = await api.get<Vehicle[]>(`/vehicles/search/price/${maxPrice}`);
    return response.data;
  }
}

export const vehicleService = new VehicleService(); 