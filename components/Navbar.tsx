import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Brain, Activity, History, MessageCircle, Image as ImageIcon, LogOut, Stethoscope } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  if (!user && location.pathname === '/') return null;

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <Link to={user ? "/dashboard" : "/"} className="nav-brand">
            <Brain className="text-teal" size={32} />
            <span>StressMeter</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="nav-links">
            {user ? (
              <>
                <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
                  <Activity size={18} /> Dashboard
                </Link>
                <Link to="/quiz" className={`nav-item ${isActive('/quiz')}`}>
                  <Brain size={18} /> Quizzes
                </Link>
                <Link to="/history" className={`nav-item ${isActive('/history')}`}>
                  <History size={18} /> History
                </Link>
                <Link to="/chatbot" className={`nav-item ${isActive('/chatbot')}`}>
                  <MessageCircle size={18} /> AI Assistant
                </Link>
                <Link to="/image-editor" className={`nav-item ${isActive('/image-editor')}`}>
                  <ImageIcon size={18} /> Art Therapy
                </Link>
                <Link to="/doctors" className={`nav-item ${isActive('/doctors')}`}>
                  <Stethoscope size={18} /> Doctors
                </Link>
                <button onClick={logout} className="nav-item" style={{ marginLeft: '1rem' }}>
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-item">Login</Link>
                <Link to="/register" className="nav-btn primary">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMenu}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
             {user ? (
                <>
                  <Link onClick={toggleMenu} to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}><Activity size={18} /> Dashboard</Link>
                  <Link onClick={toggleMenu} to="/quiz" className={`nav-item ${isActive('/quiz')}`}><Brain size={18} /> Quizzes</Link>
                  <Link onClick={toggleMenu} to="/history" className={`nav-item ${isActive('/history')}`}><History size={18} /> History</Link>
                  <Link onClick={toggleMenu} to="/chatbot" className={`nav-item ${isActive('/chatbot')}`}><MessageCircle size={18} /> AI Assistant</Link>
                  <Link onClick={toggleMenu} to="/image-editor" className={`nav-item ${isActive('/image-editor')}`}><ImageIcon size={18} /> Art Therapy</Link>
                  <Link onClick={toggleMenu} to="/doctors" className={`nav-item ${isActive('/doctors')}`}><Stethoscope size={18} /> Doctors</Link>
                  <hr style={{ borderColor: '#eee' }} />
                  <button onClick={() => { logout(); toggleMenu(); }} className="nav-item" style={{ color: 'var(--danger)', width: '100%', justifyContent: 'flex-start' }}>
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <>
                   <Link onClick={toggleMenu} to="/login" className="nav-item">Login</Link>
                   <Link onClick={toggleMenu} to="/register" className="nav-btn primary" style={{ textAlign: 'center' }}>Get Started</Link>
                </>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;