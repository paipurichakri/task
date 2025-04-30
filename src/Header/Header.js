import React from 'react'
import { NavLink } from 'react-router-dom'
import img from "../assets/logo.png"
import headerStyles from "../Header/headerstyles.module.css";
const Header = () => {
  return (
    <>
      <div className={headerStyles.header}>
        <nav className="navbar navbar-expand-lg">
            <div className="container">
               <NavLink className="navbar-brand" to="/">
               <img src={img} alt='logo'/>
               </NavLink>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02">
                <span className="navbar-toggler-icon"></span>
              </button>

    <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
       <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
               <NavLink className="nav-link" to="/">
                Home
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink className="nav-link" to="/items">
                Items
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink className="nav-link" to="/cart">
                Cart
               </NavLink>
            </li>
        </ul>
      </div>
     </div>
   </nav>
  </div>
 </>
  )
}

export default Header