# Stress Meter – AI-Powered Mental Wellness Web App

**Stress Meter** is a modern, holistic mental wellness application designed to help users track their emotional health, receive AI-powered counseling, express themselves through art therapy, and connect with professional help. Built with React, TypeScript, and the Google Gemini API.

## 🌟 Features

### 1. Wellness Assessments & Smart Suggestions
*   **Multiple Quizzes:** comprehensive assessments for Stress, Anxiety, and Mood.
*   **Real-time Analysis:** Immediate scoring and visual feedback on your mental state.
*   **Tailored Recommendations:** Based on your quiz score, the app provides specific actionable advice (e.g., specific breathing exercises, music genres, or social activities) to improve your well-being immediately.

### 2. AI Counselor (Chatbot)
*   **Powered by Gemini Pro:** A compassionate, 24/7 AI assistant trained to provide supportive, non-judgmental guidance.
*   **Context Aware:** Capable of maintaining conversation flow to help users vent or find clarity.

### 3. Art Therapy
*   **Generative AI:** Users can upload images and use text prompts to transform them (e.g., "Make this landscape look calmer and more serene").
*   **Powered by Gemini Flash Image:** Fast and creative image manipulation for therapeutic expression.

### 4. Professional Connection
*   **Doctor Directory:** A curated list of mental health professionals.
*   **Booking System:** Simulation of appointment booking with verified specialists.

### 5. Dashboard & History
*   **Visual Trends:** interactive charts tracking wellness scores over time.
*   **Daily Tips:** value-added content to promote daily mindfulness.

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript, Vite
*   **Styling:** CSS3 (Custom properties), Lucide React (Icons)
*   **AI Integration:** Google GenAI SDK (`@google/genai`)
*   **Routing:** React Router DOM
*   **Visualization:** Recharts
*   **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/stress-meter.git
    cd stress-meter
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    *   Create a `.env` file in the root directory.
    *   Add your Google Gemini API key (see `.env` example below).

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The app will typically launch at `http://localhost:5173`.

## 🔑 Configuration (.env)

Create a file named `.env` in the root of your project and add your API key:

```env
API_KEY=your_actual_api_key_here
```

*Note: The application uses `vite.config.ts` to securely expose this specific variable to the client-side application.*

## ☁️ Deployment (Vercel)

When deploying to Vercel, the `.env` file is not uploaded. You must set the environment variable in the Vercel Dashboard.

1.  Go to your Project Settings on Vercel.
2.  Navigate to **Environment Variables**.
3.  Add a new variable:
    *   **Key:** `API_KEY`
    *   **Value:** `your_actual_google_gemini_api_key`
4.  Redeploy your application.

**Troubleshooting Deployment:**
If the Chatbot or Art Therapy features fail with "API Key is missing", ensure you have added the `API_KEY` exactly as shown above in the Vercel settings and redeployed (a simple rebuild is required for the variable to be embedded).

## 📂 Project Structure

```
/src
  ├── components/    # Reusable UI components (Navbar, Footer, etc.)
  ├── context/       # React Context for State Management (Auth)
  ├── pages/         # Main application views (Dashboard, Quiz, etc.)
  ├── services/      # API integration logic (Gemini AI)
  ├── constants.ts   # Static data (Mock doctors, Quiz questions)
  ├── types.ts       # TypeScript interfaces
  └── App.tsx        # Main application entry
```

## 🔒 Privacy & Security

*   **Data Isolation:** User data (in this demo version) is stored in the browser's `localStorage`.
*   **Mock Authentication:** The app uses a simulation for Login/Register for demonstration purposes.

## 📄 License

This project is open-source and available under the MIT License.
