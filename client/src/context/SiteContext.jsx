import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const SiteContext = createContext();

export const useSite = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState({
    footerAddress: 'Sama-Savli Rd, Dumad, Gujarat, India',
    footerPhone: '+91 95500 90590',
    footerEmail: 'harinaman.greens@gmail.com'
  });

  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        const { data } = await api.get('/admin/footer');
        if (data.success && data.data) {
          setSiteData(data.data);
        }
      } catch (error) {
        console.error('Error fetching site details:', error);
      }
    };
    fetchSiteDetails();
  }, []);

  return (
    <SiteContext.Provider value={{ siteData }}>
      {children}
    </SiteContext.Provider>
  );
};
