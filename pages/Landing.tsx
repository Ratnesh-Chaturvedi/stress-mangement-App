import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Camera, ArrowRight, Stethoscope, Users, Star, MessageCircle, CheckCircle2 } from 'lucide-react';
import { MOCK_DOCTORS } from '../constants';

const Landing: React.FC = () => {
  // Use only first 3 doctors for teaser
  const featuredDoctors = MOCK_DOCTORS.slice(0, 3);

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <div className="landing-hero">
        <div className="container">
          <div style={{ marginBottom: '2rem', animation: 'fadeIn 0.8s ease-out' }}>
            <span style={{ 
              background: 'rgba(15, 118, 110, 0.2)', color: '#2dd4bf', 
              padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600 
            }}>
              AI-Powered Mental Wellness Tracker
            </span>
          </div>
          
          <h1 className="landing-title">
            Master Your <span>Inner Calm</span>
          </h1>
          
          <p className="landing-subtitle">
            A smart companion for your mental journey. Track stress, analyze moods, and find clarity with our AI counselor and creative tools.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem', animation: 'fadeIn 1.4s ease-out' }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Get Started <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </Link>
            <Link to="/login" className="btn" style={{ border: '1px solid #334155', color: 'white', padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Log In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md-grid-cols-4" style={{ borderTop: '1px solid #1e293b', paddingTop: '3rem', maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 1.6s ease-out' }}>
            {[
              { label: 'Active Users', value: '150+', icon: Users },
              { label: 'Moods Logged', value: '500+', icon: Activity },
              { label: 'AI Responses', value: '1k+', icon: MessageCircle },
              { label: 'User Rating', value: '4.8/5', icon: Star },
            ].map((stat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <stat.icon size={24} color="#0d9488" style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '5rem 1rem', background: '#0f172a' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '1rem' }}>Everything You Need</h2>
          <div className="feature-grid">
             {[
              { title: 'Mood Tracking', desc: 'Simple daily check-ins to monitor emotional patterns.', icon: Activity, color: '#60a5fa' },
              { title: 'AI Counselor', desc: '24/7 chat support for immediate stress relief tips.', icon: Brain, color: '#2dd4bf' },
              { title: 'Art Therapy', desc: 'Transform stress into art with AI image generation.', icon: Camera, color: '#a855f7' },
              { title: 'Professional Help', desc: 'Connect with verified doctors near you easily.', icon: Stethoscope, color: '#fb7185' },
            ].map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div style={{ marginBottom: '1rem' }}>
                  <feature.icon size={32} color={feature.color} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ color: '#94a3b8' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet Our Specialists Section */}
      <div style={{ padding: '5rem 1rem', background: '#020617', borderTop: '1px solid #1e293b' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em' }}>Expert Care</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginTop: '0.5rem' }}>Meet Our Specialists</h2>
            <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '1rem auto 0' }}>
              Connect with certified professionals who are ready to guide you on your journey to better mental health.
            </p>
          </div>

          <div className="grid grid-cols-1 md-grid-cols-3 gap-8">
            {featuredDoctors.map((doc) => (
              <div key={doc.id} className="feature-card" style={{ padding: 0, overflow: 'hidden', border: 'none', background: '#1e293b' }}>
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img src={doc.image} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>{doc.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(250, 204, 21, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}>
                      <Star size={14} fill="#facc15" color="#facc15" style={{ marginRight: '0.25rem' }} />
                      <span style={{ fontSize: '0.875rem', color: '#facc15', fontWeight: 600 }}>{doc.rating}</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--primary)', fontWeight: 500, marginBottom: '1rem' }}>{doc.specialty}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
                      <CheckCircle2 size={16} color="var(--success)" style={{ marginRight: '0.5rem' }} />
                      {doc.experience} Experience
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
                      <CheckCircle2 size={16} color="var(--success)" style={{ marginRight: '0.5rem' }} />
                      Verified Professional
                    </div>
                  </div>

                  <Link to="/doctors" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/doctors" style={{ display: 'inline-flex', alignItems: 'center', color: 'white', fontWeight: 600, borderBottom: '1px solid var(--primary)', paddingBottom: '0.25rem' }}>
              View All Doctors <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;