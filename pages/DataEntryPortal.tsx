
import React, { useState, useMemo } from 'react';
import { Page } from '../types';
import { ChefHat, UtensilsCrossed, Store, Truck, Signal, ArrowRight, Activity, CheckCircle2, Clock, History, Search, X, ChevronRight, Calendar, ShoppingCart } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface DataEntryPortalProps {
    onNavigate: (page: Page) => void;
}

const portalItems = [
    { id: 'bumbu', title: "Bumbu Pasta", subtitle: "Makkah & Madinah", description: "Monitoring penggunaan bumbu dan harga pasar.", icon: ChefHat, targetPage: Page.FORM_BUMBU, status: 'draft', progress: 40, lastUpdate: 'Baru saja', color: '#064E3B' },
    { id: 'beras', title: "Monitoring Beras", subtitle: "Stok & Kualitas", description: "Data beras premium dan volume distribusi.", icon: ShoppingCart, targetPage: Page.FORM_RICE, status: 'pending', progress: 0, lastUpdate: '-', color: '#059669' },
    { id: 'rte', title: "Makanan Siap Saji", subtitle: "Distribusi RTE", description: "Monitoring porsi dan perusahaan penyedia.", icon: UtensilsCrossed, targetPage: Page.FORM_RTE, status: 'pending', progress: 0, lastUpdate: '-', color: '#D4AF37' },
    { id: 'tenant', title: "Potensi Ekonomi", subtitle: "Survei Hotel & Tenant", description: "Sewa toko dan produk bestseller.", icon: Store, targetPage: Page.FORM_TENANT, status: 'pending', progress: 0, lastUpdate: '-', color: '#1E3A8A' },
    { id: 'expedition', title: "Ekspedisi", subtitle: "Kargo Jemaah", description: "Harga kargo per kilo dan berat volume.", icon: Truck, targetPage: Page.FORM_EXPEDITION, status: 'draft', progress: 15, lastUpdate: '1 jam lalu', color: '#B45309' },
    { id: 'telecom', title: "Telekomunikasi", subtitle: "Provider Jemaah", description: "Survei penggunaan RoaMax dan provider.", icon: Signal, targetPage: Page.FORM_TELECOM, status: 'pending', progress: 0, lastUpdate: '-', color: '#7C3AED' }
];

export const DataEntryPortal: React.FC<DataEntryPortalProps> = ({ onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData, riceData } = useData();
    const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) return [];
        const lowerTerm = searchTerm.toLowerCase();
        const results: any[] = [];
        [...bumbuMakkah, ...bumbuMadinah].forEach(i => i.name.toLowerCase().includes(lowerTerm) && results.push({ type: 'Bumbu', title: i.name, subtitle: `Vol: ${i.volume || 0}`, icon: ChefHat, page: Page.FORM_BUMBU, color: '#064E3B' }));
        riceData.forEach(i => i.companyName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Beras', title: i.companyName, subtitle: i.riceType, icon: ShoppingCart, page: Page.FORM_RICE, color: '#059669' }));
        rteData.forEach(i => i.companyName.toLowerCase().includes(lowerTerm) && results.push({ type: 'RTE', title: i.companyName, subtitle: i.menu, icon: UtensilsCrossed, page: Page.FORM_RTE, color: '#D4AF37' }));
        tenantData.forEach(i => i.shopName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Tenant', title: i.shopName, subtitle: i.productType, icon: Store, page: Page.FORM_TENANT, color: '#1E3A8A' }));
        expeditionData.forEach(i => i.companyName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Ekspedisi', title: i.companyName, subtitle: `${i.weight} Kg`, icon: Truck, page: Page.FORM_EXPEDITION, color: '#B45309' }));
        telecomData.forEach(i => i.providerName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Telco', title: i.providerName, subtitle: i.roamingPackage, icon: Signal, page: Page.FORM_TELECOM, color: '#7C3AED' }));
        return results;
    }, [searchTerm, bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData, riceData]);

    return (
        <div className="space-y-6 pb-10 animate-fade-in-up font-sans">
            
            {/* HERO SECTION - EXACT MATCH WITH DASHBOARD */}
            <div className="bg-[#064E3B] rounded-[2rem] px-8 py-6 md:px-10 text-white relative overflow-hidden shadow-xl shadow-[#064E3B]/20 min-h-[140px] flex flex-col justify-center">
                {/* Ambient Background Effects */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-b from-[#10B981] to-[#064E3B] rounded-full blur-[80px] opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#D4AF37] rounded-full blur-[60px] opacity-20 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest mb-1.5">
                            <Calendar size={12} /> <span>{currentDate}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-1.5 leading-tight">
                            Pusat Input Data <span className="text-[#D4AF37]">Monitoring</span>
                        </h1>
                        <p className="text-emerald-100/80 text-xs max-w-lg leading-relaxed">
                            Kelola input dan validasi data lapangan untuk seluruh sektor ekosistem haji secara real-time.
                        </p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
                        {/* Search Bar - Height matched to Badge */}
                        <div className="relative group/search w-full md:w-64">
                            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center shadow-lg transition-all focus-within:bg-white/20 focus-within:border-white/40 focus-within:shadow-xl px-2 min-h-[38px]">
                                <div className="pl-2 text-emerald-200 group-focus-within/search:text-[#D4AF37] transition-colors"><Search size={16} /></div>
                                <input 
                                    type="text" 
                                    value={searchTerm} 
                                    onChange={e => setSearchTerm(e.target.value)} 
                                    placeholder="Cari formulir..." 
                                    className="w-full bg-transparent border-none py-2 px-3 text-white placeholder-emerald-200/50 text-xs font-bold focus:ring-0 tracking-wide" 
                                />
                            </div>
                        </div>

                        {/* Status Badge - EXACT MATCH WITH DASHBOARD */}
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 h-full min-h-[38px]">
                            <div className="text-right">
                                <p className="text-[8px] text-emerald-100 uppercase tracking-wide">Status Data</p>
                                <p className="text-[10px] font-bold text-white leading-none">Live Monitoring</p>
                            </div>
                            <div className="relative w-2 h-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {searchTerm ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((r, idx) => (
                        <button key={idx} onClick={() => onNavigate(r.page)} className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm hover:shadow-xl transition-all text-left group overflow-hidden relative">
                             {/* Watermark for Search Results */}
                             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" style={{ color: r.color }}>
                                <r.icon size={60} />
                             </div>
                            <div className="p-3 rounded-2xl text-white shadow-md relative z-10" style={{ backgroundColor: r.color }}>
                                <r.icon size={20} />
                            </div>
                            <div className="flex-1 relative z-10"><p className="text-[9px] font-bold uppercase" style={{ color: r.color }}>{r.type}</p><h4 className="text-sm font-bold text-gray-800">{r.title}</h4><p className="text-[10px] text-gray-500 truncate">{r.subtitle}</p></div>
                            <ArrowRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform relative z-10" />
                        </button>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portalItems.map(item => (
                        <button key={item.id} onClick={() => onNavigate(item.targetPage)} className="group relative flex flex-col justify-between text-left h-[160px] bg-white/60 backdrop-blur-sm border border-white/60 rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 overflow-hidden">
                            
                             {/* Visual Background (Watermark) - MATCHING DASHBOARD STAT CARD */}
                             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" style={{ color: item.color }}>
                                <item.icon size={80} />
                             </div>

                             {/* Top Row: Icon & Badge */}
                            <div className="flex justify-between items-start relative z-10">
                                {/* ICON CARD STYLE MATCHING DASHBOARD */}
                                <div className="p-3 rounded-2xl text-white shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300" style={{ backgroundColor: item.color }}>
                                    <item.icon size={24} strokeWidth={2} />
                                </div>
                                <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 border backdrop-blur-sm ${item.status === 'draft' ? 'bg-amber-50/80 text-amber-700 border-amber-100' : 'bg-gray-50/80 text-gray-400 border-gray-100'}`}>
                                    {item.status === 'draft' ? <History size={8} /> : <Activity size={8} />}
                                    <span>{item.status === 'draft' ? 'Draft' : 'Belum'}</span>
                                </div>
                            </div>

                            {/* Middle: Content (Pushed to bottom by justify-between) */}
                            <div className="relative z-10 mt-2">
                                <span className="text-[9px] font-bold uppercase tracking-widest block mb-1" style={{ color: item.color }}>{item.subtitle}</span>
                                <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#064E3B] transition-colors font-playfair leading-tight mb-1">{item.title}</h3>
                                <p className="text-[10px] text-gray-500 font-medium leading-relaxed line-clamp-2 w-[90%]">{item.description}</p>
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute bottom-5 right-5 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-[#064E3B] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 z-20">
                                <ChevronRight size={12} />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
