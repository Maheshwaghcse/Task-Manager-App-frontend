# Task Manager Application

A full-stack, responsive Task Manager app with user authentication and a Kanban-style dashboard to track tasks across three stages: Todo, In Progress, and Done.

## Features
- **User Authentication**: Secure Login & Registration using JSON Web Tokens (JWT) and bcrypt password hashing.
- **Task Management**: Create, Read, Update, and Delete tasks. 
- **Kanban Stages**: Organize tasks by stage (Todo, In Progress, Done).
- **Modern UI**: Designed with Tailwind CSS featuring a clean, responsive layout, loading animations, and robust error handling.
- **RESTful API**: Custom backend built with Node.js and Express, backed by MongoDB.

## Technical Decisions & Assumptions
1. **Frontend Framework (React + Vite)**: Chosen for rapid development, fast HMR, and a robust ecosystem.
2. **Styling (Tailwind CSS)**: Used to quickly build a "WOW" factor UI with built-in dark mode support, modern typography, and utility classes that keep the bundle size small.
3. **State Management**: Instead of heavy libraries like Redux, local React state (`useState`, `useEffect`) combined with optimistic-like updates (via API callbacks) was used since the app scope is focused.
4. **Database (MongoDB/Mongoose)**: A NoSQL database fits the flexible nature of tasks perfectly. Mongoose provides a straightforward schema validation layer.
5. **Authentication**: Implemented stateless JWT auth to simplify backend horizontal scaling, avoiding session management overhead.

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas connection string)

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
node server.js
# Runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
# Runs on http://localhost:5173
```

## Deployment Guidelines
- **Frontend**: Can be easily deployed on Vercel, Netlify, or Render as a static Vite build (`npm run build`).
- **Backend**: Can be hosted on Render, Railway, or Heroku. Ensure you add `MONGO_URI` and `JWT_SECRET` to the environment variables on the hosting platform.

## Author
Developed for the Intern Assignment.
