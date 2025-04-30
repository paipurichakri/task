import React from 'react'
import { Routes,Route, } from 'react-router-dom'
import Home from './Innerpages/Home'
import ServiceForm from './admindashboard/Serviceform'
import Singlecard from './Innerpages/Singlecard'
import Items from './Innerpages/Items'
import Cart from './Innerpages/Cart'
const Routing = () => {
  return (
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/data/:dservice" element={<Singlecard />} />
          <Route path="/form" element={<ServiceForm />} />
        </Routes>
  )
}

export default Routing
