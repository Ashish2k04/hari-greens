const Admin = require('../models/Admin');

// @desc    Validate Admin Password
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { password } = req.body;
    let admin = await Admin.findOne({ username: 'admin' });

    // Seed default admin if it doesn't exist
    if (!admin) {
      admin = await Admin.create({ username: 'admin', password: 'harigreens123' });
    }

    if (admin.password === password) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'ખોટો પાસવર્ડ! (Incorrect Password!)' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Change Admin Password
// @route   PUT /api/admin/password
// @access  Public (in this simple version without tokens)
const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      let admin = await Admin.findOne({ username: 'admin' });
  
      if (!admin) {
        admin = await Admin.create({ username: 'admin', password: 'harigreens123' });
      }
  
      if (admin.password === oldPassword) {
        admin.password = newPassword;
        await admin.save();
        res.json({ success: true, message: 'પાસવર્ડ સફળતાપૂર્વક બદલવામાં આવ્યો! (Password changed successfully!)' });
      } else {
        res.status(401).json({ success: false, message: 'જૂનો પાસવર્ડ ખોટો છે! (Incorrect old password!)' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// @desc    Get Footer Details
// @route   GET /api/admin/footer
// @access  Public
const getFooterDetails = async (req, res) => {
  try {
    let admin = await Admin.findOne({ username: 'admin' });
    if (!admin) {
      admin = await Admin.create({ username: 'admin', password: 'harigreens123' });
    }
    res.json({
      success: true,
      data: {
        footerAddress: admin.footerAddress,
        footerPhone: admin.footerPhone,
        footerEmail: admin.footerEmail,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Footer Details
// @route   PUT /api/admin/footer
// @access  Public
const updateFooterDetails = async (req, res) => {
  try {
    const { footerAddress, footerPhone, footerEmail } = req.body;
    let admin = await Admin.findOne({ username: 'admin' });
    
    if (!admin) {
      admin = await Admin.create({ username: 'admin', password: 'harigreens123' });
    }

    admin.footerAddress = footerAddress || admin.footerAddress;
    admin.footerPhone = footerPhone || admin.footerPhone;
    admin.footerEmail = footerEmail || admin.footerEmail;
    
    await admin.save();
    
    res.json({ success: true, message: 'ફૂટર માહિતી સફળતાપૂર્વક અપડેટ થઈ! (Footer updated successfully!)' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  loginAdmin,
  changePassword,
  getFooterDetails,
  updateFooterDetails
};
