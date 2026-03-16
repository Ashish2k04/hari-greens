import React from 'react';
import { useSite } from '../context/SiteContext';

const FloatingWhatsApp = () => {
  const { siteData } = useSite();
  // Strip non-numeric chars except + for the URL
  const phoneUrlStr = siteData.footerPhone.replace(/[^0-9+]/g, '');

  return (
    <a 
      href={`https://wa.me/${phoneUrlStr}?text=નમસ્તે,%20હું%20હરિ%20નમન%20ગ્રીન્સમાંથી%20ઓર્ડર%20આપવા%20માંગુ%20છું.`} 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="whatsapp-icon" />
    </a>
  );
};

export default FloatingWhatsApp;
