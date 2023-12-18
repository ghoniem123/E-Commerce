const express     = require('express');
const router     = express.Router();
const CartController = require('../Controller/cartController'); 

router
.route('/')
.get(CartController.ViewMyCart)
.post(CartController.AddToCart)
.put(CartController.UpdateCartItemQuantity)


router
.route('/:id')
.delete(CartController.RemoveFromCart)

router
.route('/checkout')
.post(CartController.Checkout)

router
.route('/checkout/:id')
.get(CartController.getSingleOrder)

router
.route('/track/:id')
.get(CartController.trackOrder)

module.exports = router;