import React from 'react';
import footerstyles from '../Footer/footer.module.css'; // Optional external CSS
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={`footer ${footerstyles.footer} mt-2`}>
      <div className="footer-icons" style={{fontSize:"20px"}}>
        <i className="fas fa-map-marker-alt me-3" ></i>
        <i className="fas fa-phone-alt me-3"></i>
        <i className="fas fa-envelope me-3"></i>
      </div>

      <nav className={`${footerstyles.footernav} mt-2`}  >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/card">Card</NavLink>
        <NavLink to="/order">Order</NavLink>
        <NavLink to="/history">History</NavLink>
      </nav>

      <div className="social-icons mt-2" style={{fontSize:"20px"}}>
        <i className="fab fa-facebook-f me-3"></i>
        <i className="fab fa-twitter me-3"></i>
        <i className="fab fa-linkedin-in me-3"></i>
      </div>

      <p className="footer-text mt-2">
  © 2025 Eatoes — All Rights Reserved <br />
  Designed & Developed by Chakri
</p>

    </footer>
  );
};

export default Footer;
