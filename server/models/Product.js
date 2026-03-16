const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name in Gujarati'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    unit: {
      type: String,
      required: [true, 'Please add a unit (e.g., કિલો, લીટર, કે ગ્રામ)'],
      enum: ['કિલો', 'લીટર', 'kg', 'liter', 'પેકેટ', 'ગ્રામ', 'gram'],
      default: 'કિલો',
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
    category: {
      type: String,
      required: [true, 'Please specify category'],
      enum: ['Vegetable', 'Dairy', 'શાકભાજી', 'ડેરી'],
      default: 'શાકભાજી',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
