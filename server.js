const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
require('dotenv').config()

//creating connection
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: process.env.DB_PASSWORD,
    database: 'employeeTracker_db'
  });

  connection.connect((err) => {
    if (err) throw err;
    init();
});

//view list of departments, roles, employee roster
const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

//Add department
const addDepartment = () => {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "What is the name of the department?"
    })
    .then(function(response){
        connection.query('INSERT INTO department', function (err, data) {
            console.log("The department name has been added.");
          });
    });
}
//add role
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
        }])
        .then(function(response){
        connection.query('SELECT * FROM role', function (err, data) {
            console.log("The role has been added.");
        });
    });
}
//add employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "roleId",
            message: "Enter a number for their role ID"
        },
        {
            type: "input",
            name: "managerId",
            message: "Enter their mananger's ID or 'null' if there is no manager"
        }
    ]).then((answer) => {
        connection.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)', [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, res) => {
            if (err) throw err;
            viewEmployees();
            init();
        })
    })
}

//update employee
const updateEmployee= () => {
    inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "Enter the employee ID would you like to update"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the ID of their new role?"
}])
.then(function(response){
 connection.query('UPDATE employee SET role_id= ? WHERE id=?',[response.role_id, response.employee_id], function (err, data) {
       console.log(err,data)
    console.log("The empoyee's info has been updated.");
    });
});
}

//prompt at start of application
const init = () => {
    inquirer.prompt({
        type: "list",
        name: "select",
        message: "What would you like to do?",
        choices: [
            "View company departments",
            "View company roles",
            "View employee roster",
            "Add a department",
            "Add a role",
            "Add employee to roster",
            "Update an employee's info"
        ]
    }).then((answer) => {
        if (answer.select === "View company departments") {
            viewDepartments();
        } else if (answer.select === "View company roles") {
            viewRoles();
        } else if (answer.select === "View employee roster") {
            viewEmployees();
        } else if (answer.select === "Add a department") {
            addDepartment();
        } else if (answer.select === "Add a role") {
            addRole();
        } else if (answer.select === "Add employee to roster") {
            addEmployee();
        } else if (answer.select === "Update an employee's info") {
            updateEmployee();
        }
    })
}