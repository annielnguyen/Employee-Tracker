const mysql2 = require("mysq2");
const inquirer = require("inquirer");
const cTable = require("console.table");
require('dotenv')

//connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'UCLA123!',
    database: 'employeeTracker_db'
  });

  connection.connect((err) => {
    if (err) throw err;
    init();
});
//inquirer 
const viewDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const viewRoles = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const viewEmployees = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}