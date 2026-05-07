import React from 'react';
import '../App.css';
import { assets } from '../assets/assets.js';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import AboutUs from '../components/AboutUs';
import WhyChooseUs from '../components/WhyChooseUs';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <div className="hero-container" style={{ backgroundImage: `url(${assets.background})` }}>
        <Navbar />
        <Hero />
      </div>
      <HowItWorks />
      <AboutUs />
      <WhyChooseUs />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
