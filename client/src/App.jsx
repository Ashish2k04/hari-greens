import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPanel from './pages/Admin/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { SiteProvider } from './context/SiteContext';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import './App.css';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <SiteProvider>
      <CartProvider>
        <Router>
          <div className="app">
            {/* Conditionally render Navbar so it doesn't appear on admin routes for a cleaner look */}
            <Routes>
              <Route path="/admin" element={null} />
              <Route path="/admin-login" element={null} />
              <Route path="*" element={<Navbar />} />
            </Routes>
            
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Home />} /> {/* For now, products route acts as Home */}
                <Route path="/cart" element={<Cart />} />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin-login" 
                  element={<AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />} 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            
            {/* Conditionally render Footer for client-facing app */}
            <Routes>
              <Route path="/admin" element={null} />
              <Route path="/admin-login" element={null} />
              <Route path="*" element={<Footer />} />
            </Routes>

            {/* WhatsApp Floating Button */}
            <FloatingWhatsApp />
          </div>
        </Router>
      </CartProvider>
    </SiteProvider>
  );
}

export default App;
