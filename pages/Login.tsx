import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { User, Mail, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
        toast.error('Please fill in all fields');
        return;
    }
    
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
        login(email, name);
        toast.success(`Welcome back, ${name}!`);
        navigate('/dashboard');
        setIsLoading(false);
    }, 800);
  };

  return (
    <div className="modern-auth-wrapper">
      {/* Background Effects */}
      <div className="bg-glow">
        <div className="glow-blob" style={{ top: '10%', left: '20%', width: '300px', height: '300px', background: '#0d9488', opacity: 0.2 }}></div>
        <div className="glow-blob" style={{ bottom: '10%', right: '20%', width: '350px', height: '350px', background: '#0ea5e9', opacity: 0.2, animationDelay: '1s' }}></div>
      </div>

      <div className="modern-auth-card">
        <h2 className="modern-auth-title">Welcome Back</h2>
        <p className="modern-auth-subtitle">
          Don't have an account? <Link to="/register" className="modern-link">Sign up</Link>
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="modern-input-group">
            <label className="modern-input-label">Name (Demo)</label>
            <div className="modern-input-wrapper">
              <User size={18} className="modern-input-icon" />
              <input
                type="text"
                required
                className="modern-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="modern-input-group">
             <label className="modern-input-label">Email Address</label>
             <div className="modern-input-wrapper">
               <Mail size={18} className="modern-input-icon" />
               <input
                type="email"
                required
                className="modern-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : <span className="flex items-center justify-center">Sign In <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;