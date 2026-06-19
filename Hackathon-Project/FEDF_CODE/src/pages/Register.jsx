/**
 * @file Register.jsx
 * @description Secure student workspace registration form.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Clean layout with distinct label structures.
 * - Dynamic feedback indicators confirming registration credentials eligibility.
 * 
 * JavaScript Engineering (CO2) Concepts:
 * - Simple checks matching registration parameters (checking password complexity and empty arrays).
 * - Automatic session generation on register completion via a unified auth adapter.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ShieldAlert, GraduationCap, ArrowLeft } from 'lucide-react';
import { apiService } from '../services/api';

export default function Register({ onRegisterSuccess }) {
  const navigate = useNavigate();

  // Registration data structure
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    // Quick field validations (CO2: Client side logical checks)
    if (formData.password !== formData.confirmPassword) {
      setError('Confirmation match failed. Your input passwords must match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password security parameters not met. Minimum 6 characters required.');
      return;
    }

    setLoading(true);

    try {
      // Connect to storage service layer (CO2: Async Promise resolver)
      const res = await apiService.registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (res.success) {
        onRegisterSuccess(res.user);
        navigate('/apply');
      }
    } catch (err) {
      setError(err.message || 'Registration failure. Workspace config failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-white relative overflow-hidden">
      
      {/* Visual backdrops */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Home Back Anchor Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </Link>

        {/* Brand Emblem */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-6 h-6 animate-bounce" />
          </div>
          <h2 className="font-sans text-2xl font-black text-gray-900 tracking-tight">
            Register Student Workspace
          </h2>
          <p className="text-xs text-gray-400 font-medium">
            Setup your portal credentials to apply and track verification status.
          </p>
        </div>

      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-md py-8 px-6 sm:px-10 border border-blue-100/60 shadow-xl shadow-blue-900/5 rounded-3xl">
          
          {/* Validation alerts banner */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-left text-rose-800 text-xs font-medium animate-fade-in transition-all">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold uppercase tracking-wider text-[10px]">Registration Alert</h4>
                <p className="mt-1 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Student Full Name */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="register-name" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Full Name (As in High School Transcript)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4.5 h-4.5" />
                </div>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-medium rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Account email address */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="register-email" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Student Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  required
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-medium rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Account access password */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="register-password" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Password (Min 6 Characters)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-medium rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Conform matching password */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="register-confirmPassword" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  id="register-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-medium rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Acceptance checkbox requirements */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="ml-2 block text-xs font-semibold text-gray-500 cursor-pointer">
                I hereby accept university admission criteria policies.
              </label>
            </div>

            {/* Submit application trigger */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/10 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Creating workspace...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4.5 h-4.5" />
                    <span>Create Workspace</span>
                  </div>
                )}
              </button>
            </div>

          </form>

          {/* Navigation link back to sign-in */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 font-medium">
              Already have an assessment account?{' '}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
