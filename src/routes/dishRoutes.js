const express = require('express');
const router = express.Router();

const {
  createDish,
  detailDish,
  getDishes,
  updateDish,
  deleteDish,
} = require('../controllers/dish');

router.get('/dishes', getDishes);
router.get('/dish/:id', detailDish);
router.post('/dish', createDish);
router.patch('/dish/:id', updateDish);
router.delete('/dish/:id', deleteDish);

module.exports = router;
