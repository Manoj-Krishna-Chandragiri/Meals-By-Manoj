const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const {
  addFood, listFood, removeFood, editFood,
  getCategories, addCategory, removeCategory
} = require('../controllers/foodController');

router.get('/list',              listFood);
router.post('/add',              upload.single('image'), addFood);
router.post('/remove',           removeFood);
router.post('/edit',             upload.single('image'), editFood);
router.get('/categories',        getCategories);
router.post('/addCategory',      addCategory);
router.post('/removeCategory',   removeCategory);

module.exports = router;
