const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

class ProductController {
  // GET /products
  async index(req, res) {
    try {
      const products = await Product.find()
        .populate('supplierId', 'name')
        .sort({ createdAt: -1 });
      
      res.render('products/index', { 
        title: 'Products List',
        products 
      });
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error fetching products',
        error 
      });
    }
  }

  // GET /products/new
  async new(req, res) {
    try {
      const suppliers = await Supplier.find().sort({ name: 1 });
      res.render('products/new', { 
        title: 'Add New Product',
        product: {},
        suppliers
      });
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error loading form',
        error 
      });
    }
  }

  // POST /products
  async create(req, res) {
    try {
      const product = new Product(req.body);
      await product.save();
      res.redirect('/products');
    } catch (error) {
      const suppliers = await Supplier.find().sort({ name: 1 });
      res.render('products/new', { 
        title: 'Add New Product',
        product: req.body,
        suppliers,
        error: error.message
      });
    }
  }

  // GET /products/:id
  async show(req, res) {
    try {
      const product = await Product.findById(req.params.id).populate('supplierId');
      
      if (!product) {
        return res.status(404).render('404', { title: 'Product Not Found' });
      }
      
      res.render('products/show', { 
        title: 'Product Details',
        product
      });
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error fetching product details',
        error 
      });
    }
  }

  // GET /products/:id/edit
  async edit(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      const suppliers = await Supplier.find().sort({ name: 1 });
      
      if (!product) {
        return res.status(404).render('404', { title: 'Product Not Found' });
      }
      
      res.render('products/edit', { 
        title: 'Edit Product',
        product,
        suppliers
      });
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error fetching product for edit',
        error 
      });
    }
  }

  // PUT /products/:id
  async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!product) {
        return res.status(404).render('404', { title: 'Product Not Found' });
      }
      
      res.redirect('/products');
    } catch (error) {
      const suppliers = await Supplier.find().sort({ name: 1 });
      const product = await Product.findById(req.params.id);
      res.render('products/edit', { 
        title: 'Edit Product',
        product: { ...product.toObject(), ...req.body },
        suppliers,
        error: error.message
      });
    }
  }

  // DELETE /products/:id
  async destroy(req, res) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.redirect('/products');
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error deleting product',
        error 
      });
    }
  }
}

module.exports = new ProductController();