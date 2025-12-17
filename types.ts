
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  quizType: 'Stress' | 'Anxiety' | 'Mood';
  score: number;
  maxScore: number;
  date: string;
  feedback: string;
  suggestions?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum QuizType {
  STRESS = 'Stress',
  ANXIETY = 'Anxiety',
  MOOD = 'Mood'
}

export interface Question {
  id: number;
  text: string;
  options: { value: number; label: string }[];
}

export interface QuizData {
  title: string;
  description: string;
  questions: Question[];
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  image: string;
  availability: string;
  experience: string;
}
