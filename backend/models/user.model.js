const DataTypes = require("sequelize");
const {sequelize} = require("../config/db");
const jwt = require('jsonwebtoken'); 
require('dotenv').config()

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, 
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, { 
    tableName: 'users', 
    timestamps: false
});


User.prototype.generateTokens = function() {
    const accessToken = jwt.sign(
        { id: this.id, role: this.role }, 
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    );

    const refreshToken = jwt.sign(
        { id: this.id }, 
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    );

    return { accessToken, refreshToken };
};

module.exports = User;