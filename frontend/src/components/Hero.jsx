import React from 'react';
import { assets } from '../assets/assets.js';

const Hero = () => {
  return (
    <main className="hero-content">
      <h1 className="hero-title">
        <span className="title-line1">Smart Recycling for a</span><br />
        <span className="title-line2">CLEANER <span className="text-green">FUTURE</span></span>
      </h1>
      
      <p className="hero-subtitle">
        Upload waste images and get instant AI-powered recycling guidance.
      </p>

      <div className="hero-actions">
        <button className="btn-primary">
          Scan Waste Now <img src={assets.arrowRight} alt="arrow" className="btn-icon" />
        </button>
        <button className="btn-secondary">
          Learn More <span className="btn-icon-circle">&gt;</span>
        </button>
      </div>

      <div className="hero-features">
        <div className="feature-item">
          <img src={assets.star} alt="star" className="star-icon" />
          <span>AI Detection</span>
        </div>
        <div className="feature-item">
          <img src={assets.star} alt="star" className="star-icon" />
          <span>Eco Guidance</span>
        </div>
        <div className="feature-item">
          <img src={assets.star} alt="star" className="star-icon" />
          <span>Real-time Analysis</span>
        </div>
      </div>
    </main>
  );
};

export default Hero;
