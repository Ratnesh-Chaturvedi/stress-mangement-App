import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Twitter, Instagram, Linkedin, Mail, Heart, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col">
            <div className="footer-brand">
              <Brain size={28} className="text-teal" />
              <span>StressMeter</span>
            </div>
            <p className="footer-text">
              Empowering your mental wellness journey through advanced AI technology and compassionate professional care.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/quiz">Wellness Assessment</Link></li>
              <li><Link to="/chatbot">AI Counselor</Link></li>
              <li><Link to="/image-editor">Art Therapy</Link></li>
              <li><Link to="/doctors">Find Specialists</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Mental Health Guide</a></li>
              <li><a href="#">Crisis Support</a></li>
              <li><a href="#">Community Blog</a></li>
              <li><a href="#">Research & Data</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4 className="footer-heading">Weekly Wellness</h4>
            <p className="footer-text">Subscribe for tips to maintain your inner calm.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Email address" />
              <button aria-label="Subscribe"><Mail size={18} /></button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} StressMeter AI. All rights reserved.
          </div>
          <div className="footer-bottom-links">
             <a href="#">Privacy Policy</a>
             <a href="#">Terms of Service</a>
             <a href="#">Cookie Settings</a>
          </div>
          <div className="made-with">
            Made with <Heart size={14} fill="#ef4444" color="#ef4444" style={{margin: '0 4px'}} /> for peace of mind
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;