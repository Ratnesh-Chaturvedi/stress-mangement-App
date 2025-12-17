import { QuizData, QuizType, Doctor } from './types';

export const APP_NAME = "Stress Meter";

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Dr. Emily Stone",
    specialty: "Clinical Psychologist",
    location: "Downtown Wellness Center",
    rating: 4.9,
    experience: "12 years",
    availability: "Available Today",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialty: "Psychiatrist",
    location: "City Health Hospital",
    rating: 4.8,
    experience: "15 years",
    availability: "Next Available: Tomorrow",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Sarah Jenkins, LMFT",
    specialty: "Therapist & Counselor",
    location: "Serenity Clinic",
    rating: 4.7,
    experience: "8 years",
    availability: "Available Today",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    specialty: "Behavioral Therapist",
    location: "Online / Remote",
    rating: 4.9,
    experience: "10 years",
    availability: "Available Now",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2064&auto=format&fit=crop"
  }
];

export const QUIZZES: Record<string, QuizData> = {
  [QuizType.STRESS]: {
    title: "Stress Assessment",
    description: "Evaluate your current stress levels based on your feelings over the last month. (Higher score indicates higher stress)",
    questions: [
      {
        id: 1,
        text: "In the last month, how often have you felt that you were unable to control the important things in your life?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Almost Never" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Fairly Often" },
          { value: 4, label: "Very Often" }
        ]
      },
      {
        id: 2,
        text: "In the last month, how often have you felt confident about your ability to handle your personal problems?",
        options: [
          { value: 4, label: "Never" },
          { value: 3, label: "Almost Never" },
          { value: 2, label: "Sometimes" },
          { value: 1, label: "Fairly Often" },
          { value: 0, label: "Very Often" }
        ]
      },
      {
        id: 3,
        text: "In the last month, how often have you felt that things were going your way?",
        options: [
          { value: 4, label: "Never" },
          { value: 3, label: "Almost Never" },
          { value: 2, label: "Sometimes" },
          { value: 1, label: "Fairly Often" },
          { value: 0, label: "Very Often" }
        ]
      },
      {
        id: 4,
        text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Almost Never" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Fairly Often" },
          { value: 4, label: "Very Often" }
        ]
      },
      {
        id: 5,
        text: "In the last month, how often have you found yourself thinking about things that you have to accomplish?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Almost Never" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Fairly Often" },
          { value: 4, label: "Very Often" }
        ]
      },
      {
        id: 6,
        text: "In the last month, how often have you been able to control irritations in your life?",
        options: [
          { value: 4, label: "Never" },
          { value: 3, label: "Almost Never" },
          { value: 2, label: "Sometimes" },
          { value: 1, label: "Fairly Often" },
          { value: 0, label: "Very Often" }
        ]
      },
      {
        id: 7,
        text: "In the last month, how often have you felt that you were on top of things?",
        options: [
          { value: 4, label: "Never" },
          { value: 3, label: "Almost Never" },
          { value: 2, label: "Sometimes" },
          { value: 1, label: "Fairly Often" },
          { value: 0, label: "Very Often" }
        ]
      },
      {
        id: 8,
        text: "In the last month, how often have you been angered because of things that were outside of your control?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Almost Never" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Fairly Often" },
          { value: 4, label: "Very Often" }
        ]
      },
      {
        id: 9,
        text: "In the last month, how often have you felt nervous and 'stressed'?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Almost Never" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Fairly Often" },
          { value: 4, label: "Very Often" }
        ]
      },
      {
        id: 10,
        text: "In the last month, how often have you felt that you could not cope with all the things that you had to do?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Almost Never" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Fairly Often" },
          { value: 4, label: "Very Often" }
        ]
      }
    ]
  },
  [QuizType.MOOD]: {
    title: "Mood Tracker",
    description: "Check in with your emotional state today. (Higher score indicates better mood)",
    questions: [
      {
        id: 1,
        text: "How would you rate your overall energy level today?",
        options: [
          { value: 1, label: "Very Low" },
          { value: 2, label: "Low" },
          { value: 3, label: "Moderate" },
          { value: 4, label: "High" },
          { value: 5, label: "Very High" }
        ]
      },
      {
        id: 2,
        text: "How much interest or pleasure have you had in doing things today?",
        options: [
          { value: 1, label: "None at all" },
          { value: 2, label: "A little" },
          { value: 3, label: "Moderate" },
          { value: 4, label: "A lot" },
          { value: 5, label: "Extreme" }
        ]
      },
      {
        id: 3,
        text: "How are you feeling about the future right now?",
        options: [
          { value: 1, label: "Pessimistic" },
          { value: 2, label: "Worried" },
          { value: 3, label: "Neutral" },
          { value: 4, label: "Hopeful" },
          { value: 5, label: "Excited" }
        ]
      },
      {
        id: 4,
        text: "How often have you felt down, depressed, or hopeless recently?",
        options: [
          { value: 1, label: "All the time" },
          { value: 2, label: "Often" },
          { value: 3, label: "Sometimes" },
          { value: 4, label: "Rarely" },
          { value: 5, label: "Not at all" }
        ]
      },
      {
        id: 5,
        text: "How would you rate your quality of sleep last night?",
        options: [
          { value: 1, label: "Very Poor" },
          { value: 2, label: "Poor" },
          { value: 3, label: "Average" },
          { value: 4, label: "Good" },
          { value: 5, label: "Excellent" }
        ]
      },
      {
        id: 6,
        text: "How easily have you been able to concentrate on things like reading or work?",
        options: [
          { value: 1, label: "Not at all" },
          { value: 2, label: "With difficulty" },
          { value: 3, label: "Somewhat" },
          { value: 4, label: "Reasonably well" },
          { value: 5, label: "Very easily" }
        ]
      },
      {
        id: 7,
        text: "How much have you been enjoying the company of others?",
        options: [
          { value: 1, label: "Not at all" },
          { value: 2, label: "A little" },
          { value: 3, label: "Moderately" },
          { value: 4, label: "Quite a bit" },
          { value: 5, label: "A lot" }
        ]
      },
      {
        id: 8,
        text: "How do you feel about your self-image today?",
        options: [
          { value: 1, label: "Very Negative" },
          { value: 2, label: "Negative" },
          { value: 3, label: "Neutral" },
          { value: 4, label: "Positive" },
          { value: 5, label: "Very Positive" }
        ]
      },
      {
        id: 9,
        text: "How calm and relaxed do you feel right now?",
        options: [
          { value: 1, label: "Not at all" },
          { value: 2, label: "Slightly" },
          { value: 3, label: "Moderately" },
          { value: 4, label: "Very" },
          { value: 5, label: "Extremely" }
        ]
      },
      {
        id: 10,
        text: "How well are you able to laugh and see the funny side of things today?",
        options: [
          { value: 1, label: "Not at all" },
          { value: 2, label: "Rarely" },
          { value: 3, label: "Sometimes" },
          { value: 4, label: "Often" },
          { value: 5, label: "As much as usual" }
        ]
      }
    ]
  }
};
