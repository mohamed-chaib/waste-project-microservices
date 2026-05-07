import React from 'react';
import { assets } from '../assets/assets.js';

const AboutUs = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white flex justify-center">
      <div className="max-w-[1200px] w-full flex flex-col lg:flex-row gap-16 items-center lg:items-center">
        
        {/* Left Side: Title and Image */}
        <div className="flex-1 w-full flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#111] mb-12 leading-[1.15] font-[Outfit] italic tracking-tight">
            Work Together to <br className="hidden md:block" /> Clean The World
          </h2>
          <div className="rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative group">
            {/* Soft overlay on hover for premium feel */}
            <div className="absolute inset-0 bg-[#2bd873]/0 group-hover:bg-[#2bd873]/10 transition-colors duration-500 z-10 pointer-events-none"></div>
            <img 
              src={assets.section2} 
              alt="People cleaning waste" 
              className="w-full h-auto object-cover max-h-[480px] hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Right Side: Information Box */}
        <div className="flex-1 w-full bg-[#f8fafc] rounded-3xl p-10 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100">
          <div className="relative pl-10 md:pl-12 border-l-2 border-dashed border-gray-300 space-y-14 py-4">
            
            {/* Item 1: Our Mission */}
            <div className="relative group">
              <div className="absolute -left-[57px] md:-left-[66px] top-0 bg-[#2bd873] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(43,216,115,0.4)] border-4 border-[#f8fafc] group-hover:scale-110 transition-transform duration-300 z-10">
                <img src={assets.mission} alt="Mission" className="w-5 h-5 md:w-6 md:h-6 object-contain filter brightness-0 invert" />
              </div>
              <h3 className="text-[1.65rem] font-bold text-[#111] mb-3 font-[Outfit] italic">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed font-[Inter] text-[15px]">
                Our mission is to promote responsible waste management by leveraging artificial intelligence to educate and assist individuals in making better recycling decisions. We aim to reduce environmental impact and contribute to a cleaner, more sustainable future.
              </p>
            </div>

            {/* Item 2: What We Do */}
            <div className="relative group">
              <div className="absolute -left-[57px] md:-left-[66px] top-0 bg-[#2bd873] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(43,216,115,0.4)] border-4 border-[#f8fafc] group-hover:scale-110 transition-transform duration-300 z-10">
                <img src={assets.clipboard} alt="What We Do" className="w-5 h-5 md:w-6 md:h-6 object-contain filter brightness-0 invert" />
              </div>
              <h3 className="text-[1.65rem] font-bold text-[#111] mb-3 font-[Outfit] italic">What We Do</h3>
              <p className="text-gray-600 leading-relaxed font-[Inter] text-[15px]">
                Using advanced image recognition technology, SmartRecycle identifies materials such as plastic, glass, and metal in real-time. Once detected, the system provides clear instructions on how to recycle or dispose of the item properly.
              </p>
            </div>

            {/* Item 3: Our Vision */}
            <div className="relative group">
              <div className="absolute -left-[57px] md:-left-[66px] top-0 bg-[#2bd873] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(43,216,115,0.4)] border-4 border-[#f8fafc] group-hover:scale-110 transition-transform duration-300 z-10">
                <img src={assets.sharedVision} alt="Our Vision" className="w-5 h-5 md:w-6 md:h-6 object-contain filter brightness-0 invert" />
              </div>
              <h3 className="text-[1.65rem] font-bold text-[#111] mb-3 font-[Outfit] italic">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed font-[Inter] text-[15px]">
                We envision a world where technology and sustainability work hand in hand. By empowering users with intelligent tools, we strive to create a global community that actively participates in protecting the environment.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
