import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function NoteCard({ 
  title = "My Thoughts", 
  content = "This is a beautiful note with some content that wraps nicely...",
  onDelete,
  onEdit,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="min-h-3/12 max-w-full bg-white flex items-center justify-center p-4">
      <div
        className="relative group w-full max-w-sm h-64"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle shadow effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-purple-200 to-violet-200 rounded-md opacity-20 blur-sm"></div>

        {/* Main note card */}
        <div 
          className="relative bg-gradient-to-br from-purple-50 to-violet-50 rounded-sm shadow-lg transform transition-all duration-500 hover:scale-105 overflow-hidden h-full"
          style={{
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
          }}
        >
          {/* Spotlight effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.3), transparent)`,
            }}
          ></div>

          {/* Lined paper effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-30"
                style={{ marginTop: i === 0 ? '80px' : '24px' }}
              ></div>
            ))}
          </div>

          {/* Purple margin line */}
          <div className="absolute left-12 top-0 bottom-0 w-px bg-purple-300 opacity-40"></div>

          {/* Top header with actions */}
          <div className="relative px-6 pt-4 pb-2 flex justify-between flex-row">
         
         
            <button
              onClick={onEdit}
              className="p-1 text-sm bg-white/50 rounded-full transition-all duration-300 hover:bg-blue-100 text-blue-400 hover:text-blue-600 transform hover:scale-110 active:scale-95 group/delete"
            >
              Edit
                  </button>

            {/* Delete button */}
            <button
              onClick={onDelete}
              className="p-3 pr-3 bg-white/50 rounded-full transition-all duration-300 hover:bg-red-100 text-gray-400 hover:text-red-600 transform hover:scale-110 active:scale-95 group/delete"
            >
              <X  size={19} className="transition-transform duration-300 group-hover/delete:rotate-90" />
            </button>
            
          </div>

          {/* Content */}
          <div className="relative px-6 pb-6">
            {/* Title */}
            <h3 
              className="text-2xl font-bold text-gray-800 mb-3 tracking-tight transition-all duration-300 hover:tracking-wide cursor-default"
              style={{ fontFamily: 'RL Madena, serif' }}
            >
              {title.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:text-purple-600"
                  style={{ transitionDelay: `${index * 15}ms` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h3>

            {/* Note content */}
            <p 
              className="text-gray-700 leading-relaxed text-sm transition-all duration-300 group-hover:text-gray-900"
              style={{ fontFamily: 'RL Madena, serif' }}
            >
              {content}
            </p>
          </div>

          {/* Corner fold effect */}
          <div 
            className="absolute top-0 right-0 w-0 h-0 transition-all duration-500 group-hover:w-12 group-hover:h-12"
            style={{
              borderStyle: 'solid',
              borderWidth: '0 48px 48px 0',
              borderColor: 'transparent rgba(139, 92, 246, 0.15) transparent transparent',
            }}
          ></div>

          {/* Decorative tape effect at top */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-purple-100/60 rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-2"></div>
          <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-gradient-to-b from-purple-200/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-2"></div>
        </div>
      </div>
    </div>
  );
}