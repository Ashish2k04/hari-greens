const express = require('express');
const router = express.Router();
const { loginAdmin, changePassword, getFooterDetails, updateFooterDetails } = require('../controllers/adminController');

router.post('/login', loginAdmin);
router.put('/password', changePassword);
router.get('/footer', getFooterDetails);
router.put('/footer', updateFooterDetails);

module.exports = router;
