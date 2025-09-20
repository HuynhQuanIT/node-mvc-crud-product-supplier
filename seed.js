const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');
require('dotenv').config();

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Supplier.deleteMany({});
    await Product.deleteMany({});
    console.log('Existing data cleared');

    // Create suppliers
    console.log('Creating suppliers...');
    const suppliers = await Supplier.create([
      {
        name: 'ABC Electronics Co., Ltd',
        address: '123 Tech Street, Silicon Valley, CA 94000, USA',
        phone: '+1-555-0123'
      },
      {
        name: 'Global Components Manufacturing',
        address: '456 Industrial Avenue, Detroit, MI 48201, USA',
        phone: '+1-555-0456'
      },
      {
        name: 'Asian Imports & Trading',
        address: '789 Trade Boulevard, Los Angeles, CA 90028, USA',
        phone: '+1-555-0789'
      },
      {
        name: 'European Tech Solutions',
        address: '321 Innovation Drive, Austin, TX 73301, USA',
        phone: '+1-555-0321'
      },
      {
        name: 'Midwest Manufacturing Corp',
        address: '654 Factory Road, Chicago, IL 60601, USA',
        phone: '+1-555-0654'
      }
    ]);
    console.log(`Created ${suppliers.length} suppliers`);

    // Create products
    console.log('Creating products...');
    const products = await Product.create([
      // Products from ABC Electronics
      {
        name: 'Premium Laptop Computer',
        price: 1299.99,
        quantity: 25,
        supplierId: suppliers[0]._id
      },
      {
        name: 'Wireless Gaming Mouse',
        price: 79.99,
        quantity: 150,
        supplierId: suppliers[0]._id
      },
      {
        name: 'Mechanical Keyboard',
        price: 149.99,
        quantity: 75,
        supplierId: suppliers[0]._id
      },
      {
        name: '4K Monitor 27 inch',
        price: 399.99,
        quantity: 40,
        supplierId: suppliers[0]._id
      },

      // Products from Global Components Manufacturing
      {
        name: 'Steel Framework Components',
        price: 250.00,
        quantity: 100,
        supplierId: suppliers[1]._id
      },
      {
        name: 'Industrial Bolts Set',
        price: 45.50,
        quantity: 500,
        supplierId: suppliers[1]._id
      },
      {
        name: 'Metal Brackets',
        price: 15.75,
        quantity: 200,
        supplierId: suppliers[1]._id
      },

      // Products from Asian Imports & Trading
      {
        name: 'Electronic Circuit Boards',
        price: 125.50,
        quantity: 80,
        supplierId: suppliers[2]._id
      },
      {
        name: 'LED Light Strips',
        price: 29.99,
        quantity: 300,
        supplierId: suppliers[2]._id
      },
      {
        name: 'Smartphone Cases',
        price: 19.99,
        quantity: 250,
        supplierId: suppliers[2]._id
      },
      {
        name: 'USB Cables Bulk Pack',
        price: 35.00,
        quantity: 400,
        supplierId: suppliers[2]._id
      },

      // Products from European Tech Solutions
      {
        name: 'Smart Home Hub',
        price: 199.99,
        quantity: 60,
        supplierId: suppliers[3]._id
      },
      {
        name: 'Bluetooth Speakers',
        price: 89.99,
        quantity: 120,
        supplierId: suppliers[3]._id
      },
      {
        name: 'Wireless Charging Pad',
        price: 49.99,
        quantity: 180,
        supplierId: suppliers[3]._id
      },

      // Products from Midwest Manufacturing Corp
      {
        name: 'Office Chair Ergonomic',
        price: 299.99,
        quantity: 35,
        supplierId: suppliers[4]._id
      },
      {
        name: 'Standing Desk Frame',
        price: 449.99,
        quantity: 20,
        supplierId: suppliers[4]._id
      },
      {
        name: 'Filing Cabinet Metal',
        price: 179.99,
        quantity: 45,
        supplierId: suppliers[4]._id
      }
    ]);
    console.log(`Created ${products.length} products`);

    console.log('\n=== Seed Data Summary ===');
    console.log(`Total Suppliers: ${suppliers.length}`);
    console.log(`Total Products: ${products.length}`);
    
    console.log('\n=== Suppliers Created ===');
    suppliers.forEach((supplier, index) => {
      console.log(`${index + 1}. ${supplier.name} - ${supplier.phone}`);
    });

    console.log('\n=== Products Created ===');
    for (const product of products) {
      const supplier = await Supplier.findById(product.supplierId);
      console.log(`- ${product.name} ($${product.price}) - Qty: ${product.quantity} - Supplier: ${supplier.name}`);
    }

    console.log('\n✅ Seed data created successfully!');
    console.log('You can now start the application with: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Process interrupted');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n🛑 Process terminated');
  await mongoose.connection.close();
  process.exit(0);
});

// Run the seed function
if (require.main === module) {
  console.log('🌱 Starting database seeding...');
  seedData();
}

module.exports = seedData;