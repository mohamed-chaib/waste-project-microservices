import React from 'react';
import { assets } from '../assets/assets.js';

const HowItWorks = () => {
  return (
    <section className="relative z-20 pb-24 px-6 md:px-12 lg:px-24 bg-transparent flex justify-center -mt-24">
      <div className="max-w-[1200px] w-full bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-12 md:p-16 lg:p-20 relative overflow-hidden backdrop-blur-xl">
        
        {/* Subtle background glow for vibrancy */}
        <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-[#2bd873] opacity-[0.08] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-16 md:mb-24 relative z-10">
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-extrabold text-[#111] font-[Outfit] italic tracking-tight leading-none mb-6">
            HOW IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2bd873] to-[#0b5126]">WORKS</span>
          </h2>
          <p className="text-gray-500 font-[Inter] text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Three simple steps to transform your daily waste into a massive sustainable impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
          
          {/* Internal Connecting Line Behind Icons (Desktop Only) */}
          <div className="hidden md:block absolute top-[48px] left-[15%] w-[70%] h-[3px] bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>

          {/* Step 1 */}
          <div className="group flex flex-col items-center text-center">
            {/* Animated Icon Container */}
            <div className="w-[100px] h-[100px] rounded-[1.5rem] bg-white flex items-center justify-center mb-10 border-2 border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] group-hover:-translate-y-3 transition-all duration-300 group-hover:border-[#2bd873]/50 group-hover:shadow-[0_20px_40px_rgba(43,216,115,0.25)] relative">
               <div className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[#111] text-white flex items-center justify-center font-black text-lg font-[Outfit] border-[4px] border-white shadow-sm z-10 group-hover:bg-[#2bd873] transition-colors duration-300">1</div>
               <img src={assets.cloudComputing} alt="Upload" className="w-[44px] h-[44px] object-contain filter group-hover:scale-110 transition-transform duration-300 brightness-0 opacity-80" />
            </div>
            
            <h3 className="text-[1.35rem] font-bold text-[#111] mb-5 font-[Outfit] leading-snug">
              Upload Your<br/>Image Here
            </h3>
            <p className="text-gray-500 font-[Inter] text-[15px] leading-relaxed max-w-[260px] mx-auto mb-8">
              Take a clear picture of the item you want to recycle and upload it directly to our system.
            </p>
            
            {/* Beautiful hover-animated Upload button */}
            <button className="flex items-center gap-3 bg-[#111] hover:bg-[#2bd873] text-white hover:text-[#0b5126] transition-all duration-500 px-6 py-3 rounded-full font-[Inter] font-bold text-[13px] tracking-wide shadow-md hover:shadow-lg mt-auto overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-2">
                UPLOAD <svg className="w-[18px] h-[18px] transform group-hover:translate-y-[-2px] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              </span>
            </button>
          </div>

          {/* Step 2 */}
          <div className="group flex flex-col items-center text-center">
            <div className="w-[100px] h-[100px] rounded-[1.5rem] bg-white flex items-center justify-center mb-10 border-2 border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] group-hover:-translate-y-3 transition-all duration-300 group-hover:border-[#2bd873]/50 group-hover:shadow-[0_20px_40px_rgba(43,216,115,0.25)] relative">
               <div className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[#111] text-white flex items-center justify-center font-black text-lg font-[Outfit] border-[4px] border-white shadow-sm z-10 group-hover:bg-[#2bd873] transition-colors duration-300">2</div>
               <img src={assets.roboAdvisor} alt="AI Processing" className="w-[44px] h-[44px] object-contain filter group-hover:scale-110 transition-transform duration-300 brightness-0 opacity-80" />
            </div>
            <h3 className="text-[1.35rem] font-bold text-[#111] mb-5 font-[Outfit] leading-snug">
              AI Image<br/>Processing
            </h3>
            <p className="text-gray-500 font-[Inter] text-[15px] leading-relaxed max-w-[260px] mx-auto mt-auto">
              Our advanced machine learning models instantly analyze your image to determine its exact core material.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group flex flex-col items-center text-center">
            <div className="w-[100px] h-[100px] rounded-[1.5rem] bg-white flex items-center justify-center mb-10 border-2 border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] group-hover:-translate-y-3 transition-all duration-300 group-hover:border-[#2bd873]/50 group-hover:shadow-[0_20px_40px_rgba(43,216,115,0.25)] relative">
               <div className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[#111] text-white flex items-center justify-center font-black text-lg font-[Outfit] border-[4px] border-white shadow-sm z-10 group-hover:bg-[#2bd873] transition-colors duration-300">3</div>
               <img src={assets.wasteBin} alt="Recycling Type" className="w-[44px] h-[44px] object-contain filter group-hover:scale-110 transition-transform duration-300 brightness-0 opacity-80" />
            </div>
            <h3 className="text-[1.35rem] font-bold text-[#111] mb-5 font-[Outfit] leading-snug">
              Type of<br/>Recycling
            </h3>
            <p className="text-gray-500 font-[Inter] text-[15px] leading-relaxed max-w-[260px] mx-auto mt-auto">
              Receive precise, actionable instructions on which bin to use and how to prepare it properly for collection.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
