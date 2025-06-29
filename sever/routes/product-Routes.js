const express = require('express');
const router = express.Router();
const authenticate = require('../config/middleware/authenticate.js');
const { listProduct, createProduct, GetupdateProduct, updateProduct, deleteProduct } = require('../controllers/product-Controller'); // Import controller functions


// Define routes
router.get('/', authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR', 'WORKER']), listProduct);
router.post('/add', authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR', 'WORKER']), createProduct);
router.get('/:id', authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR']), GetupdateProduct);
router.put('/:id', authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR']), updateProduct);
router.delete('/:id', authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR']), deleteProduct);

module.exports = router;
