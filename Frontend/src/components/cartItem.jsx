/* eslint-disable react/prop-types */
import close from '../assets/close.png';
import plus from '../assets/plus.png';
import minus from '../assets/minus.png';
import { useState, useEffect } from 'react';
const url = 'http://localhost:3001/api';
import axios from 'axios';
import '../styles/cartItems.css';

export default function CartItem(props){
 console.log(props.quantity)

   async function quantity_up(){
        await axios.put(`${url}/cart`,{id:props._id,quantity:(props.quantity+1)},{withCredentials:true}).then((response) => {
            window.location.reload();
          }).catch((error) => { console.log(error); })
    }

    async function quantity_down(){
        if (props.quantity === 1) {
            return alert("Quantity cannot be less than 1");
        }

        await axios.put(`${url}/cart`,{id:props._id,quantity:(props.quantity-1)},{withCredentials:true}).then((response) => {
            window.location.reload();
          }).catch((error) => { console.log(error); })
    }

   async function remove(){
        await axios.delete(`${url}/cart/${props._id}`,{withCredentials:true}).then((response) => {
            window.location.reload();
          }).catch((error) => { console.log(error); })
    }

    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function getProduct() {
            await axios.get(`${url}/products/${props.productId}`,{withCredentials:true}).then((response) => {
                setProduct(response.data);
            }).catch((error) => { console.log(error); })
        }
        getProduct();
    }, [props.productId]);

    if (!product) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='cartitem--div'>
          <img className="cartitem--image" src={product.image} alt={product.name} />
          <span className="cartitem--span--1">
          <h5 className="cartitem--name">{product.name}</h5>
          <p className="cartitem--size">{`Size : ${props.productSize}`}</p>
          <p className="cartitem--price">{`Price : $ ${product.price}`}</p>
          </span>

          <p className="cartitem--total--price"><span className="total--price--title">Total price : </span>{`$ ${props.total}`}</p>

          <span className="cartitem--span--3">
          <button className='cartitem--remove--button' onClick={ ()=>{remove()} }><img src={close} className='close--img'/></button>
            <span className='cartitem--quantity--span'>
            <button className='quantity--button' onClick={ ()=>{ quantity_up()} }><img src={plus} className='plus--img'/></button>
            <button className='quantity--display'>{props.quantity}</button>
            <button className='quantity--button' onClick={ ()=>{ quantity_down()} }><img src={minus} className='minus--img'/></button>
            </span>
          </span>
        </div>
    );
}