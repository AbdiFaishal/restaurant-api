const express = require('express');
const router = express.Router();

const { getAllOrders, addOrder } = require('../controllers/order');

router.get('/orders', getAllOrders);
router.post('/order', addOrder);

module.exports = router;
