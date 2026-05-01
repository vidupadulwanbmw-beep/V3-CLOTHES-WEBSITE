import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MessageCircle } from 'lucide-react';
import './Auth.css';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [ordered, setOrdered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Form State
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Build WhatsApp message
    let message = `🛍️ *New Order from V3 Clothes* 🛍️\n\n`;
    message += `*Items:*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Qty: ${item.qty}\n`;
    });
    
    message += `\n*Total Amount:* Rs. ${totalAmount.toFixed(2)}\n`;
    message += `*Payment Method:* ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Deposit'}\n\n`;
    
    message += `*Customer Details:*\n`;
    message += `Phone: ${phone}\n`;
    message += `Address: ${address}\n\n`;
    message += `Please confirm my order.\n\n(Rate your web experience: ⭐⭐⭐⭐⭐)`;

    // Direct WhatsApp Link (Using provided shop number)
    const whatsappUrl = `https://wa.me/94706461066?text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');

    // Show success animation and clear cart
    setOrdered(true);
    clearCart();
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
          <h2 className="auth-title">Order Sent to WhatsApp!</h2>
          <p className="auth-subtitle">We have redirected you to WhatsApp to confirm your order.</p>
          <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="auth-container container"
    >
      <div className="auth-box glass">
        <h2 className="auth-title">Checkout</h2>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Total: </span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            Rs. {totalAmount.toFixed(2)}
          </span>
        </div>
        
        <form onSubmit={handleCheckout} className="auth-form">
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
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="no.26/1, Saman Pedesa, Ratnapura"
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
                <p style={{ marginBottom: '0.5rem' }}>Please deposit the total amount to:</p>
                <p><strong>Bank:</strong> BOC (Bank of Ceylon)</p>
                <p><strong>Account Name:</strong> V3 Clothes</p>
                <p><strong>Account No:</strong> 0012345678</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--primary)' }}>Please use your Phone Number as the reference.</p>
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <MessageCircle size={20} />
            Place Order via WhatsApp
          </button>
        </form>
      </div>
    </motion.div>
  );
}
