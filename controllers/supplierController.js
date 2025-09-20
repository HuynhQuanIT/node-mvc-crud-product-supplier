const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

class SupplierController {
  // GET /suppliers
  async index(req, res) {
    try {
      const suppliers = await Supplier.find().sort({ createdAt: -1 });
      res.render('suppliers/index', { 
        title: 'Suppliers List',
        suppliers 
      });
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error fetching suppliers',
        error 
      });
    }
  }

  // GET /suppliers/new
  new(req, res) {
    res.render('suppliers/new', { 
      title: 'Add New Supplier',
      supplier: {}
    });
  }

  // POST /suppliers
  async create(req, res) {
    try {
      const supplier = new Supplier(req.body);
      await supplier.save();
      res.redirect('/suppliers');
    } catch (error) {
      res.render('suppliers/new', { 
        title: 'Add New Supplier',
        supplier: req.body,
        error: error.message
      });
    }
  }

  // GET /suppliers/:id
  async show(req, res) {
    try {
      const supplier = await Supplier.findById(req.params.id);
      const products = await Product.find({ supplierId: req.params.id });
      
      if (!supplier) {
        return res.status(404).render('404', { title: 'Supplier Not Found' });
      }
      
      res.render('suppliers/show', { 
        title: 'Supplier Details',
        supplier,
        products
      });
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error fetching supplier details',
        error 
      });
    }
  }

  // GET /suppliers/:id/edit
  async edit(req, res) {
    try {
      const supplier = await Supplier.findById(req.params.id);
      if (!supplier) {
        return res.status(404).render('404', { title: 'Supplier Not Found' });
      }
      
      res.render('suppliers/edit', { 
        title: 'Edit Supplier',
        supplier
      });
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error fetching supplier for edit',
        error 
      });
    }
  }

  // PUT /suppliers/:id
  async update(req, res) {
    try {
      const supplier = await Supplier.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!supplier) {
        return res.status(404).render('404', { title: 'Supplier Not Found' });
      }
      
      res.redirect('/suppliers');
    } catch (error) {
      const supplier = await Supplier.findById(req.params.id);
      res.render('suppliers/edit', { 
        title: 'Edit Supplier',
        supplier: { ...supplier.toObject(), ...req.body },
        error: error.message
      });
    }
  }

  // DELETE /suppliers/:id
  async destroy(req, res) {
    try {
      // Check if supplier has products
      const productCount = await Product.countDocuments({ supplierId: req.params.id });
      
      if (productCount > 0) {
        const supplier = await Supplier.findById(req.params.id);
        const products = await Product.find({ supplierId: req.params.id });
        return res.render('suppliers/show', { 
          title: 'Supplier Details',
          supplier,
          products,
          error: 'Cannot delete supplier with existing products'
        });
      }
      
      await Supplier.findByIdAndDelete(req.params.id);
      res.redirect('/suppliers');
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error deleting supplier',
        error 
      });
    }
  }
}

module.exports = new SupplierController();