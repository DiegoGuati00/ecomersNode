const { Sequelize } = require('sequelize');
const { config } = require('../config/config')

const sequelize = new Sequelize({
    host: config.DBhost, // localhost
    username: config.DBusername, // postgres
    password: config.DBpassword,
    port: 5432,
    database: config.DBdatabase, // example
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = { sequelize };