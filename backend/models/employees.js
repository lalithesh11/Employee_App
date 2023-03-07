const Connection = require('./../dbconfig');
const { DataTypes } = require('sequelize');

const dbConnection = Connection.connect;

const Employees = dbConnection.define('employees', {
    employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    technology: {
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.STRING
    }
},
    {
        freezeTableName: true,
        timestamps: false
    });

module.exports.createEmployee = function (name, email, technology, active) {

    return Employees.create({ name, email, technology, active }).then((data) => {
        // console.log(data.toJSON());
        return data.toJSON();
    });

}

module.exports.fetchEmployees = function () {

    return Employees.findAll().then((data) => {
        // console.log("All users:", JSON.stringify(data, null, 2));
        return JSON.stringify(data, null, 2);
    });

}

module.exports.fetchSingleEmployee = function (id) {

    return Employees.findOne({
        where: {
            employee_id : id
        }
    }).then((data) => {
        // console.log("All users:", JSON.stringify(data, null, 2));
        return JSON.stringify(data, null, 2);
    });

}

module.exports.updateEmployee = function (name, email, technology, active, id) {

    return Employees.update({ name, email, technology, active },{
        where: {
            employee_id : id
        }
    }).then((data) => {
        // console.log("All users:", JSON.stringify(data, null, 2));
        return JSON.stringify(data, null, 2);
    });

}

module.exports.deleteEmployee = function (id) {

    return Employees.destroy({
        where: {
            employee_id : id
        }
    }).then((data) => {
        // console.log("All users:", JSON.stringify(data, null, 2));
        return JSON.stringify(data, null, 2);
    });

}