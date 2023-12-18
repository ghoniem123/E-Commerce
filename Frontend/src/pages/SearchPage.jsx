import ProductCard from "../components/productCard";
import "../styles/searchpage.css"
import axios from "axios";
import { useState } from "react";
import "../styles/productpage.css"
import Navbar from "../components/navbar";
const url ="http://localhost:3001/api/products";

export default function SearchPage() {
    const [products, setProducts] = useState([]); 
    const [selectedSizes, setSelectedSizes] = useState([]);
    const buttons = document.querySelectorAll('.size--button');

    async function filter(){
         await axios.post(`${url}filter`, { size:selectedSizes }, { withCredentials: true })
         .then((response) => {
                setProducts(response.data);
         })
         .catch((error) => { console.log(error); })
    }

    const clearFilter = () =>{
        setSelectedSizes([]);
        buttons.forEach(button=>{
            button.style.backgroundColor = ''; 
            button.style.borderColor = ''; 
            button.style.color = ''; 
        
        })
    }

    const handleSizeFilter = (size) => {
        setSelectedSizes([...selectedSizes,size]);
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
        button.style.backgroundColor = '#000'; 
        button.style.borderColor = '#fff'; 
        button.style.color = '#fff'; 
          });
      });

    return (
        <>
            <Navbar/>
            <div className="size-filter">
                <button className='size--button' onClick={() => handleSizeFilter('S')}>S</button>
                <button className='size--button' onClick={() => handleSizeFilter('M')}>M</button>
                <button className='size--button' onClick={() => handleSizeFilter('L')}>L</button>
                <button className='size--button' onClick={() => handleSizeFilter('XL')}>XL</button>
                <button className='size--button' onClick={() => handleSizeFilter('XXL')}>XXL</button>
                <button className='filer--button' onClick={() => filter() }>Filter</button>
                <buttion className='filer--button' onClick={() => clearFilter() }>Clear</buttion>
            </div>
            {products && (
                <div className="product--page--div">
                    {products.map(product => <ProductCard key={product._id} {...product}/> )} 
                </div>
            )}
        </>
    )
}