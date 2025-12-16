import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { QuizResult } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const History: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<QuizResult[]>([]);

  useEffect(() => {
    const allHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const userHistory = allHistory.filter((h: QuizResult) => h.userId === user?.id);
    setHistory(userHistory);
  }, [user]);

  const chartData = history.map(h => ({
    date: new Date(h.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    score: h.score,
    type: h.quizType
  }));

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>Your Wellness History</h1>

      <div className="grid grid-cols-1 md-grid-cols-2" style={{ gap: '2rem' }}>
        {/* Chart */}
        <div className="card" style={{ height: '400px' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Trends Over Time</h2>
          <div style={{ width: '100%', height: '300px' }}>
            {history.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Line type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={3} dot={{ r: 4, fill: '#0d9488' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                No data available yet
              </div>
            )}
          </div>
        </div>

        {/* List */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
             <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Recent Logs</h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: '400px' }}>
             {history.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No logs found.</div>
             ) : (
                history.slice().reverse().map((item) => (
                   <div key={item.id} style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                         <span style={{ fontWeight: 600 }}>{item.quizType}</span>
                         <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '70%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.feedback}</span>
                         <span style={{ fontWeight: 700, color: 'var(--primary)', background: '#ccfbf1', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>{item.score}/{item.maxScore}</span>
                      </div>
                   </div>
                ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;