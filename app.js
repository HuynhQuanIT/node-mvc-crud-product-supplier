const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Database connection error:', err);
});

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Product & Supplier Management' });
});

app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).render('error', { 
    title: 'Server Error',
    message: 'Something went wrong!',
    error: err
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});