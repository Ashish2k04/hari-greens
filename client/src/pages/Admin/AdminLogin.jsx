import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { password });
      if (response.data.success) {
        onLogin();
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'પાસવર્ડ તપાસવામાં ભૂલ (Login Error)');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>એડમિન લોગીન (Admin Login)</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>પાસવર્ડ (Password)</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="પાસવર્ડ નાખો"
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className="login-btn">લોગીન કરો</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
