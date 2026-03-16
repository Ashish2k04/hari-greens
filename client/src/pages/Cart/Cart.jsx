import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSite } from '../../context/SiteContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { siteData } = useSite();
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container">
        <h2>તમારું કાર્ટ ખાલી છે (Your Cart is Empty)</h2>
        <p>કૃપા કરીને અમારી પ્રોડક્ટ્સ જુઓ અને ખરીદી કરો.</p>
        <Link to="/" className="continue-shopping">
          <ArrowLeft size={18} />
          ખરીદી ચાલુ રાખો
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!address.trim()) {
      alert('કૃપા કરીને તમારું પૂરું સરનામું દાખલ કરો (Please enter your full address).');
      return;
    }

    // Generate WhatsApp Message
    let message = "નમસ્તે, હું આ પ્રોડક્ટ્સ નો ઓર્ડર આપવા માંગુ છું:\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.quantity} ${item.unit} x ₹${item.price} = ₹${item.quantity * item.price}\n`;
    });
    message += `\n\n*કુલ રકમ (Total Amount): ₹${getCartTotal()}*`;
    message += `\n\n*ડિલિવરી સરનામું (Address):*\n${address}`;
    
    const encodedMessage = encodeURIComponent(message);
    const phoneUrlStr = siteData?.footerPhone ? siteData.footerPhone.replace(/[^0-9+]/g, '') : '919550090590';
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneUrlStr}?text=${encodedMessage}`, '_blank');
    
    // Optional: Clear cart after order is placed
    // clearCart();
    // navigate('/');
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>તમારું કાર્ટ (Your Cart)</h1>
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> પાછા જાવ
        </Link>
      </div>

      <div className="cart-layout">
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-img" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">₹{item.price} / {item.unit}</p>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="cart-item-action">
                <div className="item-total">₹{item.price * item.quantity}</div>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item._id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>ઓર્ડરની વિગત (Order Summary)</h2>
          <div className="summary-row">
            <span>કુલ રકમ (Subtotal):</span>
            <span>₹{getCartTotal()}</span>
          </div>
          <div className="summary-row">
            <span>ડિલિવરી (Delivery):</span>
            <span className="free-text">ફ્રી (Free)</span>
          </div>
          <div className="summary-total">
            <span>ચૂકવવાની રકમ (Total):</span>
            <span>₹{getCartTotal()}</span>
          </div>
          
          <div className="address-section">
            <h3 className="address-title">ડિલિવરી સરનામું (Delivery Address)</h3>
            <textarea
              className="address-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="તમારું નામ, ઘર નંબર, સોસાયટી અને વિસ્તાર લખો..."
              rows={4}
              required
            />
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            વોટ્સએપ પર ઓર્ડર મોકલો
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
