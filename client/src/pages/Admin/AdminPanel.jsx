import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import api from '../../api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: 'કિલો',
    image: '',
    category: 'શાકભાજી',
  });
  const [editingId, setEditingId] = useState(null);

  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [footerForm, setFooterForm] = useState({
    footerAddress: '',
    footerPhone: '',
    footerEmail: '',
  });
  const [footerMsg, setFooterMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchProducts();
    fetchFooterDetails();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchFooterDetails = async () => {
    try {
      const { data } = await api.get('/admin/footer');
      if (data.success && data.data) {
        setFooterForm({
          footerAddress: data.data.footerAddress || '',
          footerPhone: data.data.footerPhone || '',
          footerEmail: data.data.footerEmail || '',
        });
      }
    } catch (error) {
      console.error('Error fetching footer details:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/admin/password', passwordForm);
      setPasswordMsg({ text: res.data.message, type: 'success' });
      setPasswordForm({ oldPassword: '', newPassword: '' });
    } catch (err) {
      setPasswordMsg({ text: err.response?.data?.message || 'પાસવર્ડ બદલવામાં ભૂલ', type: 'error' });
    }
    setTimeout(() => setPasswordMsg({ text: '', type: '' }), 4000);
  };

  const handleFooterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/admin/footer', footerForm);
      setFooterMsg({ text: res.data.message, type: 'success' });
    } catch (err) {
      setFooterMsg({ text: err.response?.data?.message || 'Error updating footer', type: 'error' });
    }
    setTimeout(() => setFooterMsg({ text: '', type: '' }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
      } else {
        await api.post('/products', formData);
      }
      setFormData({ name: '', price: '', unit: 'કિલો', image: '', category: 'શાકભાજી' });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
      category: product.category,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('શું તમે ખરેખર આ પ્રોડક્ટ ડિલીટ કરવા માંગો છો? (Are you sure you want to delete this product?)')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>હરિ નમન ગ્રીન્સ - Admin Panel</h1>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar-col">
          <div className="admin-form-section">
            <h2>{editingId ? 'પ્રોડક્ટમાં ફેરફાર કરો' : 'નવી પ્રોડક્ટ ઉમેરો'}</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>પ્રોડક્ટનું નામ (Gujarati)</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="દા.ત., ડુંગળી"
              />
            </div>

            <div className="form-group">
              <label>કિંમત (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                placeholder="દા.ત., 20"
              />
            </div>

            <div className="form-group">
              <label>યુનિટ (Unit)</label>
              <select name="unit" value={formData.unit} onChange={handleInputChange}>
                <option value="કિલો">કિલો (kg)</option>
                <option value="ગ્રામ">ગ્રામ (gram)</option>
                <option value="લીટર">લીટર (liter)</option>
                <option value="પેકેટ">પેકેટ (packet)</option>
              </select>
            </div>

            <div className="form-group">
              <label>ફોટો URL (Image URL)</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label>કેટેગરી (Category)</label>
              <select name="category" value={formData.category} onChange={handleInputChange}>
                <option value="શાકભાજી">શાકભાજી (Vegetable)</option>
                <option value="ડેરી">ડેરી (Dairy)</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              {editingId ? 'અપડેટ કરો' : 'પ્રોડક્ટ ઉમેરો'}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', price: '', unit: 'કિલો', image: '', category: 'શાકભાજી' });
                }}
              >
                રદ કરો (Cancel)
              </button>
            )}
          </form>
        </div>

          <div className="admin-form-section password-section">
            <h2>પાસવર્ડ બદલો (Change Password)</h2>
            {passwordMsg.text && (
              <div className={`password-msg ${passwordMsg.type}`}>
                {passwordMsg.text}
              </div>
            )}
            <form className="admin-form" onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>જૂનો પાસવર્ડ (Old Password)</label>
                <div className="password-input-container">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    tabIndex="-1"
                  >
                    {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>નવો પાસવર્ડ (New Password)</label>
                <div className="password-input-container">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    tabIndex="-1"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="submit-btn password-btn">
                પાસવર્ડ અપડેટ કરો
              </button>
            </form>
          </div>

          <div className="admin-form-section">
            <h2>ફૂટર વિગતો (Footer Details)</h2>
            {footerMsg.text && (
              <div className={`password-msg ${footerMsg.type}`}>
                {footerMsg.text}
              </div>
            )}
            <form className="admin-form" onSubmit={handleFooterSubmit}>
              <div className="form-group">
                <label>સરનામું (Address)</label>
                <input
                  type="text"
                  value={footerForm.footerAddress}
                  onChange={(e) => setFooterForm({ ...footerForm, footerAddress: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>ફોન નંબર (Phone)</label>
                <input
                  type="text"
                  value={footerForm.footerPhone}
                  onChange={(e) => setFooterForm({ ...footerForm, footerPhone: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>ઇમેઇલ (Email)</label>
                <input
                  type="email"
                  value={footerForm.footerEmail}
                  onChange={(e) => setFooterForm({ ...footerForm, footerEmail: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                વિગતો અપડેટ કરો
              </button>
            </form>
          </div>
        </div>

        <div className="admin-list-section">
          <h2>પ્રોડક્ટ્સની યાદી</h2>
          <div className="product-table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th>ફોટો</th>
                  <th>નામ</th>
                  <th>કેટેગરી</th>
                  <th>કિંમત / યુનિટ</th>
                  <th>એક્શન</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-state">કોઈ પ્રોડક્ટ જોવા મળી નથી.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img src={product.image} alt={product.name} className="product-thumbnail" />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.price} / {product.unit}</td>
                      <td>
                        <button className="action-btn edit" onClick={() => handleEdit(product)}>
                          <Pencil size={18} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(product._id)}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
