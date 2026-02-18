import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Input } from '../components/InputFields';
import { ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setLoading(true);
      setTimeout(() => {
        onLogin();
      }, 800);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F4F8] relative overflow-hidden font-sans">
      {/* Rich Animated Background */}
      <div className="absolute inset-0 z-0 bg-[#064E3B]">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0fa968] via-[#064E3B] to-[#022c22] animate-pulse" style={{ animationDuration: '10s' }}></div>
         
         {/* Moving Orbs */}
         <div className="absolute top-[10%] left-[20%] w-[35vw] h-[35vw] bg-[#D4AF37]/20 rounded-full blur-[120px] animate-[bounce_8s_infinite] mix-blend-overlay"></div>
         <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-[#10B981]/15 rounded-full blur-[130px] animate-[pulse_6s_infinite] mix-blend-overlay"></div>
         <div className="absolute top-[40%] right-[30%] w-[20vw] h-[20vw] bg-white/5 rounded-full blur-[80px]"></div>
         
         {/* Grid Pattern Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150"></div>
      </div>
      
      {/* Center Card */}
      <div className="w-full max-w-md p-6 relative z-10 animate-fade-in-up">
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#10B981] rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <GlassCard className="!p-10 !bg-white/80 !backdrop-blur-3xl border-white/50 relative">
            <div className="text-center mb-10">
                {/* Logo Placeholder */}
                <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#B4941F] rounded-3xl mx-auto mb-6 shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center transform rotate-3 hover:rotate-6 hover:scale-105 transition-all duration-500 border border-white/40 group-hover:shadow-[#D4AF37]/50">
                    <div className="transform -rotate-3">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2.5" className="w-12 h-12 drop-shadow-sm">
                            <path d="M3 21h18M5 21V7l8-4 8 4v14" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold text-[#064E3B] mb-2 tracking-tight">EkoHajj <span className="text-[#D4AF37]">2026</span></h1>
                <p className="text-gray-500 text-sm font-semibold tracking-wide uppercase opacity-80">Dashboard Ekosistem Ekonomi Haji</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input 
                label="Username" 
                type="text" 
                placeholder="Masukkan username anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="!bg-white/50 focus:!bg-white"
                />
                <div className="space-y-1">
                    <Input 
                    label="Password" 
                    type="password" 
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="!bg-white/50 focus:!bg-white"
                    />
                    <div className="flex justify-end pt-1">
                        <a href="#" className="text-xs font-bold text-[#D4AF37] hover:text-[#b08d24] transition-colors">Lupa password?</a>
                    </div>
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FBBF24] hover:to-[#d4af37] text-[#064E3B] font-bold rounded-xl shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2 mt-4 group relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
                >
                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                {loading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-[#064E3B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        MEMPROSES...
                    </span>
                ) : (
                    <>
                    <span className="relative tracking-wider">MASUK DASHBOARD</span>
                    <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
                    </>
                )}
                </button>
                
                <div className="pt-8 border-t border-gray-200/50 text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold hover:text-gray-600 transition-colors cursor-default">
                        Kementerian Haji dan Umrah RI
                    </p>
                </div>
            </form>
            </GlassCard>
        </div>
      </div>
    </div>
  );
};