import React from 'react';

export const StatusBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 h-full min-h-[38px]">
        <div className="text-right">
            <p className="text-[10px] text-emerald-100 uppercase tracking-wide font-medium">Status Data</p>
            <p className="text-xs font-bold text-white leading-none mt-0.5">Live Monitoring</p>
        </div>
        <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </div>
    </div>
  );
};
