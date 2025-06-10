const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // nécessaire sur Render ou plateformes similaires
    },
  },
  logging: false, // désactive les logs SQL
});

module.exports = sequelize;
