const Sequelize = require('sequelize');

const sequelize = new Sequelize('Employee_Details', 'root', 'Lucky@11', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports.connect = sequelize;