import { useEffect, useState } from "react";
import axios from 'axios';
const url = 'http://localhost:3001/api';
import '../style.css';
import { useParams } from 'react-router-dom';
import bag from '../assets/bag.png';
import Navbar from '../components/navbar';
import "../styles/viewproduct.css";

export default function ViewPage() {
    // const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null); // Added state for selected size
    const params = useParams();
    let lastClickedButton = null;
    const buttons = document.querySelectorAll('.size--button');

    async function addToCart() {
        if(!selectedSize) {
            alert('Please select a size to add to the cart');
            return;
        }
        await axios.post(`${url}/cart`, { productId: product._id, productSize: selectedSize }, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            console.log('Added to cart');
            console.log(selectedSize);
            console.log(response.status);
            // navigate('/cart');
            alert('Added to cart');

            buttons.forEach(button=>{
                button.style.backgroundColor = ''; 
                button.style.borderColor = ''; 
                button.style.color = ''; 
            
            })
            
        })
        .catch((error) => { console.log(error); });
    }

    useEffect(() => {
        async function getProduct() {
            await axios.get(`${url}/products/${params.id}`,{withCredentials:true}).then((response) => {
                setProduct(response.data);
            }).catch((error) => { console.log(error); })
        }
        getProduct();
    }, [params.id]);


        buttons.forEach(button => {
        button.addEventListener('click', () => {
        if (lastClickedButton !== null) {
            lastClickedButton.style.backgroundColor = ''; 
            lastClickedButton.style.borderColor = ''; 
            lastClickedButton.style.color = ''; 
        }
        lastClickedButton = button;
        button.style.backgroundColor = '#000'; 
        button.style.borderColor = '#fff'; 
        button.style.color = '#fff'; 
          });
      });

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    }

    if (!product) {
        return <h1>Loading...</h1>
    }

    return (
        <>
        <Navbar/>
        <div className='view--div'>
            <span className="view--img--span">
                <img src={product.image} alt={product.name} className='view--img' />
            </span>
            <span className="view--info--span">
                <h3 className="view--name">{product.name}</h3>
                <p className="view--descript">{product.description}</p>
                <p className="view--price">{`$ ${product.price}`}</p>
                <h6 className='view--h6'>SELECT SIZE</h6>
                <div className="view-button-div">
                    <button className='size--button' onClick={() => handleSizeClick('S')} disabled={product.sizes.find(size => size.size === 'S').quantity === 0}>S</button>
                    <button className='size--button' onClick={() => handleSizeClick('M')} disabled={product.sizes.find(size => size.size === 'M').quantity === 0}>M</button>
                    <button className='size--button' onClick={() => handleSizeClick('L')}disabled={product.sizes.find(size => size.size === 'L').quantity === 0}>L</button>
                    <button className='size--button' onClick={() => handleSizeClick('XL')}disabled={product.sizes.find(size => size.size === 'XL').quantity === 0}>XL</button>
                    <button className='size--button' onClick={() => handleSizeClick('XXL')}disabled={product.sizes.find(size => size.size === 'XXL').quantity === 0}>XXL</button>
                </div>
                <button className='view--button' onClick={
                    ()=>{
                        addToCart();
                    }
                } ><img src={bag} className="shopping--bag"/> &nbsp; ADD TO CART</button>
            </span>
        </div>
        </>
    )
}