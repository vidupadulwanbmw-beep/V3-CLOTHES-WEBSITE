import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer glass">
      <div className="container footer-content">
        <div className="footer-section brand-section">
          <h2 className="footer-brand">V3 Clothes</h2>
          <p className="footer-desc">
            The ultimate destination for next-gen fashion. Elevate your style with our premium cyberpunk and futuristic collections.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/share/1DrkbUZau7/" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook size={20} /></a>
            <a href="https://www.instagram.com/v3clothes.business?igsh=ODAxOWtkaWhmYmJz" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={20} /></a>
            <a href="https://www.tiktok.com/@v3.clothes?_r=1&_t=ZS-95rcPcdvpbU" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok size={20} /></a>
            <a href="https://wa.me/94706461066" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp size={20} /></a>
          </div>
        </div>

        <div className="footer-section links-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop Collection</Link></li>
            <li><Link to="/customize">Customize T-shirts</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>No.26/1,Saman Pedesa,Ratnapura</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>0706461066</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>v3clothesbusiness@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} V3 Clothes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
