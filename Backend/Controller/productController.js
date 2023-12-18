const Product = require('../Models/Product');
const jwt = require('jsonwebtoken');
const Cart = require('../Models/Cart');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const productController = {

    

    //add function to filter products by size
    // add function to search by name by using filter HOF
    
    viewProducts: async(req,res)=>{ // url /products
        try{
            const products = await Product.find();


            if(!req.cookies.token || req.cookies.token==='undefined'){ //if the user is not logged in

                const cart = new Cart({
                    cartItems:[],
                    total:0,
                })
                const SavedCart = await cart.save(); 
                const cartId = SavedCart._id; 

            const token = jwt.sign( 
                  { User:{Cart:cartId,
                  userType:'guest' }
                  }, 
                   secretKey
                )   
                                
         return res.cookie( //the cookie contains the token and the cartId for the guest
                    "token", token,
                    {
                        withCredentials: true,
                        httpOnly:false,
                        SameSite : 'none',
                    }, //dont use secure:true in development when using localhost as it is only sent
                    //over https but the localhost is http so chrome wont send the cookie with the request at all :( 
                    //secure:true, //use this in production when using https     
                    
                ).status(200).json(products);

                }  
                //if the user is logged in
                return res.status(200).json(products);     

        }catch(e){
            res.status(500).json({message:e.message});
        }
    },

    viewSingleProduct: async(req,res)=>{ // view a single product with url /products/:id
        try{
            const productId = req.params.id;
            const product = await Product.findById(productId);
            res.status(200).json(product);
        }catch(e){
            res.status(500).json({message:e.message});
        }
    },

    filterProducts: async(req,res)=>{ 
        try{
            const size = req.body.size;
            const products = await Product.find();

            const filteredProducts = products
            .filter(product => product.sizes.some(productSize => size.includes(productSize.size)));
            
            res.status(200).json(filteredProducts);
        }catch(e){
            res.status(500).json({message:e.message});
        }
    }



}
module.exports = productController;