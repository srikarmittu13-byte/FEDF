/**
 * @file App.jsx
 * @description Main Application component with Router navigation nodes and active student session state.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Fluid route grouping using standard `<main>` semantic containers.
 * - Single-source global state tree for session states driving client page rendering.
 * - Glassmorphic page alignments.
 * 
 * JavaScript Engineering (CO2) Concepts:
 * - Session verification in `useState` lazy initializer to avoid unnecessary reading cycles.
 * - State mutators (`onLoginSuccess`, `onLogout`) passed down natively via parameters.
 */

import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import services
import { apiService } from './services/api';

// Import layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Apply from './pages/Apply';

export default function App() {
  // Lazily retrieve session token from internal persistent storage (CO2 optimization)
  const [currentUser, setCurrentUser] = useState(() => {
    return apiService.getCurrentUser();
  });

  const handleLoginSuccess = (userSession) => {
    setCurrentUser(userSession);
  };

  const handleLogout = () => {
    apiService.logoutUser();
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
        
        {/* Dynamic Sticky Header (CO1 Section alignment) */}
        <Navbar currentUser={currentUser} onLogout={handleLogout} />

        {/* Core Layout Landmark (CO1 semantic structure markup) */}
        <main className="flex-1 mt-0">
          <Routes>
            {/* Landing page showing university portal catalog */}
            <Route path="/" element={<Home currentUser={currentUser} />} />

            {/* Portal security access routes */}
            <Route 
              path="/login" 
              element={
                !currentUser ? (
                  <Login onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <Navigate to="/apply" replace />
                )
              } 
            />
            
            <Route 
              path="/register" 
              element={
                !currentUser ? (
                  <Register onRegisterSuccess={handleLoginSuccess} />
                ) : (
                  <Navigate to="/apply" replace />
                )
              } 
            />

            {/* Active Student Dashboard forms page */}
            <Route 
              path="/apply" 
              element={
                currentUser ? (
                  <Apply currentUser={currentUser} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* General fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Informative footer navigation panel */}
        <Footer />

      </div>
    </Router>
  );
}
