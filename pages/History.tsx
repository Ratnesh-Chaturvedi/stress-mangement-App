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

  // Format data for chart
  const chartData = history.map(h => ({
    date: new Date(h.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    score: h.score,
    type: h.quizType
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Wellness History</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Trends Over Time</h2>
          <div className="h-80 w-full">
            {history.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    itemStyle={{ color: '#0d9488' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={3} dot={{ r: 4, fill: '#0d9488' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">
                No data available yet
              </div>
            )}
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Recent Logs</h2>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {history.length === 0 ? (
                <div className="p-6 text-center text-slate-500">No logs found.</div>
              ) : (
                history.slice().reverse().map((item) => (
                  <div key={item.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-slate-800">{item.quizType}</span>
                      <span className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 truncate max-w-[70%]">{item.feedback}</span>
                        <span className="font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded text-xs">{item.score}/{item.maxScore}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
