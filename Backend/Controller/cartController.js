const Cart = require('../Models/Cart');
const CartItem = require('../Models/CartItem');
const Product = require('../Models/Product');
require('dotenv').config();
const Order = require('../Models/Order');
const shippingCost = process.env.SHIPPING_COST;

//to avoid the issue of checking the cookie each time, create a cookie
// when the page of product is loaded in the viewproduct endpoint

const cartController = {
   ViewMyCart: async(req,res)=>{
    try{ 
                const cartId = req.User.Cart; //decoded.User.Cart; from the authentication middleware
                const cart = await Cart.findById(cartId);
                const cartItems = cart.cartITems;
                const total = cart.total;
                res.status(200).json({cartItems,total});
            
     }catch(e){
        res.status(500).json({message:e.message});
    }
   },

    AddToCart: async(req,res)=>{  // url /cart post
     try{
      //handle if the cartitem already exists in the cart, just increment the quantity of the cartitem and update the total of the cart
                    const cartId = req.User.Cart; //decoded.User.Cart; from the authentication middleware
                    const cart = await Cart.findById(cartId);

                    const productId = req.body.productId;
                    const quantity = 1;
                    const productSize = req.body.productSize;

                    const product = await Product.findById(productId);
                     const productPrice = product.price;

                     const productQuantity = product.sizes.find(size=>size.size===productSize).quantity;

                     if(productQuantity<quantity)
                           return res.status(400).json(`The quantity you entered is not available, currently we have only ${productQuantity} items in stock`);


                     const existingCartItem = cart.cartITems.find(item => item.productId.toString() === productId.toString() && item.productSize === productSize);
                     
                           if (existingCartItem) {
                             existingCartItem.quantity += quantity;
                             existingCartItem.total = existingCartItem.quantity * productPrice;
                            //  existingCartItem = await existingCartItem.save();
                            const updates = {quantity:existingCartItem.quantity,total:existingCartItem.total};
                             await CartItem.findByIdAndUpdate(existingCartItem._id,updates);
                           } else {
                     
                    const cartItem = new CartItem({
                        productId,
                        quantity,
                        productSize,
                        total:quantity*productPrice,
                    })
                  //   console.log(cartItem);
                    const Item = await cartItem.save();

                  //   cart.cartITems.push(Item);
                  cart.cartITems = [...cart.cartITems,Item];

                  }

                    const newTotal = CalculateCartTotal(cart.cartITems); //calculate the total of the cart
                  //   console.log(newTotal);
                    cart.total = newTotal; //save the new total to the cart
                    const updatedCart = await cart.save(); //save the cart with the new item added to it and update the new total (Update the cart)
                    res.status(200).json( updatedCart)
         
     }catch(e){
        res.status(500).json({message:e.message});
     }
    },

    RemoveFromCart: async(req,res)=>{
     try{
                    const cartId = req.User.Cart; //decoded.User.Cart; from the authentication middleware
                    const cart = await Cart.findById(cartId);
                    const cartItemId = req.params.id;

                    const Item = await CartItem.findById(cartItemId);

                     console.log(Item);

                    console.log("BEFORE => ",cart.cartITems);
                    cart.cartITems=cart.cartITems.pull(Item);
                  //   cart.cartITems.filter(CartItem=>CartItem._id!==Item._id);

                    console.log("AFTER => ",cart.cartITems);
                    
                    const newTotal = CalculateCartTotal(cart.cartITems); //calculate the total of the cart
                    cart.total = newTotal; //save the new total to the cart
                    const updatedCart = await cart.save(); //save the cart with the new item added to it and update the new total (Update the cart)
                    CartItem.findByIdAndDelete(cartItemId);  //delete the cartitem from cartitems collection in the database
                    res.status(200).json(Item);
     
     }catch(e){
        res.status(500).json({message:e.message});
     }
    },

    UpdateCartItemQuantity: async(req,res)=>{
        try{
            const cartId = req.User.Cart; 
            const cart = await Cart.findById(cartId);
            const cartItemId = req.body.id;
            const quantity = req.body.quantity;
            const Item = await CartItem.findById(cartItemId);
            const product = await Product.findById(Item.productId);
            const productPrice = product.price;
            const productQuantity = product.sizes.find(size=>size.size===Item.productSize).quantity;
             console.log(quantity);
             console.log(productQuantity);

            if(productQuantity<quantity)
                return res.status(400).json(`The quantity you entered is not available, currently we have only ${productQuantity} items in stock`);

            // updates = {quantity:quantity,total:quantity*productPrice};

            Item.quantity = quantity;
            Item.total = quantity*productPrice;

            console.log(Item);

            

            // await CartItem.findByIdAndUpdate(cartItemId,upates);
            await Item.save();

            cart.cartITems.pull(Item);
            cart.cartITems = [...cart.cartITems,Item];

            const newTotal = CalculateCartTotal(cart.cartITems);
            cart.total = newTotal; 
            const updatedCart = await cart.save(); 
            res.status(200).json(Item);
        }catch(e){
            res.status(500).json({message:e.message});
        }
    },

    Checkout: async(req,res)=>{
      try{
        const cartId = req.User.Cart;
        const cart = await Cart.findById(cartId);

        const order = new Order({
            userId:null,
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
            total:0,
        })

       console.log(order)

        order.total = (CalculateCartTotal(cart.cartITems) + shippingCost).toFixed(2);

        await order.save();


          cart.cartITems.forEach(async(item)=>{

            const id = item.productId;
            const size = item.productSize;

            await Product.findByIdAndUpdate(id,  {$inc:{[`sizes.${size}.quantity`]:-item.quantity}}   );

            await CartItem.findByIdAndDelete(item._id);
        })


        cart.cartITems = [];
        cart.total = 0;
        await cart.save();

        res.status(200).json(order);
    }catch(e){
        res.status(500).json({message:e.message});
    }
},


getSingleOrder: async(req,res)=>{ //url /order/:id get
  try{
    console.log(req.params.id)
       const orderId = req.params.id;
      const order = await Order.findById(orderId);
      console.log(order);
      res.status(200).json(order);
  }catch(e){
      res.status(500).json({message:e.message});
  }
},

trackOrder : async(req,res)=>{
  try{
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    res.status(200).json(order);
  }catch(e){
    res.status(500).json({message:e.message});
  }
},

};
module.exports = cartController;   


CalculateCartTotal = cartITems => {
    try{
         const Total = cartITems.reduce((acc,curr)=>acc+curr.total,0);
         return Total.toFixed(2)
    }catch(e){
            throw new Error(e.message); 
    }
   }

