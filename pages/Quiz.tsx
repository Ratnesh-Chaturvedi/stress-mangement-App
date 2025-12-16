import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { QUIZZES } from '../constants';
import { QuizType, QuizResult } from '../types';
import { toast } from 'react-hot-toast';
import { CheckCircle2 } from 'lucide-react';

const Quiz: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleStartQuiz = (type: QuizType) => {
    setSelectedQuiz(type);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setResult(null);
  };

  const handleAnswer = (score: number) => {
    if (!selectedQuiz) return;
    
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: score }));
    
    const quizData = QUIZZES[selectedQuiz];
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz({ ...answers, [currentQuestionIndex]: score });
    }
  };

  const finishQuiz = (finalAnswers: Record<number, number>) => {
    if (!selectedQuiz || !user) return;

    const totalScore = Object.values(finalAnswers).reduce((a, b) => a + b, 0);
    const quizData = QUIZZES[selectedQuiz];
    const maxScore = quizData.questions.length * 4;

    let feedback = "You're doing great! Keep maintaining your balance.";
    if (totalScore > maxScore * 0.7) {
        feedback = "It seems you might be experiencing some high levels of stress/emotion. Consider talking to our AI assistant.";
    } else if (totalScore > maxScore * 0.4) {
        feedback = "You have moderate levels. Try some relaxation exercises.";
    }

    const newResult: QuizResult = {
      id: Date.now().toString(),
      userId: user.id,
      quizType: selectedQuiz,
      score: totalScore,
      maxScore: maxScore,
      date: new Date().toISOString(),
      feedback
    };

    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.push(newResult);
    localStorage.setItem('quizHistory', JSON.stringify(history));

    setResult(newResult);
    setIsCompleted(true);
    toast.success('Quiz completed!');
  };

  if (!selectedQuiz) {
    return (
      <div className="container" style={{ padding: '3rem 1rem' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Select an Assessment</h1>
        <div className="grid grid-cols-1 md-grid-cols-2 gap-6" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {Object.entries(QUIZZES).map(([type, data]) => (
            <div key={type} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.75rem' }}>{data.title}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{data.description}</p>
              <button
                onClick={() => handleStartQuiz(type as QuizType)}
                className="btn"
                style={{ background: '#ccfbf1', color: '#0f766e', width: '100%' }}
              >
                Start {data.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isCompleted && result) {
    return (
      <div className="container" style={{ padding: '3rem 1rem', maxWidth: '700px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ background: '#dcfce7', width: '4rem', height: '4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 color="#16a34a" size={32} />
          </div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Results</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Here is your assessment summary</p>
          
          <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
            <p style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Your Score</p>
            <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{result.score} <span style={{ fontSize: '1.25rem', color: '#cbd5e1' }}>/ {result.maxScore}</span></p>
          </div>

          <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', textAlign: 'left' }}>
            <h3 style={{ color: '#1e3a8a', fontWeight: 600, marginBottom: '0.5rem' }}>Suggestion</h3>
            <p style={{ color: '#1e40af' }}>{result.feedback}</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setSelectedQuiz(null)} className="btn btn-secondary" style={{ flex: 1 }}>Back to Quizzes</button>
            <button onClick={() => navigate('/chatbot')} className="btn btn-primary" style={{ flex: 1 }}>Talk to AI Assistant</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = QUIZZES[selectedQuiz].questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZZES[selectedQuiz].questions.length) * 100;

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '700px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <span>Question {currentQuestionIndex + 1} of {QUIZZES[selectedQuiz].questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div style={{ width: '100%', background: '#e2e8f0', height: '0.625rem', borderRadius: '1rem' }}>
          <div style={{ width: `${progress}%`, background: 'var(--primary)', height: '100%', borderRadius: '1rem', transition: 'width 0.3s ease' }}></div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem' }}>{currentQuestion.text}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {currentQuestion.options.map((option) => (
            <button
              key={option.label}
              onClick={() => handleAnswer(option.value)}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', textAlign: 'left', fontWeight: 500 }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      <button onClick={() => setSelectedQuiz(null)} style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>
        Cancel Assessment
      </button>
    </div>
  );
};

export default Quiz;