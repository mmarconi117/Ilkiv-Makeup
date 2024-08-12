const sql = require('mssql');

const config = {
    user: 'SA', // replace with your SQL username
    password: 'reallyStrongPwd123', // replace with your SQL password
    server: 'localhost', // replace with your server name
    database: 'IlkivMakeup', // replace with your database name
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true // Change to true if you're on local dev and don't have a valid certificate
    }
};

module.exports = config;
