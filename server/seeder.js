const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');

dotenv.config();
connectDB();

const seedProducts = [
  {
    name: 'ડુંગળી',
    price: 20,
    unit: 'કિલો',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop', // Temporary placeholder image
    category: 'શાકભાજી',
  },
  {
    name: 'ટામેટા',
    price: 30,
    unit: 'કિલો',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop', // Temporary placeholder image
    category: 'શાકભાજી',
  },
];

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing
    await Product.insertMany(seedProducts);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
