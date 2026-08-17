# ResumAI — AI ATS Resume Checker & Career Copilot

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-GitHub_Pages-4f46e5?style=for-the-badge)](https://PativalaDhruvik.github.io/Resume-checker/)
[![Backend](https://img.shields.io/badge/⚡_API-Render.com-00B4D8?style=for-the-badge)](https://render.com)
[![Deploy](https://github.com/PativalaDhruvik/Resume-checker/actions/workflows/deploy.yml/badge.svg)](https://github.com/PativalaDhruvik/Resume-checker/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A hyper-modern, full-stack AI-powered SaaS for resume analysis, ATS scoring, keyword gap analysis & Gemini AI bullet optimization.**

[🚀 Live Demo](https://PativalaDhruvik.github.io/Resume-checker/) · [📡 API Health](https://resumai-api.onrender.com/api/health) · [🐛 Report Bug](https://github.com/PativalaDhruvik/Resume-checker/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **AI ATS Resume Scorer** | 4-pillar scoring — Formatting, Keywords, Impact, Clarity |
| 🔍 **Keyword Gap Analyzer** | Matched vs Missing skill pills with job description comparison |
| ⚡ **Gemini Bullet Optimizer** | Side-by-side AI-powered bullet point rewrites |
| 🔐 **Auth System** | JWT login/signup with 5 free credits per user |
| 💳 **3-Tier Pricing** | Basic ($9), Standard ($19), Premium ($39) plans |
| 📊 **Audit History** | Full MongoDB-backed analysis history per user |

---

## 🚀 Tech Stack

**Frontend** (`client/`) — Deployed on GitHub Pages
- React 18 + Vite + Tailwind CSS
- Lucide Icons · Axios

**Backend** (`server/`) — Deployed on Render.com
- Node.js + Express.js
- MongoDB + Mongoose (MongoDB Atlas)
- JWT Authentication (bcryptjs)
- Google Gemini 2.5 Flash API
- Multer (PDF/DOCX upload)

---

## 🛠️ Run Locally

### 1. Clone
```bash
git clone https://github.com/PativalaDhruvik/Resume-checker.git
cd Resume-checker
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Configure Environment
Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume_checker
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. Start Dev Server
```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/health

---

## ☁️ Deployment Guide

### Step 1 — MongoDB Atlas (Free Cloud Database)
1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free **M0** cluster → Create DB User → Whitelist IP `0.0.0.0/0`
3. Copy the connection string: `mongodb+srv://user:pass@cluster.mongodb.net/resume_checker`

### Step 2 — Deploy Backend to Render.com
1. Push this repo to GitHub (if not already)
2. Go to [render.com](https://render.com) → **New → Web Service** → Connect your GitHub repo
3. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add Environment Variables in Render dashboard:
   | Key | Value |
   |---|---|
   | `PORT` | `10000` |
   | `NODE_ENV` | `production` |
   | `MONGO_URI` | *(your Atlas connection string)* |
   | `JWT_SECRET` | *(any long random string)* |
   | `GEMINI_API_KEY` | *(your Google AI Studio key)* |
5. Click **Deploy** → copy the URL (e.g., `https://resumai-api.onrender.com`)

### Step 3 — Add GitHub Secret
In your repo → **Settings → Secrets and variables → Actions → New secret**:
- Name: `VITE_API_URL`
- Value: `https://resumai-api.onrender.com/api`

### Step 4 — Enable GitHub Pages
In your repo → **Settings → Pages**:
- Source: **GitHub Actions**

### Step 5 — Deploy Frontend
Push to `main` branch — GitHub Actions automatically builds and deploys to:
**https://PativalaDhruvik.github.io/Resume-checker/**

---

## 📁 Project Structure

```
Resume-checker/
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions CI/CD → GitHub Pages
├── client/                  # React + Vite frontend
│   └── src/
│       ├── components/      # UI components
│       ├── context/         # AuthContext, AnalysisContext
│       ├── pages/           # Dashboard, Login, Signup, Pricing, History
│       └── services/        # Express API client (axios)
├── server/                  # Express.js backend
│   ├── config/              # MongoDB connection
│   ├── controllers/         # Auth, Analyze, History controllers
│   ├── middleware/          # JWT auth, Multer upload
│   ├── models/              # User, ResumeAnalysis Mongoose models
│   ├── routes/              # Express API routes
│   └── services/            # Gemini AI + NLP parser
└── render.yaml              # Render.com one-click deploy config
```

---

## 📄 License

MIT License — Built by [Pativala Dhruvik](https://github.com/PativalaDhruvik)
