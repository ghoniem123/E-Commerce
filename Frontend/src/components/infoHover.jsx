/* eslint-disable react/prop-types */
import ReactDOM from 'react-dom';
import "../styles/success.css";
import close from "../assets/close.png";
import warn from "../assets/warn.png";



export default function Success(props){
        if (!props.open) return null;
    
    return ReactDOM.createPortal( 
     <>   
    <div className="success--div--overlay"/> 
        <div className="success--div"> 
         <button className="close--button" onClick={props.close} > <img src={close} className="close--img"/> </button>

           <span className="success-span">
           <img src={warn} className="success--img"/>
            <h1 className="success--h1">Order Number : {props.ordernum} </h1>
            <p className="success--p">Store the order number to be allow to track your order!!</p>
            </span>  
    </div>
    </>   ,document.getElementById('pop-ups')
    )
    }

    // use zIndex in styling the pop-up