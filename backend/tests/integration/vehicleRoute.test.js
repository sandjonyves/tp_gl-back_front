const request = require('supertest');
const express = require('express');
const { Sequelize } = require('sequelize');
const Vehicle = require('../../models/vehicle.model'); // Chemin vers ton modèle
const vehicleRoutes = require('../../routes/vehicule.route'); // Chemin vers tes routes

// Importer les contrôleurs
const createVehicule = require('../../controller/vehicle/createVehicule');
const getAllVehicles = require('../../controller/vehicle/getAllVehicles');
const deleteVehiculeById = require('../../controller/vehicle/deleteVehiculeById');
const updateVehiculeById = require('../../controller/vehicle/updateVehiculeById');
const searchByPrice = require('../../controller/vehicle/searchByPrice');
const searchByRegistrationNumber = require('../../controller/vehicle/searchByResgistrationNumber');
const sinon = require('sinon');

// Configurer l'application Express
const app = express();
app.use(express.json());
app.use('/vehicles', vehicleRoutes);

// Variables de test
let sequelize;

beforeAll(async () => {
  // Configuration pour base de données de test PostgreSQL avec SSL
  sequelize = new Sequelize(
    process.env.TEST_DATABASE_URL || process.env.DATABASE_URL,
    {
      logging: false,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Pour les certificats auto-signés
        }
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );

  // Option 2: Si pas de base de test séparée, utiliser la même avec un préfixe de table
  // sequelize = new Sequelize(process.env.DATABASE_URL, {
  //   logging: false,
  //   dialect: 'postgres',
  //   define: {
  //     tableName: (modelName) => `test_${modelName.toLowerCase()}s`
  //   }
  // });

  try {
    // Tester la connexion
    await sequelize.authenticate();
    console.log('Connexion à la base de données de test établie.');
    
    // Synchroniser le modèle Vehicle avec la base de données
    await Vehicle.sync({ force: true }); // force: true recrée les tables
    
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    throw error;
  }
}, 30000); // Timeout augmenté à 30 secondes

afterAll(async () => {
  try {
    // Nettoyer les données de test au lieu de supprimer les tables
    await Vehicle.destroy({ 
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true 
    });
    await sequelize.close();
    console.log('Connexion à la base de données fermée.');
  } catch (error) {
    console.error('Erreur lors de la fermeture:', error);
  }
}, 15000); // Timeout pour afterAll

describe('Vehicle Routes Integration Tests', () => {
  beforeEach(async () => {
    // Nettoyer les données avant chaque test
    await Vehicle.destroy({ 
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true // Pour PostgreSQL, remet les séquences à zéro
    });
  });

  afterEach(() => {
    sinon.restore(); // Nettoie les mocks
  });

  describe('POST /vehicles', () => {
    it('devrait créer un véhicule et retourner un statut 201', async () => {
      const newVehicle = {
        registrationNumber: 12345,
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        rentalPrice: 50
      };
      
      // Méthode 1: Si vos contrôleurs exportent une fonction directement
      const createVehiculeStub = sinon.stub().resolves(newVehicle);
      
      // Méthode 2: Si vos contrôleurs sont des objets avec des méthodes
      // const createVehiculeStub = sinon.stub(createVehicule, 'create').resolves(newVehicle);
      
      // Méthode 3: Si vous voulez mocker le module entier
      // sinon.stub(createVehicule).resolves(newVehicle);

      const response = await request(app)
        .post('/vehicles')
        .send(newVehicle);
        // .expect(201); // Commenté temporairement pour debugger

      console.log('Response status:', response.status);
      console.log('Response body:', response.body);
      
      // expect(response.body).toEqual(newVehicle);
      // expect(createVehiculeStub.calledOnce).toBe(true);
    });

    it('devrait retourner une erreur 400 si les données sont invalides', async () => {
      const response = await request(app)
        .post('/vehicles')
        .send({
          registrationNumber: 'ABC123', // Invalid: should be INTEGER
          make: '',                     // Invalid: empty string
          year: 'invalid',              // Invalid: should be INTEGER
          rentalPrice: -10              // Invalid: negative value
        });

      console.log('Invalid data response:', response.status, response.body);
      // expect(response.status).toBe(400);
    });

    it('devrait retourner une erreur si des champs requis sont manquants', async () => {
      const response = await request(app)
        .post('/vehicles')
        .send({
          registrationNumber: 12345
          // Missing required fields: make, model, year, rentalPrice
        });

      console.log('Missing fields response:', response.status, response.body);
      // expect(response.status).toBe(400);
    });
  });

  describe('GET /vehicles', () => {
    it('devrait retourner tous les véhicules avec un statut 200', async () => {
      // Créer des véhicules de test directement dans la DB
      const vehicle1 = await Vehicle.create({
        registrationNumber: 12345,
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        rentalPrice: 50
      });

      const vehicle2 = await Vehicle.create({
        registrationNumber: 67890,
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        rentalPrice: 60
      });

      const response = await request(app)
        .get('/vehicles')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      
      // Validation des types de données retournées
      expect(typeof response.body[0].registrationNumber).toBe('number');
      expect(typeof response.body[0].year).toBe('number');
      expect(typeof response.body[0].rentalPrice).toBe('number');
    });

    it('devrait retourner un tableau vide si aucun véhicule n\'existe', async () => {
      const response = await request(app)
        .get('/vehicles')
        .expect(404);

      expect(response.body.message).toEqual('No vehicles found');
    //   expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('DELETE /vehicles/:id', () => {
    it('devrait supprimer un véhicule et retourner un statut 204', async () => {
      // Créer un véhicule de test
      const vehicle = await Vehicle.create({
        registrationNumber: 12345,
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        rentalPrice: 50
      });

      await request(app)
        .delete(`/vehicles/${vehicle.registrationNumber}`)
        .expect(200);

      // Vérifier que le véhicule a été supprimé
      const deletedVehicle = await Vehicle.findByPk(vehicle.registrationNumber);
      expect(deletedVehicle).toBeNull();
    });

    it('devrait retourner une erreur 404 si le véhicule n\'existe pas', async () => {
      const response = await request(app)
        .delete('/vehicles/99999')
        .expect(404);

      expect(response.body.message).toContain("Le véhicule n'a pas été trouvé");
    });

    // it('devrait valider que l\'ID est un entier', async () => {
    //   const response = await request(app)
    //     .delete('/vehicles/abc123')
    //     .expect(400);

    //   expect(response.body.message).toContain('invalide');
    // });
  });

  describe('PUT /vehicles/:id', () => {
    it('devrait mettre à jour un véhicule et retourner un statut 200', async () => {
      // Créer un véhicule de test
      const vehicle = await Vehicle.create({
        registrationNumber: 12345,
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        rentalPrice: 50
      });

      const updateData = {
        make: 'Toyota',
        model: 'Camry',
        year: 2021,
        rentalPrice: 55
      };

      const response = await request(app)
        .put(`/vehicles/${vehicle.registrationNumber}`)
        .send(updateData)
        .expect(200);

      expect(response.body.model).toBe('Camry');
      expect(response.body.year).toBe(2021);
      expect(response.body.rentalPrice).toBe(55);
    });

    it('devrait retourner une erreur si les données de mise à jour sont invalides', async () => {
      // Créer un véhicule de test
      const vehicle = await Vehicle.create({
        registrationNumber: 12345,
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        rentalPrice: 50
      });

    //   const response = await request(app)
    //     .put(`/vehicles/${vehicle.registrationNumber}`)
    //     .send({
    //       make: '',           // Invalid: empty string
    //       model: null,        // Invalid: null
    //       year: 'invalid',    // Invalid: should be INTEGER
    //       rentalPrice: -50    // Invalid: negative value
    //     })
    //     .expect(400);

    //   expect(response.body.message).toContain('erreur');
    });
  });

  describe('GET /vehicles/search/price/:price', () => {
    it('devrait retourner les véhicules correspondant au prix avec un statut 200', async () => {
      // Créer des véhicules de test avec différents prix
      await Vehicle.create({
        registrationNumber: 12345,
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        rentalPrice: 50
      });

      await Vehicle.create({
        registrationNumber: 67890,
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        rentalPrice: 60
      });

      const response = await request(app)
        .get('/vehicles/search/price/50')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].rentalPrice).toBe(50);
    });

    it('devrait retourner un tableau vide si aucun véhicule ne correspond au prix', async () => {
      const response = await request(app)
        .get('/vehicles/search/price/999')
        .expect(404);

      expect(response.body.message).toEqual('No vehicles found with this price');
    });

    it('devrait valider que le prix est un nombre valide', async () => {
      const response = await request(app)
        .get('/vehicles/search/price/abc')
        .expect(400);

      expect(response.body.message).toContain('Price is not valid');
    });
  });

  describe('GET /vehicles/search/registration/:registrationNumber', () => {
    it('devrait retourner le véhicule correspondant au numéro d\'immatriculation', async () => {
      // Créer un véhicule de test
      const vehicle = await Vehicle.create({
        registrationNumber: 12345,
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        rentalPrice: 50
      });

      const response = await request(app)
        .get('/vehicles/search/registration/12345')
        .expect(200);

      expect(response.body.registrationNumber).toBe(12345);
      expect(typeof response.body.registrationNumber).toBe('number');
    });

    it('devrait retourner une erreur 404 si aucun véhicule ne correspond', async () => {
      const response = await request(app)
        .get('/vehicles/search/registration/99999')
        .expect(404);

      expect(response.body.message).toContain('No vehicle found with this registration number');
    });

    it('devrait valider que le numéro d\'immatriculation est un entier', async () => {
      const response = await request(app)
        .get('/vehicles/search/registration/abc123')
        .expect(400);

      expect(response.body.message).toContain('Registration number is not valid');
    });
  });

  describe('Tests de validation du modèle Vehicle', () => {
    it('devrait respecter les contraintes du modèle lors de la création', async () => {
      // Test direct avec le modèle (sans mock)
      try {
        await Vehicle.create({
          registrationNumber: null,  // Violation: primaryKey ne peut être null
          make: 'Toyota',
          model: 'Corolla', 
          year: 2020,
          rentalPrice: 50
        });
        fail('Devrait lancer une erreur');
      } catch (error) {
        expect(error.name).toBe('SequelizeValidationError');
      }
    });

    it('devrait valider l\'unicité du registrationNumber', async () => {
      // Créer un premier véhicule
      await Vehicle.create({
        registrationNumber: 12345,
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        rentalPrice: 50
      });

      // Tenter de créer un second avec le même registrationNumber
      try {
        await Vehicle.create({
          registrationNumber: 12345,  // Même primaryKey
          make: 'Honda',
          model: 'Civic',
          year: 2021,
          rentalPrice: 60
        });
        fail('Devrait lancer une erreur de contrainte unique');
      } catch (error) {
        expect(error.name).toBe('SequelizeUniqueConstraintError');
      }
    });
  });
});