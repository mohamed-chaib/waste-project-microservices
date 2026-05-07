import React from 'react';
import { assets } from '../assets/assets.js';

const CallToAction = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white flex justify-center">
      <div className="max-w-[1200px] w-full">
        <div className="flex flex-col lg:flex-row bg-gradient-to-br from-[#0c4021] via-[#10562e] to-[#0a2e16] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(11,81,38,0.25)] border border-[#1b8a47]/20">
          
          {/* Left Side: Image with Motion */}
          <div className="lg:w-1/2 w-full h-[450px] lg:h-auto relative overflow-hidden group">
             {/* Subtle slow zoom in on the image */}
             <img 
               src={assets.background2} 
               alt="Smart Recycling Utility Worker" 
               className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2000ms] ease-out brightness-95 group-hover:brightness-100"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Right Side: Content securely aligned */}
          <div className="lg:w-1/2 w-full p-12 md:p-16 lg:p-20 flex flex-col justify-center relative">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#2bd873] opacity-5 filter blur-[100px] rounded-full pointer-events-none"></div>
             
             <h2 className="text-4xl md:text-[2.75rem] font-extrabold text-white mb-6 font-[Outfit] italic tracking-tight leading-tight relative z-10">
               Try Smart <span className="text-[#2bd873]">Recycling</span>
             </h2>
             
             <p className="text-gray-200 leading-relaxed font-[Inter] text-[17px] mb-10 font-light relative z-10">
               Upload an image of your waste item and let our AI instantly identify the material and guide you on how to recycle it properly.
             </p>

             <div className="w-full h-[1px] bg-white/10 mb-8"></div>

             <h3 className="text-[1.35rem] font-bold text-white mb-6 font-[Outfit] relative z-10">
               How it works here:
             </h3>
             
             <ul className="space-y-5 mb-12 relative z-10">
               <li className="flex items-center text-gray-200 font-[Inter] text-[16px] gap-4">
                 <div className="bg-[#2bd873]/20 p-[6px] rounded-full flex-shrink-0 shadow-[0_0_10px_rgba(43,216,115,0.2)]">
                    <svg className="w-[18px] h-[18px] text-[#2bd873]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                 </div>
                 Select or drag and drop an image
               </li>
               <li className="flex items-center text-gray-200 font-[Inter] text-[16px] gap-4">
                 <div className="bg-[#2bd873]/20 p-[6px] rounded-full flex-shrink-0 shadow-[0_0_10px_rgba(43,216,115,0.2)]">
                    <svg className="w-[18px] h-[18px] text-[#2bd873]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                 </div>
                 Our AI analyzes it in seconds
               </li>
               <li className="flex items-start text-gray-200 font-[Inter] text-[16px] gap-4">
                 <div className="bg-[#2bd873]/20 p-[6px] rounded-full flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(43,216,115,0.2)]">
                    <svg className="w-[18px] h-[18px] text-[#2bd873]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                 </div>
                 Get instant classification and recycling instructions
               </li>
             </ul>

             {/* Call to action button with arrow sliding motion on hover */}
             <button className="self-start relative group inline-flex items-center justify-center bg-transparent text-white border-2 border-[#2bd873] hover:bg-[#2bd873] hover:text-[#0b5126] hover:border-transparent font-[Outfit] font-bold text-lg px-9 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(43,216,115,0.15)] hover:shadow-[0_0_35px_rgba(43,216,115,0.4)] z-10">
               <span className="flex items-center gap-3">
                 Start Trying Now
                 <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
               </span>
             </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
