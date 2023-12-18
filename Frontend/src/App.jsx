// import { useState } from 'react'
import ProductsPage from './pages/productsPage'
import ViewPage from './pages/ViewPage'
import CartPage from './pages/cartPage'
import MakePayment from './pages/paymentPage'
import InformationPage from './pages/InformationPage'
import OrderPage from './pages/OrderPage'
import TrackPage from './pages/trackPage'
import SearchPage from './pages/searchPage'
import './style.css'
import { Route , Routes } from "react-router-dom";


function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/:id" element={<ViewPage />} />
          <Route path="/mycart" element ={<CartPage/>}/>
          <Route path="/info" element ={<InformationPage/>}/>
          <Route path="/pay" element ={<MakePayment/>}/>
          <Route path="/order/:id" element ={<OrderPage/>}/>
          <Route path="/track" element ={<TrackPage/>}/>
          <Route path="/search" element ={<SearchPage/>}/>
          </Routes>
    </>
  )
}

export default App
