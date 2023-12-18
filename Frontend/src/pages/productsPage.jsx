/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from '../components/productCard';
import { useState, useEffect } from 'react'; //useEffect is a hook that allows u to perform side effects in function components
//side effects are anything that affects something outside of the scope of the function
//useEffect uses dependencies to determine when to run the function again if any change happen to the dependencies
//useEffect is a function that takes in a function and an array of dependencies
//if the array of dependencies is empty, the function will only run once
//if the array of dependencies is not empty, the function will run when any of the dependencies change

//useState is a hook that allows u to use state in function components
import axios from 'axios';
// import {useCookies} from 'react-cookie'; //allows u to read the cookie and set it and delete
// import {useNavigate} from 'react-router-dom'; //re-directs the user to a different page
const url = 'http://localhost:3001/api/products';
import '../style.css';
import '../styles/productpage.css';
import Navbar from '../components/navbar';


//hook is a function that allows u to  access react features without having to write a class

export default function ProductsPage (){
    const [products, setProducts] = useState([]); //products is the state variable and setProducts is the function that allows u to change the state variable
    // const [cookies, removeCookies] = useCookies([]); //used to access the cookie that is in the request header only

    useEffect(()=>
    {  
      async function getProducts(){

        await axios.get(url ,{withCredentials:true}).then((response) => {
  
          setProducts([...response.data]); //set the state variable to the response data
          
        }).catch((error) => { console.log(error); })
  
      }

    getProducts();
    },[]); 

return (
  <>
  <Navbar/>
  <div className="product--page--div">
      {products.map(product => <ProductCard key={product._id} {...product}/> )} 
  </div>
  </>
)
}
