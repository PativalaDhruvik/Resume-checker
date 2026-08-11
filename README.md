# ResumAI - AI ATS Resume Checker & Career Copilot

A hyper-modern, full-stack AI-powered SaaS web application for resume analysis, ATS score checking, keyword gap analysis, and Gemini AI bullet point optimization.

## 🚀 Tech Stack

**Frontend (client/)**
- React 18 + Vite
- Tailwind CSS + shadcn/ui
- Lucide Icons

**Backend (server/)**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication (bcryptjs)
- Google Gemini 2.5 Flash API
- Multer (PDF/DOCX upload)

## ✨ Features

- 🎯 **AI ATS Resume Scorer** — 4-pillar scoring (Formatting, Keywords, Impact, Clarity)
- 🔍 **Keyword Gap Analyzer** — Matched vs Missing skill pills
- ⚡ **Gemini AI Bullet Optimizer** — Side-by-side bullet point rewrites
- 🔐 **Auth System** — Login / Signup with JWT + 5 free credits per user
- 💳 **3-Tier Pricing Plans** — Basic ($9), Standard ($19), Premium ($39)
- 📊 **Audit History** — MongoDB-backed analysis history

## 🛠️ Setup & Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/resume-checker.git
cd resume-checker
```

### 2. Install All Dependencies
```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 3. Configure Environment Variables
Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume_checker
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. Run the App
```bash
# From the root directory:
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/health

## 📁 Project Structure

```
Resume_Checker/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── components/      # UI components
│       ├── context/         # AuthContext, AnalysisContext
│       ├── pages/           # Dashboard, Login, Signup, Pricing, History
│       └── services/        # Express API client (axios)
└── server/                  # Express.js backend
    ├── config/              # MongoDB connection
    ├── controllers/         # Auth, Analyze, History controllers
    ├── middleware/          # JWT auth, Multer upload
    ├── models/              # User, ResumeAnalysis Mongoose models
    ├── routes/              # Express API routes
    └── services/            # Gemini AI + NLP parser
```

## 📄 License
MIT License — Built by Pativala Dhruvik
