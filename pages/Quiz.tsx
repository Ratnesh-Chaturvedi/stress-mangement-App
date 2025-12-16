import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { QUIZZES, APP_NAME } from '../constants';
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
    const maxScore = quizData.questions.length * 4; // Assuming max option value is 4 or 5, normalizing for display

    // Simple feedback logic
    let feedback = "You're doing great! Keep maintaining your balance.";
    if (totalScore > maxScore * 0.7) {
        feedback = "It seems you might be experiencing some high levels of stress/emotion. Consider talking to our AI assistant or a professional.";
    } else if (totalScore > maxScore * 0.4) {
        feedback = "You have moderate levels. Try some relaxation exercises.";
    }

    const newResult: QuizResult = {
      id: Date.now().toString(),
      userId: user.id,
      quizType: selectedQuiz,
      score: totalScore,
      maxScore: quizData.questions.reduce((acc, q) => acc + Math.max(...q.options.map(o => o.value)), 0),
      date: new Date().toISOString(),
      feedback
    };

    // Save to local storage
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.push(newResult);
    localStorage.setItem('quizHistory', JSON.stringify(history));

    setResult(newResult);
    setIsCompleted(true);
    toast.success('Quiz completed!');
  };

  if (!selectedQuiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Select an Assessment</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(QUIZZES).map(([type, data]) => (
            <div key={type} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-teal-600 mb-3">{data.title}</h2>
              <p className="text-slate-600 mb-6">{data.description}</p>
              <button
                onClick={() => handleStartQuiz(type as QuizType)}
                className="w-full bg-teal-50 text-teal-700 py-3 rounded-lg font-semibold hover:bg-teal-100 transition-colors"
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
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Results</h2>
          <p className="text-slate-500 mb-8">Here is your assessment summary</p>
          
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Your Score</p>
            <p className="text-5xl font-bold text-teal-600 mt-2">{result.score} <span className="text-xl text-slate-400">/ {result.maxScore}</span></p>
          </div>

          <div className="text-left bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">Suggestion</h3>
            <p className="text-blue-800">{result.feedback}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSelectedQuiz(null)}
              className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to Quizzes
            </button>
            <button
              onClick={() => navigate('/chatbot')}
              className="flex-1 px-4 py-3 bg-teal-600 rounded-lg font-medium text-white hover:bg-teal-700"
            >
              Talk to AI Assistant
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = QUIZZES[selectedQuiz].questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZZES[selectedQuiz].questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Question {currentQuestionIndex + 1} of {QUIZZES[selectedQuiz].questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div className="bg-teal-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-8 leading-relaxed">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.label}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50 transition-all group"
            >
              <span className="font-medium text-slate-700 group-hover:text-teal-700">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <button 
        onClick={() => setSelectedQuiz(null)}
        className="mt-6 text-slate-500 hover:text-slate-700 text-sm font-medium"
      >
        Cancel Assessment
      </button>
    </div>
  );
};

export default Quiz;
