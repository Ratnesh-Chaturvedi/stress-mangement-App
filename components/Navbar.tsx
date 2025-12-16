import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Brain, Activity, History, MessageCircle, Image as ImageIcon, LogOut, Stethoscope } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path ? 'text-teal-600 font-semibold' : 'text-slate-600 hover:text-teal-500';

  if (!user && location.pathname === '/') return null; 

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center gap-2">
              <Brain className="h-8 w-8 text-teal-600" />
              <span className="font-bold text-xl text-slate-800">StressMeter</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/dashboard" className={`flex items-center gap-1 ${isActive('/dashboard')}`}>
                  <Activity size={18} /> Dashboard
                </Link>
                <Link to="/quiz" className={`flex items-center gap-1 ${isActive('/quiz')}`}>
                  <Brain size={18} /> Quizzes
                </Link>
                <Link to="/history" className={`flex items-center gap-1 ${isActive('/history')}`}>
                  <History size={18} /> History
                </Link>
                <Link to="/chatbot" className={`flex items-center gap-1 ${isActive('/chatbot')}`}>
                  <MessageCircle size={18} /> AI Assistant
                </Link>
                <Link to="/image-editor" className={`flex items-center gap-1 ${isActive('/image-editor')}`}>
                  <ImageIcon size={18} /> Art Therapy
                </Link>
                <Link to="/doctors" className={`flex items-center gap-1 ${isActive('/doctors')}`}>
                  <Stethoscope size={18} /> Doctors
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-slate-600 hover:text-red-500 transition-colors ml-4"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-slate-600 hover:text-teal-600 font-medium">Login</Link>
                <Link to="/register" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <Link onClick={toggleMenu} to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50">Dashboard</Link>
                <Link onClick={toggleMenu} to="/quiz" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50">Quizzes</Link>
                <Link onClick={toggleMenu} to="/history" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50">History</Link>
                <Link onClick={toggleMenu} to="/chatbot" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50">AI Assistant</Link>
                <Link onClick={toggleMenu} to="/image-editor" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50">Art Therapy</Link>
                <Link onClick={toggleMenu} to="/doctors" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50">Doctors</Link>
                <button
                  onClick={() => { logout(); toggleMenu(); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                 <Link onClick={toggleMenu} to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50">Login</Link>
                 <Link onClick={toggleMenu} to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-teal-600 hover:bg-teal-50">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;