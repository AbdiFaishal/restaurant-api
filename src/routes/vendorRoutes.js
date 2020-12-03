const express = require('express');
const router = express.Router();

const { getVendorDishes, filterByTags } = require('../controllers/vendor');

router.get('/vendor', getVendorDishes);
router.get('/vendors', filterByTags);

module.exports = router;
