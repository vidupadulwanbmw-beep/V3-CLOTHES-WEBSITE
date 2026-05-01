import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, UploadCloud } from 'lucide-react';
import './Auth.css';
import './CustomTShirt.css';

export default function CustomTShirt() {
  const navigate = useNavigate();
  const [ordered, setOrdered] = useState(false);

  // Customize State
  const [gsm, setGsm] = useState('190');
  
  const colorsList = [
    'Lavender', 'Mint Green', 'Jet Black', 'Sky Blue', 'Lemon Yellow', 
    'Light Pink', 'Summer Green', 'Dark Grey Melange', 'Royal Blue', 
    'Mustard Brown', 'Cherry Red', 'Army Green', 'Light Grey Melange', 
    'Navy Blue', 'Honey Brown', 'Maroon', 'Ivory Yellow', 'Natural Green', 
    'Peach', 'Premium White'
  ];
  
  const [color, setColor] = useState(colorsList[2]); // Jet Black default
  const [size, setSize] = useState('M');
  
  const gsmOptions = ['190', '220 (Premium)', '240'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  
  // Auth/Payment State
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleCustomOrder = (e) => {
    e.preventDefault();

    let message = `👕 *Custom T-Shirt Order* 👕\n\n`;
    message += `*Specifications:*\n`;
    message += `GSM: ${gsm}\n`;
    message += `Color: ${color}\n`;
    message += `Size: ${size}\n\n`;
    
    // Warn user to send photo
    message += `*(I will send the design photo here in this chat)*\n\n`;

    message += `*Payment Method:* ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Deposit'}\n\n`;
    message += `*Customer Details:*\n`;
    message += `Phone: ${phone}\n`;
    message += `Address: ${address}\n\n`;
    message += `Please confirm my custom order and let me know the price!\n\n(Rate your web experience: ⭐⭐⭐⭐⭐)`;

    const whatsappUrl = `https://wa.me/94706461066?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setOrdered(true);
  };

  if (ordered) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="auth-container container"
      >
        <div className="auth-box glass" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <CheckCircle size={80} color="var(--success)" style={{ margin: '0 auto 1.5rem' }} />
          </motion.div>
          <h2 className="auth-title">Sent to WhatsApp!</h2>
          <p className="auth-subtitle">Don't forget to attach your design photo in the WhatsApp chat!</p>
          <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      className="auth-container container custom-tshirt-page"
    >
      <div className="auth-box glass custom-box">
        <h2 className="auth-title">Customize T-Shirt</h2>
        <p className="auth-subtitle">Design your own! Fill the details and upload a photo to WhatsApp.</p>
        
        <form onSubmit={handleCustomOrder} className="auth-form">
          <h3 className="section-heading">1. T-Shirt Details</h3>
          
          <div className="input-group">
            <label className="input-label">GSM (Material Thickness)</label>
            <div className="pill-container" style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              {gsmOptions.map((opt) => {
                const optValue = opt.substring(0,3);
                return (
                  <div key={optValue} style={{ position: 'relative', flex: 1, textAlign: 'center' }}>
                    <button 
                      type="button"
                      onClick={() => setGsm(optValue)}
                      className={gsm === optValue ? 'pill-btn active' : 'pill-btn'}
                      style={{ position: 'relative', zIndex: 10, padding: '0.8rem', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
                    >
                      {opt}
                    </button>
                    {gsm === optValue && (
                      <motion.div
                        layoutId="liquidGsm"
                        className="liquid-nav-glass"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        style={{ borderRadius: '8px' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="input-group" style={{ flex: '1 1 200px' }}>
              <label className="input-label">Color</label>
              <select 
                className="input-field" 
                required 
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ appearance: 'auto', background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer' }}
              >
                {colorsList.map(c => <option key={c} value={c} style={{ background: '#333' }}>{c}</option>)}
              </select>
            </div>
            <div className="input-group" style={{ flex: '2 1 300px' }}>
              <label className="input-label">Size</label>
              <div className="pill-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                {sizeOptions.map((s) => (
                  <div key={s} style={{ position: 'relative', flex: 1, textAlign: 'center', minWidth: '40px' }}>
                    <button 
                      type="button"
                      onClick={() => setSize(s)}
                      className={size === s ? 'pill-btn active' : 'pill-btn'}
                      style={{ position: 'relative', zIndex: 10, padding: '0.6rem 0.2rem', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '0.9rem' }}
                    >
                      {s}
                    </button>
                    {size === s && (
                      <motion.div
                        layoutId="liquidSize"
                        className="liquid-nav-glass"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        style={{ borderRadius: '8px' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Design Photo</label>
            <div className="upload-placeholder glass">
              <UploadCloud size={30} color="var(--primary)" />
              <p>You can send the photo directly in WhatsApp after clicking Order!</p>
            </div>
          </div>

          <h3 className="section-heading">2. Delivery & Payment</h3>
          
          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input 
              type="text" 
              className="input-field" 
              required 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07X XXX XXXX"
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Shipping Address</label>
            <textarea 
              className="input-field" 
              required 
              rows="2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address..."
            ></textarea>
          </div>

          <div className="input-group">
            <label className="input-label">Payment Method</label>
            <div className="payment-options">
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod" 
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery (COD)
              </label>
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Bank Deposit
              </label>
            </div>
            
            {paymentMethod === 'bank' && (
              <div className="bank-details">
                <p><strong>Bank:</strong> BOC (Bank of Ceylon)</p>
                <p><strong>Account Name:</strong> V3 Clothes</p>
                <p><strong>Account No:</strong> 0012345678</p>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <MessageCircle size={20} />
            Order Custom T-Shirt via WhatsApp
          </button>
        </form>
      </div>
    </motion.div>
  );
}
