import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-img" />
        <div className="category-badge">{product.category}</div>
      </div>
      <div className="product-details">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">
          <span className="price-symbol">₹</span>
          <span className="price-value">{product.price}</span>
          <span className="price-unit"> / {product.unit}</span>
        </p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={18} />
          <span>કાર્ટમાં ઉમેરો</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
