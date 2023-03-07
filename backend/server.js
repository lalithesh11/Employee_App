'use strict';

const Hapi = require('@hapi/hapi');
const path = require('path');
const Connection = require('./dbconfig');
const Employees = require('./models/employees');

const init = async () => {
const dbConnection = await Connection.connect;
dbConnection.sync();
    const server = Hapi.Server({
        host: 'localhost',
        port: 1234,
        routes: { cors: true } 
    });

    server.route([{
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response("Server is UP");
        }
    },
    {
        method: 'GET',
        path: '/employee',
        handler: async (request, h) => {
            let employees=await Employees.fetchEmployees();
            return h.response(JSON.parse(employees)); 
        }
    },
    {
        method: 'GET',
        path: '/employee/{empid}',
        handler: async (request, h) => {
            let employee=await Employees.fetchSingleEmployee(request.params.empid);
            return h.response(JSON.parse(employee)); 
        }
    },
    {
        method: 'POST',
        path: '/employee',
        handler: async(request, h) => {
            let {name, email, technology,active}=request.payload;
            let employeeCreated=await Employees.createEmployee(name, email, technology,active);
            return h.response(employeeCreated);
        }
    },
    {
        method: 'PUT',
        path: '/employee/{empid}',
        handler: async (request, h) => {
            let {name, email, technology,active}=request.payload;
            let employeeUpdated=await Employees.updateEmployee(name, email, technology,active,request.params.empid);
            return h.response(JSON.parse(employeeUpdated)); 
        }
    },
    {
        method: 'DELETE',
        path: '/employee/{empid}',
        handler: async (request, h) => {
            let employeeDeleted=await Employees.deleteEmployee(request.params.empid);
            return h.response(JSON.parse(employeeDeleted)); 
        }
    },
    {
        method: 'GET',
        path: '/{any*}',
        handler: (request, h) => {
            return "<h1>Oh no! You must be lost!</h1>"
        }
    }]);

    await server.start();
    console.log(`Server started on: ${server.info.uri}`);

}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();