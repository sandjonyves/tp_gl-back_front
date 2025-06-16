// models/vehicle.model.js
const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");

const Vehicle = sequelize.define("Vehicle", {
  registrationNumber: {
    type: DataTypes.INTEGER,  // pas "integer" en minuscule
    primaryKey: true,
    allowNull: false,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rentalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'vehicule', // correspond à la table dans ta migration
  timestamps: false
});

module.exports = Vehicle;
