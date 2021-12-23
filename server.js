const mysql2 = require("mysq2");
const inquirer = require("inquirer");
const cTable = require("console.table");
require('dotenv')

//connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'employeeTracker_db'
  });
//inquirer 