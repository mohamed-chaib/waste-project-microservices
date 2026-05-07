import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { Mail, Lock, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8004/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid email or password.');
      }
      
      // Success: Save token and Navigate to Home
      localStorage.setItem('access_token', data.access);
      if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-container" style={{ backgroundImage: `url(${assets.background})` }}>
      <Navbar />

      {/* Main Login UI */}
      <div className="hero-content" style={{ paddingLeft: '0', alignItems: 'center' }}>
        <div className="relative w-full max-w-md">
          {/* Glowing Aura Effect behind panel */}
          <div className="absolute -inset-1 rounded-2xl blur-xl opacity-30" style={{ background: 'linear-gradient(45deg, #2bd873, #111, #2bd873)', animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>

          <div className="w-full p-8 rounded-2xl backdrop-blur-xl border border-white/30 shadow-2xl relative z-10" style={{ backgroundColor: 'rgba(20, 40, 25, 0.45)' }}>
            <div className="text-center mb-8">
            <h2 className="text-4xl font-bold italic text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Welcome Back</h2>
            <p className="text-white/80">Log in to manage your recycling journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl backdrop-blur-sm text-sm text-center">
                {error}
              </div>
            )}
            
            {new URLSearchParams(window.location.search).get('expired') && (
              <div className="bg-orange-500/20 border border-orange-500/50 text-orange-200 px-4 py-3 rounded-xl backdrop-blur-sm text-sm text-center">
                Your session has expired. Please login again.
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-300" />
              </div>
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ focusRingColor: '#2bd873' }}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-300" />
              </div>
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-white/80">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="font-medium hover:text-white transition-colors" style={{ color: '#2bd873' }}>
                Forgot password?
              </a>
            </div>

             <button
               type="submit"
               disabled={loading}
               className={`w-full py-3.5 rounded-xl font-bold text-lg italic transition-all flex justify-center items-center gap-2 mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
               style={{ backgroundColor: '#2bd873', color: '#0b5126', fontFamily: 'Outfit, sans-serif', boxShadow: '0 4px 15px rgba(43, 216, 115, 0.4)' }}
             >
               {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Log In Securely'}
             </button>
          </form>

          <div className="mt-6 text-center text-white/80">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold hover:text-white transition-colors" style={{ color: '#2bd873' }}>
              Register Now
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
