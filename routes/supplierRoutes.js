const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// GET /suppliers
router.get('/', supplierController.index);

// GET /suppliers/new
router.get('/new', supplierController.new);

// POST /suppliers
router.post('/', supplierController.create);

// GET /suppliers/:id
router.get('/:id', supplierController.show);

// GET /suppliers/:id/edit
router.get('/:id/edit', supplierController.edit);

// PUT /suppliers/:id
router.put('/:id', supplierController.update);

// DELETE /suppliers/:id
router.delete('/:id', supplierController.destroy);

module.exports = router;