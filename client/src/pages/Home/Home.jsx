import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useSite } from '../../context/SiteContext';
import api from '../../api';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { siteData } = useSite();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <Hero />
      
      <section id="products" className="products-section">
        <div className="section-title-container">
          <h2 className="section-title">અમારી પ્રોડક્ટ્સ (Our Products)</h2>
          <div className="title-underline"></div>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="no-products">હાલમાં કોઈ પ્રોડક્ટ ઉપલબ્ધ નથી.</p>
            )}
          </div>
        )}
      </section>

      <section id="contact" className="contact-section" style={{ padding: '60px 20px', backgroundColor: '#e8f5e9', textAlign: 'center', marginTop: '40px' }}>
        <h2 style={{ color: '#2e7d32', marginBottom: '20px' }}>અમારો સંપર્ક કરો (Contact Us)</h2>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 20px', color: '#555' }}>
          તાજા શાકભાજી અને શુદ્ધ ડેરી પ્રોડક્ટ્સ માટે હમણાં જ અમારો સંપર્ક કરો.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', minWidth: '250px' }}>
            <h3 style={{ marginBottom: '10px', color: '#1b5e20' }}>ફોન નંબર</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{siteData?.footerPhone || '+91 95500 90590'}</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', minWidth: '250px' }}>
            <h3 style={{ marginBottom: '10px', color: '#1b5e20' }}>WhatsApp</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{siteData?.footerPhone || '+91 95500 90590'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
