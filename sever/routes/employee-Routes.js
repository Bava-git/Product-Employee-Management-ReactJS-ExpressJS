const express = require('express');
const router = express.Router();
const authenticate = require('../config/middleware/authenticate.js');
const { listEmployees, createEmployee, GetupdateEmployee, updateEmployee, deleteEmployee, CheckEmployeeEmail } = require('../controllers/employee-Controller'); // Import controller functions

// Define routes
router.get('/', authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR']), listEmployees);
router.post('/add', authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR']), createEmployee);
router.get('/:id', authenticate(['ADMIN', 'MANAGER']), GetupdateEmployee);
router.get('/check/:email', authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR']), CheckEmployeeEmail);
router.put('/:id', authenticate(['ADMIN', 'MANAGER']), updateEmployee);
router.delete('/:id', authenticate(['ADMIN', 'MANAGER']), deleteEmployee);

module.exports = router;
