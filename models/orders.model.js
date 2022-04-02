const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Orders = sequelize.define('orders', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    issuedAt: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active' // guest | admin
    }
})

module.exports = { Orders };