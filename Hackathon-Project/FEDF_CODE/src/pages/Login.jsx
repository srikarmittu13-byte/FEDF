/**
 * @file Login.jsx
 * @description Secure student credential checking gate.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Fluid card centered with absolute layout alignment on a high contrast gradient backing.
 * - Semantic `<form>` accessibility with keyboard navigation triggers and field labels.
 * - Clear immediate validation banner feedback upon missing or erroneous credential submits.
 * 
 * JavaScript Engineering (CO2) Concepts:
 * - Direct mapping from input triggers to single state objects via dynamic key handlers.
 * - Async integration connecting immediately to the `apiService` object with try/catch frames.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ShieldAlert, GraduationCap, ArrowLeft } from 'lucide-react';
import { apiService } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  // Unified form status state (CO2: Compact form representation)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Connect to unified storage service (CO2: Async Promise resolver)
      const res = await apiService.loginUser(formData.email, formData.password);
      if (res.success) {
        onLoginSuccess(res.user);
        navigate('/apply');
      }
    } catch (err) {
      setError(err.message || 'Verification failure. Please audit your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-white relative overflow-hidden">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-100 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Back Link to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </Link>

        {/* Portal Branding Emblem */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-6 h-6 animate-bounce" />
          </div>
          <h2 className="font-sans text-2xl font-black text-gray-900 tracking-tight">
            Sign In to Your Workspace
          </h2>
          <p className="text-xs text-gray-400 font-medium">
            Monitor verification steps and secure your course seat.
          </p>
        </div>

      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-md py-8 px-6 sm:px-10 border border-blue-100/60 shadow-xl shadow-blue-900/5 rounded-3xl">
          
          {/* Immediate validation error banners (CO1 User feedback) */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-left text-rose-800 text-xs font-medium animate-fade-in transition-all">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold uppercase tracking-wider text-[10px]">Verification Failure</h4>
                <p className="mt-1 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {/* Quick Demo Credentials Autofill option */}
          <div className="mb-6 p-4 bg-blue-50/65 border border-blue-100/50 rounded-2xl text-left text-xs text-blue-900 font-medium">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="font-bold text-blue-700 tracking-wide uppercase text-[10px]">Testing Credentials</span>
            </div>
            <div className="flex justify-between items-center bg-white/70 rounded-xl p-3 border border-blue-50 shadow-inner">
              <div className="space-y-1 text-[11px] text-gray-600 font-mono">
                <div>Email: <span className="font-bold text-gray-950">demo@university.edu</span></div>
                <div>Pass: <span className="font-bold text-gray-950">password123</span></div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ email: 'demo@university.edu', password: 'password123' })}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
          </div>

          {/* Core Input controls Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Registered Email address */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="login-email" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Student Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@university.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-medium rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Account authentication Password */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between items-center">
                <label htmlFor="login-password" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-medium rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Remember active preference toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-gray-600 cursor-pointer">
                  Remember my session
                </label>
              </div>
            </div>

            {/* Trigger Submission Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/10 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Verifying session...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4.5 h-4.5" />
                    <span>Access My Portal</span>
                  </div>
                )}
              </button>
            </div>

          </form>

          {/* Navigation link to registration */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 font-medium">
              Don't have an application account?{' '}
              <Link to="/register" className="text-blue-600 font-bold hover:underline">
                Create Workspace
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
