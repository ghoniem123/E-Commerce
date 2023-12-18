//make order
//get all orders of a user by userid from the cookie
// get specific order by id (View order and its status)
// cancel order
// update order status

const Order = require('../Models/Order');
const Cart = require('../Models/Cart');
require('dotenv').config();
const shippingCost = process.env.SHIPPING_COST;

//i assumped that this point i will force the user to login to make an order or register

const orderController = {

    makeOrder : async(req,res)=>{ //url /order post
        try{
            const cartId = req.User.Cart;
            const cart = await Cart.findById(cartId);

            const order = new Order({
                userId:null,
                // shippingAddress:req.body.shippingAddress,
                Country:req.body.Country,
                City:req.body.City,
                Street:req.body.AddressStreet1,
                HouseNumber:req.body.AddressStreet2,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                phone:req.body.phone,
                shippingCost:shippingCost,
                orderItems:cart.cartITems,
                status:'Pending',
            })
            await order.save();
            await Cart.findByIdAndDelete(cartId);
            order.total = await CalculateOrderTotal(order);
            await order.save();
            res.status(200).json({message:'Order has been made successfully'});
        }catch(e){
            res.status(500).json({message:e.message});
        }
    },



    
    getAllUserOrders: async(req,res)=>{ //url /order/all get
        try{
            const orders = await Order.find({userId:req.User._id});
            res.status(200).json(orders);
        }catch(e){
            res.status(500).json({message:e.message});
        }
    },

    getSingleOrder: async(req,res)=>{ //url /order/:id get
        try{
            console.log(orderId)

            const orderId = req.params.id;
            const order = await Order.findById(orderId);
            res.status(200).json(order);
        }catch(e){
            res.status(500).json({message:e.message});
        }
    },

    cancelOrder: async(req,res)=>{ //url /order/:id put
        try{
            const orderId = req.params.id;
            const order = await Order.findById(orderId);
            order.status = 'Cancelled';
            await order.save();
            res.status(200).json({message:'Order has been cancelled successfully'});
        }catch(e){
            res.status(500).json({message:e.message});
        }
    },
    updateOrder: async(req,res)=>{ //url /order/status/:id put
     try{
            const orderId = req.params.id;
            const order = await Order.findById(orderId);
            order.status = req.body.status;
            await order.save();
            res.status(200).json({message:'Order has been updated successfully'});
        }catch(e){
            res.status(500).json({message:e.message});
    }
},
  
};

module.exports = orderController;  

CalculateOrderTotal = (order) => {
    try{
         const Total = order.orderItems.reduce((acc,curr)=>acc+curr.total,0);
         return (Total+shippingCost).toFixed(2);
    }catch(e){
            throw new Error(e.message); 
    }
   }
