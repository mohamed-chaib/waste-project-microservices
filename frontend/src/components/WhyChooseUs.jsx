import React from 'react';
import { assets } from '../assets/assets.js';

const WhyChooseUs = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white flex justify-center">
      <div className="max-w-[1200px] w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111] mb-16 font-[Outfit] italic tracking-tight">
          Why Choose SmartRecycle?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="relative bg-[#faf7f7] rounded-[24px] p-10 shadow-sm border border-gray-50 overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(43,216,115,0.15)] hover:border-[#2bd873]/50">
            {/* Background Number */}
            <div className="absolute top-2 right-6 text-[10rem] font-bold text-[#e5dbdb]/60 leading-none group-hover:text-[#2bd873]/10 transition-colors duration-500 select-none font-[Inter]">
              1
            </div>
            
            <div className="relative z-10 space-y-8 h-full flex flex-col justify-end">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <img src={assets.microchip} alt="AI" className="w-8 h-8 object-contain" />
              </div>
              <p className="text-gray-700 leading-relaxed font-[Inter] text-[15px] font-medium pt-8">
                Our system uses advanced machine learning models to accurately identify different types of waste such as plastic, glass, and metal. Simply upload an image and get instant results.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-[#faf7f7] rounded-[24px] p-10 shadow-sm border border-gray-50 overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(43,216,115,0.15)] hover:border-[#2bd873]/50">
            <div className="absolute top-2 right-6 text-[10rem] font-bold text-[#e5dbdb]/60 leading-none group-hover:text-[#2bd873]/10 transition-colors duration-500 select-none font-[Inter]">
              2
            </div>
            
            <div className="relative z-10 space-y-8 h-full flex flex-col justify-end">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <img src={assets.recycleSign} alt="Recycle" className="w-8 h-8 object-contain" />
              </div>
              <p className="text-gray-700 leading-relaxed font-[Inter] text-[15px] font-medium pt-8">
                Beyond detection, we provide clear instructions on how to properly recycle or dispose of each item, promoting sustainable habits.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-[#faf7f7] rounded-[24px] p-10 shadow-sm border border-gray-50 overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(43,216,115,0.15)] hover:border-[#2bd873]/50">
            <div className="absolute top-2 right-6 text-[10rem] font-bold text-[#e5dbdb]/60 leading-none group-hover:text-[#2bd873]/10 transition-colors duration-500 select-none font-[Inter]">
              3
            </div>
            
            <div className="relative z-10 space-y-8 h-full flex flex-col justify-end">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <img src={assets.realTime} alt="Real Time" className="w-8 h-8 object-contain" />
              </div>
              <p className="text-gray-700 leading-relaxed font-[Inter] text-[15px] font-medium pt-8">
                Get immediate feedback on your uploads. Our highly optimized system delivers real-time analytics to make your recycling process fast and efficient.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
