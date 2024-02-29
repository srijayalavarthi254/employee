// server.js

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let employeeData = {
    employees: [
        { id: 1, name: "John Doe", position: "Manager", salary: 60000 },
        { id: 2, name: "Jane Smith", position: "Developer", salary: 55000 },
        { id: 3, name: "Alice Johnson", position: "Designer", salary: 50000 },
        { id: 4, name: "Bob Williams", position: "Sales Associate", salary: 45000 },
        { id: 5, name: "Eva Brown", position: "HR Manager", salary: 65000 }
    ]
};

// GET method to retrieve employee data
app.get('/employees', (req, res) => {
    res.json(employeeData);
});

// POST method to add an employee
app.post('/employees', (req, res) => {
    const { id, name, position, salary } = req.body;
    employeeData.employees.push({ id, name, position, salary });
    res.json(employeeData);
});

// PUT method to update an employee
app.put('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, position, salary } = req.body;
    const employee = employeeData.employees.find(emp => emp.id === id);
    if (employee) {
        employee.name = name;
        employee.position = position;
        employee.salary = salary;
    }
    res.json(employeeData);
});

// DELETE method to delete an employee
app.delete('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    employeeData.employees = employeeData.employees.filter(emp => emp.id !== id);
    res.json(employeeData);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
