import React from 'react';
import { assets } from '../assets/assets.js';

const Footer = () => {
  return (
    <footer className="bg-[#051a0e] text-gray-300 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        
        {/* Branch 1: Logo & Vision */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
             <img src={assets.logo2} alt="SmartRecycle Logo" className="h-[46px] object-contain" />
          </div>
          <p className="font-[Inter] text-sm leading-loose text-gray-400 mt-2">
            Empowering sustainable habits through AI-driven waste recognition. Join us in making the world a cleaner, greener place.
          </p>
          <div className="flex gap-4 mt-2">
             {/* Twitter Icon */}
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#2bd873] hover:text-[#0b5126] flex items-center justify-center transition-all duration-300 text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
             </a>
             {/* Instagram Icon */}
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#2bd873] hover:text-[#0b5126] flex items-center justify-center transition-all duration-300 text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
             </a>
             {/* Facebook Icon */}
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#2bd873] hover:text-[#0b5126] flex items-center justify-center transition-all duration-300 text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
             </a>
          </div>
        </div>

        {/* Branch 2: Quick Links */}
        <div className="flex flex-col gap-6 lg:ml-12">
           <h3 className="text-xl font-bold text-white font-[Outfit]">Quick Links</h3>
           <ul className="space-y-4 font-[Inter] text-gray-400 text-sm">
             <li><a href="#" className="hover:text-[#2bd873] hover:translate-x-2 transition-all duration-300 inline-block">Home</a></li>
             <li><a href="#" className="hover:text-[#2bd873] hover:translate-x-2 transition-all duration-300 inline-block">Our Service</a></li>
             <li><a href="#" className="hover:text-[#2bd873] hover:translate-x-2 transition-all duration-300 inline-block">About Us</a></li>
             <li><a href="#" className="hover:text-[#2bd873] hover:translate-x-2 transition-all duration-300 inline-block">Contact Us</a></li>
           </ul>
        </div>

        {/* Branch 3: Legal */}
        <div className="flex flex-col gap-6">
           <h3 className="text-xl font-bold text-white font-[Outfit]">Legal</h3>
           <ul className="space-y-4 font-[Inter] text-gray-400 text-sm">
             <li><a href="#" className="hover:text-[#2bd873] hover:translate-x-2 transition-all duration-300 inline-block">Privacy Policy</a></li>
             <li><a href="#" className="hover:text-[#2bd873] hover:translate-x-2 transition-all duration-300 inline-block">Terms of Service</a></li>
             <li><a href="#" className="hover:text-[#2bd873] hover:translate-x-2 transition-all duration-300 inline-block">Cookie Policy</a></li>
           </ul>
        </div>

        {/* Branch 4: Contact Us */}
        <div className="flex flex-col gap-6">
           <h3 className="text-xl font-bold text-white font-[Outfit]">Contact Us</h3>
           <ul className="space-y-5 font-[Inter] text-gray-400 text-sm">
             <li className="flex items-start gap-4 group">
               <div className="bg-white/5 p-3 rounded-full group-hover:bg-[#2bd873] transition-colors duration-300 text-gray-300 group-hover:text-[#0b5126]">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
               </div>
               <div className="flex flex-col justify-center mt-1">
                  <span className="block text-white font-medium mb-1">Email Support</span>
                  <a href="mailto:ayoub@example.com" className="hover:text-[#2bd873] transition-colors duration-300">ayoub@example.com</a>
               </div>
             </li>
             <li className="flex items-start gap-4 group">
               <div className="bg-white/5 p-3 rounded-full group-hover:bg-[#2bd873] transition-colors duration-300 text-gray-300 group-hover:text-[#0b5126]">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
               </div>
               <div className="flex flex-col justify-center mt-1">
                  <span className="block text-white font-medium mb-1">Phone Number</span>
                  <span className="hover:text-[#2bd873] transition-colors duration-300 cursor-pointer">+1 (555) 123-4567</span>
               </div>
             </li>
           </ul>
        </div>
        
      </div>

      {/* Copyright Bar */}
      <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 font-[Inter] text-[13px]">
          &copy; {new Date().getFullYear()} SmartRecycle. All rights reserved.
        </p>
        <p className="text-gray-500 font-[Inter] text-[13px] flex items-center gap-2">
          Designed with <span className="text-[#2bd873] text-lg leading-none">&hearts;</span> by Ayoub
        </p>
      </div>
    </footer>
  );
};

export default Footer;
