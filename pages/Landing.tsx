import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Camera, ArrowRight, ShieldCheck, Zap, Heart, Users, Star, MessageCircle, Stethoscope } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen font-sans selection:bg-teal-500 selection:text-white">
      {/* Custom Keyframes for smooth animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite 1s;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-24">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000"></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 backdrop-blur-sm text-teal-400 text-sm font-medium mb-8 animate-float">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 mr-2 animate-ping"></span>
            AI-Powered Mental Wellness Tracker
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8">
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Inner Calm</span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
            A smart companion for your mental journey. Track stress, analyze moods, and find clarity with our AI counselor and creative tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 transition-all duration-200 bg-teal-400 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 hover:bg-teal-300 hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 hover:border-teal-500/50"
            >
              Log In
            </Link>
          </div>

          {/* Abstract Dashboard/App Preview */}
          <div className="mt-20 relative w-full max-w-5xl mx-auto animate-float-delayed hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-md p-2 shadow-2xl">
                <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[16/9] relative flex items-center justify-center">
                    <div className="text-center">
                        <Activity className="w-16 h-16 text-teal-500 mx-auto mb-4 opacity-80" />
                        <h3 className="text-2xl font-bold text-slate-200">Wellness Dashboard</h3>
                        <p className="text-slate-500">Real-time analysis & AI Chat</p>
                    </div>
                    <div className="absolute top-10 left-10 w-32 h-2 bg-slate-800 rounded-full"></div>
                    <div className="absolute top-16 left-10 w-20 h-2 bg-slate-800 rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-12 h-12 bg-purple-500/20 rounded-full blur-xl"></div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Stats Section */}
      <div className="border-y border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Users', value: '150+', icon: Users },
              { label: 'Moods Logged', value: '500+', icon: Activity },
              { label: 'AI Responses', value: '1k+', icon: MessageCircle },
              { label: 'User Rating', value: '4.8/5', icon: Star },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center group">
                <stat.icon className="w-6 h-6 text-teal-500 mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - Dark Cards */}
      <div className="py-24 bg-slate-900 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-teal-400 font-semibold tracking-wide uppercase text-sm mb-2">Features</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Everything You Need
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Mood Tracking',
                desc: 'Simple daily check-ins to monitor emotional patterns.',
                icon: Activity,
                color: 'text-blue-400',
                bg: 'bg-blue-500/10'
              },
              {
                title: 'AI Counselor',
                desc: '24/7 chat support for immediate stress relief tips.',
                icon: Brain,
                color: 'text-teal-400',
                bg: 'bg-teal-500/10'
              },
              {
                title: 'Art Therapy',
                desc: 'Transform stress into art with AI image generation.',
                icon: Camera,
                color: 'text-purple-400',
                bg: 'bg-purple-500/10'
              },
              {
                title: 'Professional Help',
                desc: 'Connect with verified doctors near you easily.',
                icon: Stethoscope,
                color: 'text-rose-400',
                bg: 'bg-rose-500/10'
              },
            ].map((feature, idx) => (
              <div key={idx} className="group p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Connection Section (New) */}
      <div className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
               <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-900/30 border border-rose-800/50 text-rose-400 text-sm font-medium mb-6">
                 <Stethoscope className="w-4 h-4 mr-2" />
                 Professional Support
               </div>
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                 Connect with Real Doctors
               </h2>
               <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                 Sometimes, talking to AI isn't enough. Our new consultancy feature helps you find local psychologists and therapists. View ratings, availability, and book appointments directly from the dashboard.
               </p>
               <div className="space-y-4">
                 {[
                   "Verified Professionals",
                   "Easy Scheduling",
                   "Confidential Booking"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center text-slate-300">
                     <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center mr-3">
                       <CheckCircle className="w-4 h-4 text-teal-400" />
                     </div>
                     {item}
                   </div>
                 ))}
               </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full"></div>
               <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                 <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" alt="Doctor" className="w-16 h-16 rounded-full object-cover border-2 border-teal-500" />
                    <div>
                      <h4 className="text-white font-bold text-lg">Dr. Emily Stone</h4>
                      <p className="text-slate-400 text-sm">Clinical Psychologist</p>
                    </div>
                    <div className="ml-auto flex items-center bg-slate-900 px-3 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-white font-bold">4.9</span>
                    </div>
                 </div>
                 <div className="space-y-3">
                   <div className="h-2 bg-slate-700 rounded-full w-3/4"></div>
                   <div className="h-2 bg-slate-700 rounded-full w-full"></div>
                   <div className="h-2 bg-slate-700 rounded-full w-5/6"></div>
                 </div>
                 <div className="mt-6">
                    <button className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold">Book Appointment</button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified How it Works */}
      <div className="py-24 bg-slate-800/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-16">Simple Steps to Balance</h2>
            <div className="grid md:grid-cols-3 gap-12">
                {[
                    { step: '01', title: 'Sign Up', desc: 'Create your private account in seconds.', icon: Zap },
                    { step: '02', title: 'Check In', desc: 'Take a quick stress or mood quiz.', icon: Activity },
                    { step: '03', title: 'Heal', desc: 'Get AI insights or book a doctor.', icon: Heart }
                ].map((item, i) => (
                    <div key={i} className="relative flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl font-bold text-teal-400 shadow-xl mb-6 relative z-10 group hover:-translate-y-2 transition-transform duration-300">
                            {item.icon ? <item.icon size={28} /> : item.step}
                        </div>
                        {i !== 2 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-slate-700 to-slate-800 -z-0"></div>}
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-slate-400 max-w-xs">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Minimal Testimonials Section */}
      <div className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-16">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Helped me manage my anxiety during finals week. The AI chat is surprisingly calming.",
                author: "Alex M.",
                role: "Computer Science Student"
              },
              {
                quote: "I love the mood tracking feature. It's simple and helps me see patterns in my week.",
                author: "Sarah J.",
                role: "Psychology Major"
              },
              {
                quote: "The art therapy tool is a fun way to de-stress after a long day of classes.",
                author: "Mike T.",
                role: "Design Student"
              }
            ].map((t, i) => (
              <div key={i} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="fill-teal-500 text-teal-500" />
                  ))}
                </div>
                <p className="text-slate-300 italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
          <div className="mx-auto max-w-7xl px-4 text-center">
              <div className="flex items-center justify-center gap-2 text-white font-bold text-xl mb-6">
                  <Brain className="text-teal-500" /> StressMeter
              </div>
              <p className="text-slate-500 text-sm mb-6">Designed for Mental Wellness • College Project</p>
              <div className="flex justify-center gap-6 text-slate-400 text-sm">
                  <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
              </div>
              <p className="text-slate-600 text-xs mt-8">&copy; {new Date().getFullYear()} Stress Meter. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

// Simple icon component for usage in this file
const CheckCircle = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default Landing;