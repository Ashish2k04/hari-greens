import React from 'react';
import { Phone, MapPin, Mail, Instagram, Facebook } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import './Footer.css';

const Footer = () => {
  const { siteData } = useSite();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand & Address Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
             <img src="/logo.png" alt="હરિ નમન ગ્રીન્સ" className="footer-logo-img" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
             <div className="logo-placeholder" style={{display: 'none'}}>હરિ નમન ગ્રીન્સ Logo</div>
          </div>
          <p className="footer-description">
            તાજા શાકભાજી અને શુદ્ધ ડેરી પ્રોડક્ટ્સ તમારા ઘર સુધી, સીધું ખેતરમાંથી!
          </p>
          <div className="footer-contact-item">
            <MapPin size={20} className="footer-icon" />
            <p>{siteData?.footerAddress || 'Sama-Savli Rd, Dumad, Gujarat, India'}</p>
          </div>
          <div className="footer-contact-item">
            <Phone size={20} className="footer-icon" />
            <p>{siteData?.footerPhone || '+91 95500 90590'}</p>
          </div>
          <div className="footer-contact-item">
            <Mail size={20} className="footer-icon" />
            <a href={`mailto:${siteData?.footerEmail}`} style={{color: '#d0d0d0', textDecoration: 'none'}}>{siteData?.footerEmail || 'harinaman.greens@gmail.com'}</a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col links-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#products">Our Products</a></li>
            <li><a href="/#contact">Contact Us</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>

        {/* Categories Column */}
        <div className="footer-col links-col">
          <h3>Categories</h3>
          <ul>
            <li><a href="/#products">શાકભાજી (Vegetables)</a></li>
            <li><a href="/#products">ડેરી (Dairy)</a></li>
          </ul>
        </div>
        
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} હરિ નમન ગ્રીન્સ. All rights reserved.</p>
        <a href="/admin-login" className="admin-link">Admin Login</a>
      </div>
    </footer>
  );
};

export default Footer;
