const express = require('express');
const router = express.Router();    
const productController = require('../Controller/productController');

router.get('/',productController.viewProducts);
router.get('/:id',productController.viewSingleProduct);

router.get('/filter',productController.filterProducts);

module.exports = router;