import React from 'react';
import { Phone, Truck } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import './Hero.css';

const Hero = () => {
  const { siteData } = useSite();
  const phoneUrlStr = siteData?.footerPhone ? siteData.footerPhone.replace(/[^0-9+]/g, '') : '';

  return (
    <div className="hero-section">
      <div className="hero-content-wrapper">
        <div className="hero-left">
          <h1 className="hero-headline">તાજા શાકભાજી અને <br/> શુદ્ધ ડેરી પ્રોડક્ટ્સ</h1>
          <p className="hero-subtitle">તમારા ઘર સુધી, સીધું ખેતરમાંથી!</p>
          
          <div className="hero-badges">
            <div className="delivery-badge">
              <Truck size={20} className="badge-icon" />
              <span>FREE HOME DELIVERY</span>
            </div>
          </div>
          
          <div className="hero-actions">
            <a href={`tel:${phoneUrlStr}`} className="hero-call-btn">
              <Phone size={24} />
              {siteData?.footerPhone || '+91 95500 90590'}
            </a>
          </div>
        </div>
        
        <div className="hero-right">
          <div className="image-decoration-circle"></div>
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop" 
            alt="Fresh Vegetables and Groceries" 
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
