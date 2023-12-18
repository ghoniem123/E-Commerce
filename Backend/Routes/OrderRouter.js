const express = require('express'); 
const router = express.Router();
const OrderController = require('../Controller/orderController');

router
.route('/')
.post(OrderController.makeOrder)

router
.route('/all')
.get(OrderController.getAllUserOrders)

router
.route('/:id')
.get(OrderController.getSingleOrder)
.put(OrderController.cancelOrder)

router
.route('/status/:id')
.put(OrderController.updateOrder)

module.exports = router;