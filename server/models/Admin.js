const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      default: 'admin',
    },
    password: {
      type: String,
      required: true,
      default: 'harigreens123',
    },
    footerAddress: {
      type: String,
      default: 'Sama-Savli Rd, Dumad, Gujarat, India',
    },
    footerPhone: {
      type: String,
      default: '+91 95500 90590',
    },
    footerEmail: {
      type: String,
      default: 'harinaman.greens@gmail.com',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Admin', adminSchema);
