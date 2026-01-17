import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function ProfileCard({ fullName, email }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div
        className="relative group w-full mt-20 max-w-lg md:max-w-xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -inset-2 bg-black rounded-2xl blur-sm opacity-0 group-hover:opacity-5 transition-all duration-700"></div>

        <div className="relative bg-white border-2 border-black rounded-2xl shadow-lg overflow-hidden w-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.15), transparent)`,
            }}
          ></div>

          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-black opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-black opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>

          <div className="px-6 md:px-8 py-10 md:py-12 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>

            <div className="text-center mb-6 transform transition-all duration-500">
              <h2 
                className="text-3xl md:text-4xl font-bold text-black mb-3 tracking-tight leading-tight transition-all duration-500 group-hover:tracking-wide"
                style={{ 
                  fontFamily: 'RL Madena, serif',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                {fullName.split('').map((char, index) => (
                  <span
                    key={index}
                    className="inline-block transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                    style={{ transitionDelay: `${index * 20}ms` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h2>
              <div 
                className="h-px mx-auto bg-black transition-all duration-700 ease-out"
                style={{ 
                  width: isHovered ? '80px' : '40px',
                  opacity: isHovered ? 0.5 : 0.3
                }}
              ></div>
            </div>

            <div className="flex items-center justify-center gap-3 text-gray-600 text-sm group/info transition-all duration-500 cursor-pointer hover:gap-4 break-words text-center">
              <Mail 
                size={16} 
                className="text-gray-500 group-hover/info:text-black transition-all duration-500 group-hover/info:scale-125 group-hover/info:rotate-12" 
              />
              <span 
                className="group-hover/info:text-black transition-all duration-300 break-words"
                style={{ fontFamily: 'RL Madena, serif' }}
              >
                {email}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
          </div>

          <div className="absolute inset-0 border-2 border-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"></div>
        </div>
      </div>
    </div>
  );
}