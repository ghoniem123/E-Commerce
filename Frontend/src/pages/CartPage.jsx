import CartItem from '../components/cartItem';
import van from '../assets/van.png';
import { useState, useEffect } from 'react'; 
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const url = 'http://localhost:3001/api/cart';
import '../styles/cartPage.css';
import Navbar from '../components/navbar';



export default function ProductsPage (){
    const [cartItems, setCartITems] = useState([]);
    const [total, settotal] = useState(0);  
    const navigate = useNavigate();

    useEffect(()=>
    {   
      async function getCartItems(){

        await axios.get(url ,{withCredentials:true}).then((response) => {
         console.log(response.data);
          setCartITems([...response.data.cartItems]); 
          settotal(response.data.total);
        }).catch((error) => { console.log(error); })
  
      }

      getCartItems();
    },[]); 

    function info(){
      if(total === 0){
        alert("There are no products in the cart");
        return;
      }
      navigate("/info")
    }

return (
  <>
  <Navbar/>
  <div className="cart--page--div">
      {cartItems.map(cartItem => <CartItem key={cartItem._id} {...cartItem}/> )} 
      {total === 0 && <h1 className="cart--total">No products in the cart</h1>}
      <h1 className="cart--total">{`Total : $ ${total}`}</h1>
      <span className="checkout">
      <button className="cart--checkout--button" onClick={()=>{info()}}><img src={van} className="checkout--img"/>Checkout</button>
      </span>
  </div>
  </>
)
}
