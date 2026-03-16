import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSite } from '../../context/SiteContext';
import './Navbar.css';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { siteData } = useSite();
  const phoneUrlStr = siteData?.footerPhone ? siteData.footerPhone.replace(/[^0-9+]/g, '') : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="હરિ નમન ગ્રીન્સ" className="logo-img" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
          <div className="logo-placeholder" style={{display: 'none'}}>હરિ નમન ગ્રીન્સ Logo</div>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">Home</a>
          </li>
          <li className="nav-item">
            <a href="/#products" className="nav-links">Products</a>
          </li>
          <li className="nav-item">
            <a href="/#contact" className="nav-links">Contact</a>
          </li>
        </ul>
        <div className="nav-actions">
          <a href={`tel:${phoneUrlStr}`} className="call-btn">
            <Phone size={18} />
            <span>{siteData?.footerPhone || '+91 95500 90590'}</span>
          </a>
          <Link to="/cart" className="cart-icon-container">
            <ShoppingCart size={24} color="#ffffff" />
            {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
