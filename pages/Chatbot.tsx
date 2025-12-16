import React, { useState, useRef, useEffect } from 'react';
import { Send, User as UserIcon, Bot, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';
import { toast } from 'react-hot-toast';

const Chatbot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hi ${user?.name || 'there'}! I'm your Stress Meter companion. How are you feeling today? I'm here to listen and help.`,
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await getChatResponse(messages, userMsg.text);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
       <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', height: '80vh', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: '#ccfbf1', borderRadius: '0.5rem' }}>
                   <Bot size={24} color="#0d9488" />
                </div>
                <div>
                   <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>AI Wellness Counselor</h2>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Powered by Gemini Pro</p>
                </div>
             </div>
             <button onClick={() => setMessages([messages[0]])} style={{ color: 'var(--text-muted)' }} title="Reset Chat">
                <RefreshCw size={20} />
             </button>
          </div>

          {/* Chat Area */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#f8fafc' }}>
             {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.role}`}>
                   <div className="message-bubble">
                      {msg.text}
                   </div>
                </div>
             ))}
             {isLoading && (
                <div className="message model">
                   <div className="message-bubble" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                      Typing...
                   </div>
                </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', background: 'white' }}>
             <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                   type="text"
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   placeholder="Type your message..."
                   className="input-field"
                   style={{ marginBottom: 0, flex: 1 }}
                   disabled={isLoading}
                />
                <button type="submit" className="btn btn-primary" disabled={isLoading || !inputText.trim()} style={{ borderRadius: 'var(--radius-md)', padding: '0 1.25rem' }}>
                   <Send size={20} />
                </button>
             </form>
          </div>
       </div>
    </div>
  );
};

export default Chatbot;