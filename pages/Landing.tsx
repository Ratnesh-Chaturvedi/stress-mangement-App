import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Camera, ArrowRight, Stethoscope, Users, Star, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { MOCK_DOCTORS } from '../constants';

const Landing: React.FC = () => {
  const featuredDoctors = MOCK_DOCTORS.slice(0, 3);

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Hero Section */}
      <div className="landing-hero">
        {/* Background glow effects */}
        <div className="bg-glow">
          <div className="glow-blob" style={{ top: '-10%', left: '10%', width: '400px', height: '400px', background: '#0d9488' }}></div>
          <div className="glow-blob" style={{ bottom: '10%', right: '10%', width: '300px', height: '300px', background: '#0ea5e9', animationDelay: '2s' }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '2rem', animation: 'fadeIn 0.8s ease-out' }}>
            <span style={{ 
              background: 'rgba(15, 118, 110, 0.1)', color: '#5eead4', 
              padding: '0.5rem 1.5rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600,
              border: '1px solid rgba(45, 212, 191, 0.2)', backdropFilter: 'blur(5px)'
            }}>
              ✨ AI-Powered Mental Wellness Tracker
            </span>
          </div>
          
          <h1 className="landing-title">
            Find Your <br /> <span>Inner Calmness</span>
          </h1>
          
          <p className="landing-subtitle">
            A smart companion for your mental journey. Track stress, analyze moods, and find clarity with our advanced AI counselor and creative therapy tools.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '5rem', animation: 'fadeIn 1.4s ease-out', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
              Get Started <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </Link>
            <Link to="/login" className="btn" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '1rem 2.5rem', fontSize: '1.125rem', backdropFilter: 'blur(5px)' }}>
              Log In
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md-grid-cols-4" style={{ 
            background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)',
            borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)',
            padding: '2rem', maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 1.6s ease-out' 
          }}>
            {[
              { label: 'Active Users', value: '15+', icon: Users },
              { label: 'Moods Logged', value: '150+', icon: Activity },
              { label: 'AI Responses', value: '500+', icon: MessageCircle },
              { label: 'User Rating', value: '4.9/5', icon: Star },
            ].map((stat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <stat.icon size={28} color="#2dd4bf" style={{ marginBottom: '0.75rem', filter: 'drop-shadow(0 0 8px rgba(45, 212, 191, 0.4))' }} />
                <div style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '6rem 1rem', background: '#0f172a', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Holistic Wellness Tools</h2>
            <p style={{ color: '#94a3b8' }}>Everything you need to maintain a balanced mind.</p>
          </div>
          
          <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-4">
             {[
              { title: 'Mood Tracking', desc: 'Simple daily check-ins to monitor emotional patterns.', icon: Activity, color: '#60a5fa' },
              { title: 'AI Counselor', desc: '24/7 chat support for immediate stress relief tips.', icon: Brain, color: '#2dd4bf' },
              { title: 'Art Therapy', desc: 'Transform stress into art with AI image generation.', icon: Camera, color: '#a855f7' },
              { title: 'Professional Help', desc: 'Connect with verified doctors near you easily.', icon: Stethoscope, color: '#fb7185' },
            ].map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', width: 'fit-content', padding: '1rem', borderRadius: '1rem' }}>
                  <feature.icon size={32} color={feature.color} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>{feature.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Doctors Section - Enhanced */}
      <div style={{ padding: '6rem 1rem', background: '#020617', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        {/* Background blobs specifically for this section */}
        <div className="bg-glow">
          <div className="glow-blob" style={{ top: '20%', right: '-10%', width: '500px', height: '500px', background: 'rgba(13, 148, 136, 0.15)' }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              <ShieldCheck size={18} /> Verified Specialists
            </div>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'white', lineHeight: 1.2 }}>
              Expert Care,<br/> Just a Click Away
            </h2>
          </div>

          <div className="grid grid-cols-1 md-grid-cols-3 gap-8">
            {featuredDoctors.map((doc) => (
              <div key={doc.id} className="doctor-card">
                <div className="doctor-image-wrapper">
                  <img src={doc.image} alt={doc.name} />
                  <div className="doctor-overlay">
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{doc.name}</h3>
                    <p style={{ color: '#2dd4bf', fontWeight: 600 }}>{doc.specialty}</p>
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem', color: 'white' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Star size={16} fill="#facc15" color="#facc15" />
                        <span style={{ fontWeight: 700 }}>{doc.rating}</span>
                     </div>
                     <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{doc.experience} Exp.</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={16} color="var(--primary)" style={{ marginRight: '0.75rem' }} />
                      Available for online Consultation
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={16} color="var(--primary)" style={{ marginRight: '0.75rem' }} />
                      Certified Professional
                    </div>
                  </div>

                  <Link to="/doctors" className="btn btn-primary" style={{ width: '100%', borderRadius: '1rem' }}>
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/doctors" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '2rem', padding: '1rem 3rem', backdropFilter: 'blur(5px)' }}>
              Explore All Specialists <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;