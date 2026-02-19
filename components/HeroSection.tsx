
import React from 'react';
import { Calendar } from 'lucide-react';

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  currentDate: string;
  children?: React.ReactNode;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, currentDate, children, className = '' }) => {
  return (
    <div className={`relative rounded-[2rem] shadow-xl shadow-[#064E3B]/20 min-h-[140px] flex flex-col justify-center ${className}`}>
        {/* Background Layer with Overflow Hidden */}
        <div className="absolute inset-0 bg-[#064E3B] rounded-[2rem] overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-b from-[#10B981] to-[#064E3B] rounded-full blur-[80px] opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#D4AF37] rounded-full blur-[60px] opacity-20 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        </div>
        
        {/* Content Layer - Allows Overflow for Dropdowns */}
        <div className="relative z-10 px-5 py-5 md:px-10 md:py-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-5 w-full">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest mb-2">
                    <Calendar size={12} /> <span>{currentDate}</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold font-display mb-2 leading-tight tracking-tight">
                    {title}
                </h1>
                <p className="text-emerald-100/90 text-xs md:text-sm max-w-xl leading-relaxed font-medium">
                    {subtitle}
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                {children}
            </div>
        </div>
    </div>
  );
};
