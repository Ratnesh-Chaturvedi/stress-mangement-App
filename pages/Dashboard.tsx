import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight, Calendar, Camera, Stethoscope } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Hello, {user?.name} 👋</h1>
        <p className="mt-2 text-slate-600">Here's your wellness overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Quick Action Card - Quiz */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-[1.02] transition-transform cursor-pointer relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Check In</h3>
            <p className="mb-6 opacity-90 text-sm">How are you feeling right now?</p>
            <Link to="/quiz" className="inline-flex items-center bg-white text-teal-600 px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 transition-colors text-sm">
              Start Quiz <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
          <Brain className="absolute -bottom-4 -right-4 h-32 w-32 opacity-20 group-hover:rotate-12 transition-transform" />
        </div>

        {/* AI Chatbot Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="h-10 w-10 bg-sky-100 rounded-xl flex items-center justify-center mb-3 text-sky-600">
            <Brain size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">AI Assistant</h3>
          <p className="text-slate-600 mb-4 text-xs">Chat with our supportive AI counselor anytime.</p>
          <Link to="/chatbot" className="text-sky-600 font-medium hover:text-sky-700 inline-flex items-center text-sm">
            Chat Now <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>

        {/* Art Therapy Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3 text-purple-600">
             <Camera size={20} />
           </div>
           <h3 className="text-lg font-bold text-slate-900 mb-1">Art Therapy</h3>
           <p className="text-slate-600 mb-4 text-xs">Express emotions via AI art generation.</p>
           <Link to="/image-editor" className="text-purple-600 font-medium hover:text-purple-700 inline-flex items-center text-sm">
             Create <ArrowRight size={14} className="ml-1" />
           </Link>
        </div>

        {/* Doctors Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="h-10 w-10 bg-rose-100 rounded-xl flex items-center justify-center mb-3 text-rose-600">
             <Stethoscope size={20} />
           </div>
           <h3 className="text-lg font-bold text-slate-900 mb-1">Doctors</h3>
           <p className="text-slate-600 mb-4 text-xs">Book local mental health professionals.</p>
           <Link to="/doctors" className="text-rose-600 font-medium hover:text-rose-700 inline-flex items-center text-sm">
             Find Help <ArrowRight size={14} className="ml-1" />
           </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Wellness Score</h3>
          {recentResult ? (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="text-sm text-slate-500 mb-1">{new Date(recentResult.date).toLocaleDateString()}</p>
                <p className="font-semibold text-slate-900">{recentResult.quizType} Check-in</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-teal-600">{recentResult.score}/{recentResult.maxScore}</span>
                <p className="text-xs text-slate-400">Score</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>No quizzes taken yet.</p>
              <Link to="/quiz" className="text-teal-600 hover:underline mt-2 inline-block">Take your first quiz</Link>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-2">Daily Tip</h3>
          <p className="opacity-90 leading-relaxed">
            "Mindfulness isn't difficult, we just need to remember to do it. Take 5 deep breaths right now."
          </p>
          <div className="mt-4 flex items-center text-sm opacity-75">
            <Calendar size={16} className="mr-2" /> {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;