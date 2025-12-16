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
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu (simplified for CSS version, ideally should have overlay) */}
      {isOpen && (
        <div style={{
          position: 'absolute', top: '64px', left: 0, right: 0, 
          background: 'white', borderTop: '1px solid #eee', padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
           {user ? (
              <>
                <Link onClick={toggleMenu} to="/dashboard" className="nav-item">Dashboard</Link>
                <Link onClick={toggleMenu} to="/quiz" className="nav-item">Quizzes</Link>
                <Link onClick={toggleMenu} to="/history" className="nav-item">History</Link>
                <Link onClick={toggleMenu} to="/chatbot" className="nav-item">AI Assistant</Link>
                <Link onClick={toggleMenu} to="/image-editor" className="nav-item">Art Therapy</Link>
                <button onClick={() => { logout(); toggleMenu(); }} className="nav-item" style={{ color: 'var(--danger)' }}>Logout</button>
              </>
            ) : (
              <>
                 <Link onClick={toggleMenu} to="/login" className="nav-item">Login</Link>
                 <Link onClick={toggleMenu} to="/register" className="nav-item">Register</Link>
              </>
            )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;