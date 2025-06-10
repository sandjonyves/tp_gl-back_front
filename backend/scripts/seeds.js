const  Vehicle  = require('../models/vehicle.model'); 
const  User = require('../models/user.model');

async function seed() {
  await Vehicle.bulkCreate([
    { registrationNumber: 'ABC123', make: 'Toyota', model: 'Corolla', year: 2020, rentalPrice: 100 },
    { registrationNumber: 'XYZ789', make: 'Ford', model: 'Focus', year: 2019, rentalPrice: 90 },
    { registrationNumber: 'LMN456', make: 'Honda', model: 'Civic', year: 2021, rentalPrice: 110 },
    { registrationNumber: 'PQR321', make: 'Chevrolet', model: 'Malibu', year: 2018, rentalPrice: 85 },
    { registrationNumber: 'STU654', make: 'Nissan', model: 'Altima', year: 2022, rentalPrice: 120 }
  ]);
    await User.bulkCreate([
        {
            name: 'admin',
            password: 'admin123',
            role: 'admin',
        },
        {
            name: 'user1',
            password: 'user123',
            role: 'user',
        },
        {
            name: 'user2',
            password: 'user456',
            role: 'user',

        }
    ]);
  console.log('Seeders exécutés !');
}

module.exports = seed;
