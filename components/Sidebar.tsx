
import React from 'react';
import { LayoutDashboard, BarChart3, PieChart, Settings, LogOut, BookOpen } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout, isOpen }) => {
  const isDataActive = currentPage.toString().startsWith('FORM') || currentPage === Page.DATA_ENTRY_PORTAL;

  return (
    <aside className={`fixed left-0 top-0 h-full transition-all duration-500 cubic-bezier(0.25, 0.1, 0.25, 1) z-30 
       ${isOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full md:w-24 md:translate-x-0'}
       bg-[#064E3B] shadow-[10px_0_30px_rgba(0,0,0,0.15)] border-r border-white/5 flex flex-col overflow-hidden`}>
       
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981] opacity-20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Brand Header */}
      <div className="h-20 md:h-24 flex items-center justify-center border-b border-white/10 relative z-10 bg-gradient-to-b from-[#064E3B] to-[#053d2e]">
         <div className={`flex items-center gap-3 transition-all duration-500 ${!isOpen ? 'flex-col gap-0 justify-center' : 'px-4'}`}>
            {/* Logo */}
            <div className={`relative flex items-center justify-center group cursor-default transition-all duration-500 ${!isOpen ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <div className="absolute inset-0 bg-[#D4AF37] rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-[#D4AF37] to-[#B4941F] rounded-xl flex items-center justify-center text-[#064E3B] shadow-xl border border-white/20 transform group-hover:scale-105 transition-transform duration-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`${!isOpen ? 'w-5 h-5' : 'w-6 h-6'} drop-shadow-sm transition-all duration-500`}>
                        <path d="M3 21h18M5 21V7l8-4 8 4v14" />
                    </svg>
                </div>
            </div>
            
            <div className={`leading-tight transition-all duration-500 overflow-hidden whitespace-nowrap ${isOpen ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4 absolute'}`}>
                <h1 className="font-bold text-xl tracking-tight text-white drop-shadow-md font-playfair">EkoHajj <span className="text-[#D4AF37]">2026</span></h1>
                <span className="text-[9px] text-white/60 tracking-[0.2em] uppercase font-semibold block mt-0.5">System Dashboard</span>
            </div>
         </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar py-6 px-3 space-y-1.5 relative z-10">
        {/* Beranda */}
        <MenuItem 
            icon={LayoutDashboard} 
            label="Beranda" 
            isActive={currentPage === Page.DASHBOARD} 
            onClick={() => onNavigate(Page.DASHBOARD)} 
            isOpen={isOpen}
        />

        {/* Data Pengisian - Direct Link */}
        <MenuItem
            icon={BookOpen}
            label="Data Pengisian"
            isActive={isDataActive}
            onClick={() => onNavigate(Page.DATA_ENTRY_PORTAL)}
            isOpen={isOpen}
        />

        {/* Laporan Otomatis */}
        <MenuItem 
            icon={BarChart3} 
            label="Laporan Otomatis" 
            isActive={currentPage === Page.REPORTS} 
            onClick={() => onNavigate(Page.REPORTS)} 
            isOpen={isOpen}
        />

        {/* Grafik & Visualisasi */}
        <MenuItem 
            icon={PieChart} 
            label="Grafik & Visualisasi" 
            isActive={currentPage === Page.VISUALIZATION} 
            onClick={() => onNavigate(Page.VISUALIZATION)} 
            isOpen={isOpen}
        />

        {/* Pengaturan */}
        <MenuItem 
            icon={Settings} 
            label="Pengaturan" 
            isActive={currentPage === Page.SETTINGS} 
            onClick={() => onNavigate(Page.SETTINGS)} 
            isOpen={isOpen}
        />
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5 bg-[#042f24] relative z-10">
        <button
            onClick={onLogout}
            title={!isOpen ? "Keluar System" : ""}
            className={`w-full flex items-center gap-3.5 p-3 rounded-xl text-red-300/80 hover:bg-red-500/10 hover:text-red-200 transition-all duration-300 group border border-transparent hover:border-red-500/20 ${!isOpen ? 'justify-center px-0' : ''}`}
        >
            <div className={`relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${!isOpen ? 'w-full' : ''}`}>
                <LogOut size={20} strokeWidth={2} />
            </div>
            
            <span className={`text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 origin-left ${isOpen ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4 absolute'}`}>
                Keluar System
            </span>
        </button>
      </div>
    </aside>
  );
};

const MenuItem = ({ icon: Icon, label, isActive, onClick, isOpen }: any) => (
    <button
        onClick={onClick}
        title={!isOpen ? label : ''}
        className={`w-full flex items-center gap-3.5 p-3 rounded-xl transition-all duration-300 relative overflow-hidden group
            ${isActive 
                ? 'bg-gradient-to-r from-white/10 to-transparent text-white border border-white/10 shadow-lg' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
            } ${!isOpen ? 'justify-center px-0' : ''}`}
    >
        {/* Active Indicator Line */}
        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-[#D4AF37] rounded-r-full shadow-[0_0_10px_#D4AF37]"></div>}
        
        {/* Icon with hover animation */}
        <div className={`relative flex items-center justify-center transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'} ${!isOpen ? 'w-full' : ''}`}>
             <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={`transition-colors duration-300 ${isActive ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'group-hover:text-white'}`} />
        </div>
        
        <span className={`text-sm tracking-wide whitespace-nowrap transition-all duration-300 origin-left ${isOpen ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4 absolute'} ${isActive ? 'font-bold' : 'font-medium'}`}>
            {label}
        </span>
    </button>
);
