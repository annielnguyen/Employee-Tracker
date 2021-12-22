DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id)
REFERENCES department(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
FOREIGN KEY (role_id)
REFERENCES role(id),
FOREIGN KEY (manager_id)
REFERENCES employee(id)
);

INSERT into department(name)
VALUES ("Human Resources & Management"),
		("Sales & Marketing"),
        ("Accounting & Finance"),
        ("Legal");
        
INSERT into role(title, salary, department_id)
VALUES ("Manager", 100000, 1),
		("Loan Officer", 60000,2),
        ("Accountant", 70000,3),
        ("Lawyer",140000,4);

INSERT into employee(first_name, last_name, role_id, manager_id)
VALUES("John","Smith", 1, NULL),
      ("Mary","Jones", 2, 1),
      ("Justin","Bieber", 3, 2),
      ("Kim", "Kardashian",4,NULL);