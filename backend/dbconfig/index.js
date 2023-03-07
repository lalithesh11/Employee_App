const Sequelize = require('sequelize');

const sequelize = new Sequelize('Employee_Details', 'root', 'password', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports.connect = sequelize;