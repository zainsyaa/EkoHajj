
import React, { useState, useMemo } from 'react';
import { Page } from '../types';
import { ChefHat, UtensilsCrossed, Store, Truck, Signal, ArrowRight, Activity, CheckCircle2, Clock, History, Search, X, ChevronRight, Calendar, ShoppingCart } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface DataEntryPortalProps {
    onNavigate: (page: Page) => void;
}

const portalItems = [
    { id: 'bumbu', title: "Bumbu Pasta", subtitle: "Makkah & Madinah", description: "Monitoring penggunaan bumbu dan harga pasar.", icon: ChefHat, targetPage: Page.FORM_BUMBU, status: 'draft', progress: 40, lastUpdate: 'Baru saja' },
    { id: 'beras', title: "Monitoring Beras", subtitle: "Stok & Kualitas", description: "Data beras premium dan volume distribusi.", icon: ShoppingCart, targetPage: Page.FORM_RICE, status: 'pending', progress: 0, lastUpdate: '-' },
    { id: 'rte', title: "Makanan Siap Saji", subtitle: "Distribusi RTE", description: "Monitoring porsi dan perusahaan penyedia.", icon: UtensilsCrossed, targetPage: Page.FORM_RTE, status: 'pending', progress: 0, lastUpdate: '-' },
    { id: 'tenant', title: "Potensi Ekonomi", subtitle: "Survei Hotel & Tenant", description: "Sewa toko dan produk bestseller.", icon: Store, targetPage: Page.FORM_TENANT, status: 'pending', progress: 0, lastUpdate: '-' },
    { id: 'expedition', title: "Ekspedisi", subtitle: "Kargo Jemaah", description: "Harga kargo per kilo dan berat volume.", icon: Truck, targetPage: Page.FORM_EXPEDITION, status: 'draft', progress: 15, lastUpdate: '1 jam lalu' },
    { id: 'telecom', title: "Telekomunikasi", subtitle: "Provider Jemaah", description: "Survei penggunaan RoaMax dan provider.", icon: Signal, targetPage: Page.FORM_TELECOM, status: 'pending', progress: 0, lastUpdate: '-' }
];

export const DataEntryPortal: React.FC<DataEntryPortalProps> = ({ onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData, riceData } = useData();
    const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) return [];
        const lowerTerm = searchTerm.toLowerCase();
        const results: any[] = [];
        [...bumbuMakkah, ...bumbuMadinah].forEach(i => i.name.toLowerCase().includes(lowerTerm) && results.push({ type: 'Bumbu', title: i.name, subtitle: `Vol: ${i.volume || 0}`, icon: ChefHat, page: Page.FORM_BUMBU }));
        riceData.forEach(i => i.companyName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Beras', title: i.companyName, subtitle: i.riceType, icon: ShoppingCart, page: Page.FORM_RICE }));
        rteData.forEach(i => i.companyName.toLowerCase().includes(lowerTerm) && results.push({ type: 'RTE', title: i.companyName, subtitle: i.menu, icon: UtensilsCrossed, page: Page.FORM_RTE }));
        tenantData.forEach(i => i.shopName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Tenant', title: i.shopName, subtitle: i.productType, icon: Store, page: Page.FORM_TENANT }));
        expeditionData.forEach(i => i.companyName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Ekspedisi', title: i.companyName, subtitle: `${i.weight} Kg`, icon: Truck, page: Page.FORM_EXPEDITION }));
        telecomData.forEach(i => i.providerName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Telco', title: i.providerName, subtitle: i.roamingPackage, icon: Signal, page: Page.FORM_TELECOM }));
        return results;
    }, [searchTerm, bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData, riceData]);

    return (
        <div className="space-y-5 animate-fade-in-up pb-4 font-sans h-full flex flex-col">
            
            {/* HERO SECTION - Compact Version */}
            <div className="bg-[#064E3B] rounded-3xl p-6 text-white relative overflow-visible shadow-xl shadow-[#064E3B]/10 shrink-0">
                {/* Ambient Background Effects */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-b from-[#10B981] to-[#064E3B] rounded-full blur-[80px] opacity-30 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#D4AF37] rounded-full blur-[60px] opacity-20 -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest mb-1">
                            <Calendar size={12} /> <span>{currentDate}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-1 leading-tight">
                            Pusat Input Data <span className="text-[#D4AF37]">Monitoring</span>
                        </h1>
                        <p className="text-emerald-100/80 text-xs max-w-lg leading-relaxed">
                            Kelola validasi data ekosistem haji secara real-time.
                        </p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-3 w-full md:w-auto">
                        {/* Search Bar Compact */}
                        <div className="relative group/search w-full md:w-56">
                            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center shadow-lg transition-all focus-within:bg-white/20 focus-within:border-white/40 focus-within:shadow-xl">
                                <div className="pl-3 text-emerald-200 group-focus-within/search:text-[#D4AF37] transition-colors"><Search size={16} /></div>
                                <input 
                                    type="text" 
                                    value={searchTerm} 
                                    onChange={e => setSearchTerm(e.target.value)} 
                                    placeholder="Cari formulir..." 
                                    className="w-full bg-transparent border-none py-2 px-3 text-white placeholder-emerald-200/50 text-[11px] font-bold focus:ring-0 tracking-wide" 
                                />
                            </div>
                        </div>

                        {/* Status Badge Compact */}
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 h-full min-h-[40px] shadow-lg">
                            <div className="text-right hidden sm:block">
                                <p className="text-[9px] text-emerald-100 uppercase tracking-wide">Status</p>
                                <p className="text-[10px] font-bold text-white leading-none">Live</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-full pr-1 custom-scrollbar">
                    {searchResults.map((r, idx) => (
                        <button key={idx} onClick={() => onNavigate(r.page)} className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-xl border border-white/60 rounded-xl shadow-sm hover:shadow-lg transition-all text-left group overflow-hidden relative">
                             {/* Watermark for Search Results */}
                             <div className="absolute -right-4 -bottom-4 text-[#064E3B] opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-500 pointer-events-none transform rotate-12 scale-110">
                                <r.icon size={60} strokeWidth={1.5} />
                             </div>
                            <div className="p-2.5 rounded-lg bg-[#064E3B] text-white relative z-10"><r.icon size={18} /></div>
                            <div className="flex-1 relative z-10"><p className="text-[9px] font-bold text-[#D4AF37] uppercase">{r.type}</p><h4 className="text-xs font-bold text-gray-800">{r.title}</h4><p className="text-[9px] text-gray-500 truncate">{r.subtitle}</p></div>
                            <ArrowRight size={12} className="text-gray-400 group-hover:translate-x-1 transition-transform relative z-10" />
                        </button>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full content-start">
                    {portalItems.map(item => (
                        <button key={item.id} onClick={() => onNavigate(item.targetPage)} className="group relative flex flex-col text-left h-full max-h-[160px] bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm hover:shadow-lg transition-all p-4 overflow-hidden">
                            
                             {/* Visual Background (Watermark) - Compact */}
                             <div className="absolute -right-4 -top-4 text-[#064E3B] opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-700 pointer-events-none transform rotate-12 group-hover:rotate-6 scale-90">
                                <item.icon size={120} strokeWidth={0.8} />
                             </div>

                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#064E3B] to-[#042f24] text-white shadow-md group-hover:scale-105 transition-transform duration-300"><item.icon size={18} /></div>
                                <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 border backdrop-blur-sm ${item.status === 'draft' ? 'bg-amber-50/80 text-amber-700 border-amber-100' : 'bg-gray-50/80 text-gray-400'}`}>
                                    {item.status === 'draft' ? <History size={8} /> : <Activity size={8} />}
                                    <span>{item.status === 'draft' ? 'Draft' : 'Belum'}</span>
                                </div>
                            </div>
                            <div className="mb-1 relative z-10"><span className="text-[8px] font-bold text-[#D4AF37] uppercase tracking-widest">{item.subtitle}</span><h3 className="text-sm font-bold text-gray-800 group-hover:text-[#064E3B] transition-colors font-playfair leading-tight">{item.title}</h3></div>
                            <p className="text-[10px] text-gray-500 font-medium leading-snug mb-3 relative z-10 line-clamp-2">{item.description}</p>
                            <div className="mt-auto relative z-10">
                                <div className="flex justify-between mb-1"><span className="text-[8px] text-gray-400 font-bold">PROGRESS</span><span className="text-[10px] font-bold text-gray-600">{item.progress}%</span></div>
                                <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FBBF24] transition-all duration-1000" style={{ width: `${item.progress}%` }}></div></div>
                            </div>
                            <div className="absolute bottom-3 right-3 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-[#064E3B] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all z-20"><ChevronRight size={12} /></div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
