import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { User, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
        toast.error('Please fill in all fields');
        return;
    }

    setIsLoading(true);
    setTimeout(() => {
        register(email, name);
        toast.success('Account created successfully!');
        navigate('/dashboard');
        setIsLoading(false);
    }, 800);
  };

  return (
    <div className="modern-auth-wrapper">
      {/* Background Effects */}
      <div className="bg-glow">
        <div className="glow-blob" style={{ top: '20%', left: '10%', width: '400px', height: '400px', background: '#7c3aed', opacity: 0.2 }}></div>
        <div className="glow-blob" style={{ bottom: '20%', right: '10%', width: '300px', height: '300px', background: '#db2777', opacity: 0.2, animationDelay: '2s' }}></div>
      </div>

      <div className="modern-auth-card">
        <h2 className="modern-auth-title">Create Account</h2>
        <p className="modern-auth-subtitle">
          Start your wellness journey today
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="modern-input-group">
            <label className="modern-input-label">Full Name</label>
            <div className="modern-input-wrapper">
              <User size={18} className="modern-input-icon" />
              <input
                type="text"
                required
                className="modern-input"
                placeholder="Enter your full name"
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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            <ShieldCheck size={14} color="#2dd4bf" />
            <span>Your data is secure and private.</span>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : <span className="flex items-center justify-center">Start Journey <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></span>}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
            Already have an account? <Link to="/login" className="modern-link">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;