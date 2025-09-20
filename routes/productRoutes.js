const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /products
router.get('/', productController.index);

// GET /products/new
router.get('/new', productController.new);

// POST /products
router.post('/', productController.create);

// GET /products/:id
router.get('/:id', productController.show);

// GET /products/:id/edit
router.get('/:id/edit', productController.edit);

// PUT /products/:id
router.put('/:id', productController.update);

// DELETE /products/:id
router.delete('/:id', productController.destroy);

module.exports = router;