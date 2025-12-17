import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight, Calendar, Camera, Stethoscope, Activity } from 'lucide-react';
import { QuizResult } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [recentResult, setRecentResult] = React.useState<QuizResult | null>(null);

  React.useEffect(() => {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const userHistory = history.filter((h: QuizResult) => h.userId === user?.id);
    if (userHistory.length > 0) {
      setRecentResult(userHistory[userHistory.length - 1]);
    }
  }, [user]);

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div className="dashboard-header">
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Hello, {user?.name} 👋</h1>
        <p style={{ color: 'var(--text-muted)' }}>Here's your wellness overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-4 gap-6" style={{ marginBottom: '2rem' }}>
        {/* Quick Action Card - Quiz */}
        <div className="card card-primary">
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h3 className="card-title">Check In</h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem', opacity: 0.9 }}>How are you feeling right now?</p>
            <Link to="/quiz" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
              Start Quiz <ArrowRight size={14} style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
          <Brain style={{ position: 'absolute', bottom: '-1rem', right: '-1rem', opacity: 0.2, width: '8rem', height: '8rem' }} />
        </div>

        {/* AI Chatbot Card */}
        <div className="card">
          <div className="icon-box bg-teal-light">
            <Brain size={20} />
          </div>
          <h3 className="card-title">AI Assistant</h3>
          <p className="card-desc">Chat with our supportive AI counselor anytime.</p>
          <Link to="/chatbot" style={{ display: 'flex', alignItems: 'center', color: 'var(--secondary)', fontWeight: 600, fontSize: '0.875rem' }}>
            Chat Now <ArrowRight size={14} style={{ marginLeft: '0.25rem' }} />
          </Link>
        </div>

        {/* Art Therapy Card */}
        <div className="card">
           <div className="icon-box bg-purple-light">
             <Camera size={20} />
           </div>
           <h3 className="card-title">Art Therapy</h3>
           <p className="card-desc">Express emotions via AI art generation.</p>
           <Link to="/image-editor" style={{ display: 'flex', alignItems: 'center', color: '#9333ea', fontWeight: 600, fontSize: '0.875rem' }}>
             Create <ArrowRight size={14} style={{ marginLeft: '0.25rem' }} />
           </Link>
        </div>

        {/* Doctors Card */}
        <div className="card">
           <div className="icon-box bg-rose-light">
             <Stethoscope size={20} />
           </div>
           <h3 className="card-title">Doctors</h3>
           <p className="card-desc">Book local mental health professionals.</p>
           <Link to="/doctors" style={{ display: 'flex', alignItems: 'center', color: '#e11d48', fontWeight: 600, fontSize: '0.875rem' }}>
             Find Help <ArrowRight size={14} style={{ marginLeft: '0.25rem' }} />
           </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 md-grid-cols-2 gap-6">
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>Recent Wellness Score</h3>
          {recentResult ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{new Date(recentResult.date).toLocaleDateString()}</p>
                <p style={{ fontWeight: 600 }}>{recentResult.quizType} Check-in</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{recentResult.score}/{recentResult.maxScore}</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Score</p>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
              <p>No quizzes taken yet.</p>
              <Link to="/quiz" style={{ color: 'var(--primary)', marginTop: '0.5rem', display: 'inline-block' }}>Take your first quiz</Link>
            </div>
          )}
        </div>

        <div className="card" style={{ background: 'linear-gradient(to right, #6366f1, #9333ea)', color: 'white' }}>
          <h3 className="card-title">Daily Tip</h3>
          <p style={{ opacity: 0.9, lineHeight: 1.6, marginBottom: '1rem' }}>
            "Mindfulness isn't difficult, we just need to remember to do it. Take 5 deep breaths right now."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', opacity: 0.8 }}>
            <Calendar size={16} style={{ marginRight: '0.5rem' }} /> {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;