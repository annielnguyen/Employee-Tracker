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
//view list of departments, roles, employees
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

const addDepartment = () => {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "What is the name of the department?"
    }).then((answer) => {
        const query = 'INSERT INTO department(name) VALUE (?)';
        connection.query(query, answer.department, (err, res) => {
            if (err) throw err;
            listDepartments();
            init();
        });
    })
}
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
        },
        {
            type: "input",
            name: "departmentId",
            message: "What is the department ID number?"
        }
    ]).then((answer) => {
        const query = 'INSERT INTO role(title, salary, department_id) VALUE (?, ?, ?)';
        connection.query(query, [answer.title, answer.salary, answer.departmentId], (err, res) => {
            if (err) throw err;
            listRoles();
            init();
        })
    })
}