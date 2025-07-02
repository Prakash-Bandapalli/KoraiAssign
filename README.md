# Korai Health - Lab Report Analyzer

This project is a full-stack web application built as a take-home assignment for Korai Health. It allows users to upload a medical lab report (image or PDF) and instantly see their health parameters extracted into a clean, interactive table, complete with AI-powered insights.

## 🚀 Live Demo

**Frontend:** https://korai-assign.vercel.app/

**Backend API:** https://koraiassign.onrender.com/

**Demo Credentials:**
- Username: `user`
- Password: `password`

## 📸 Application Preview

![Demo Video](https://github.com/user-attachments/assets/92d0e5c5-83a3-467e-a24e-91322d8cbe24)

*Watch the demo video showing the complete workflow from upload to results*

## ✅ Features

- **📄 Smooth File Upload**: User-friendly interface for uploading PDF or image-based lab reports
- **🧠 Dynamic Data Extraction**: Robust backend parser that intelligently identifies health parameters, values, units, and reference ranges without hardcoded dictionaries
- **📊 Interactive Data Table**: Clean, responsive table to display extracted results
- **✨ AI-Powered Insights (User-Triggered)**:
  - Click on any result to get AI-generated explanations
  - Automatic flagging of values as HIGH, LOW, or NORMAL
  - AI uses medical knowledge when reference ranges are missing
- **📈 Basic Trend Simulation**: Displays simple up/down trend indicators for key parameters compared to simulated past reports
- **🔒 Dummy Authentication**: Simple, secure login flow to simulate real user setup

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **OCR Engine**: Tesseract.js
- **AI Model**: Google Gemini Pro
- **File Handling**: Multer

### Frontend
- **Framework**: React (with Vite)
- **Styling**: Tailwind CSS
- **API Communication**: Axios

### Deployment
- **Backend**: Render (Web Service)
- **Frontend**: Vercel
- **Keep-Alive**: Custom self-pinging service for Render's free tier

## ⚙️ Local Setup & Installation

### Prerequisites
- Node.js (v18 or later)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create an environment file:
Create a `.env` file in the backend root and add your API key:
```env
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
```

4. Start the server:
```bash
npm start
```

The backend will be running at `http://localhost:5001`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create an environment file:
Create a `.env.local` file in the frontend root:
```env
VITE_BACKEND_API_URL="http://localhost:5001/api"
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`.

## 🔧 Key Technical Features

### Dynamic Text Extraction
- Uses Tesseract.js for OCR processing (no system installation required)
- Intelligent parsing engine that adapts to different lab report formats
- Extracts parameters, values, units, and reference ranges dynamically

### AI-Powered Analysis
- Integration with Google Gemini Pro for medical insights
- Batch processing to optimize API calls and avoid rate limiting
- Contextual analysis based on medical knowledge

### Responsive Design
- Mobile-friendly interface built with Tailwind CSS
- Interactive components with smooth user experience
- Real-time feedback and loading states

## 📝 How It Works

1. **Upload**: User uploads a lab report (PDF or image)
2. **Extract**: Backend processes the file using OCR
3. **Parse**: Dynamic parser identifies health parameters and values
4. **Display**: Results shown in clean, interactive table
5. **Analyze**: Optional AI insights available on-demand
6. **Trends**: Simulated historical data shows parameter trends

## 🌐 API Endpoints

- `POST /api/upload` - Upload and process lab report
- `POST /api/insights` - Get AI analysis for specific parameters

## 🔒 Security Features

- Environment variable management for API keys
- File type validation and size limits  
- Input sanitization and error handling
- CORS configuration for secure cross-origin requests
