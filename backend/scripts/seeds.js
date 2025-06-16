require('dotenv').config();
const Vehicle = require('../models/vehicle.model'); 
const User = require('../models/user.model');
const { sequelize } = require('../config/db'); // à adapter si nécessaire

async function seed() {
  try {
    console.log("📦 Début du script de seed");

    // Optionnel : reset la base
    await sequelize.sync({ force: true }); // supprime et recrée les tables

    await Vehicle.bulkCreate([
      { registrationNumber: 1234, make: 'Toyota', model: 'Corolla', year: 2020, rentalPrice: 100 },
      { registrationNumber: 2345, make: 'Ford', model: 'Focus', year: 2019, rentalPrice: 90 },
      { registrationNumber: 5678, make: 'Honda', model: 'Civic', year: 2021, rentalPrice: 110 },
      { registrationNumber: 2305, make: 'Chevrolet', model: 'Malibu', year: 2018, rentalPrice: 85 },
      { registrationNumber: 5648, make: 'Nissan', model: 'Altima', year: 2022, rentalPrice: 120 }
    ]);

    await User.bulkCreate([
      { name: 'admin', password: 'admin123', role: 'admin' },
      { name: 'user1', password: 'user123', role: 'user' },
      { name: 'user2', password: 'user456', role: 'user' }
    ]);

    console.log('✅ Seeders exécutés avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
    process.exit(1);
  }
}

seed();
