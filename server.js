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
        const query = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)';
        connection.query(query, [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, res) => {
            if (err) throw err;
            listEmployees();
            init();
        })
    })
}

const updateEmployee= () => {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "Enter the employee ID would you like to update"
        },
        {
            type: "input",
            name: "roleId",
            message: "What is the ID of their new role?"
}
const init = () => {
    inquirer.prompt({
        type: "list",
        name: "select",
        message: "Select from the choices below",
        choices: [
            "View company departments",
            "View company roles",
            "View employee roster",
            "Add a department",
            "Add a role",
            "Add employee to roster",
            "UpdateEmployee"
        ]
    }).then((answer) => {
        if (answer.select === "View company departments") {
            listDepartments();
        } else if (answer.select === "View company roles") {
            listRoles();
        } else if (answer.select === "View employee roster") {
            listEmployees();
        } else if (answer.select === "Add a department") {
            addDepartment();
        } else if (answer.select === "Add a role") {
            addRole();
        } else if (answer.select === "Add employee to roster") {
            addEmployee();
        } else if (answer.select === "Update an employee") {
        }
    })
}