
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
        <div className="space-y-8 animate-fade-in-up pb-20 font-sans">
            
            {/* HERO SECTION - Updated to match Dashboard Design */}
            <div className="bg-[#064E3B] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-visible shadow-2xl shadow-[#064E3B]/20">
                {/* Ambient Background Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#10B981] to-[#064E3B] rounded-full blur-[100px] opacity-30 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D4AF37] rounded-full blur-[80px] opacity-20 -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">
                            <Calendar size={14} /> <span>{currentDate}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2 leading-tight">
                            Pusat Input Data <span className="text-[#D4AF37]">Monitoring</span>
                        </h1>
                        <p className="text-emerald-100/80 text-sm max-w-lg leading-relaxed">
                            Kelola validasi data ekosistem haji secara real-time sesuai formulir pengawasan resmi.
                        </p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full md:w-auto">
                        {/* Search Bar */}
                        <div className="relative group/search w-full md:w-64">
                            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center shadow-lg transition-all focus-within:bg-white/20 focus-within:border-white/40 focus-within:shadow-xl">
                                <div className="pl-4 text-emerald-200 group-focus-within/search:text-[#D4AF37] transition-colors"><Search size={18} /></div>
                                <input 
                                    type="text" 
                                    value={searchTerm} 
                                    onChange={e => setSearchTerm(e.target.value)} 
                                    placeholder="Cari formulir data..." 
                                    className="w-full bg-transparent border-none py-3 px-3 text-white placeholder-emerald-200/50 text-xs font-bold focus:ring-0 tracking-wide" 
                                />
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 h-full min-h-[48px] shadow-lg">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] text-emerald-100 uppercase tracking-wide">Status Data</p>
                                <p className="text-xs font-bold text-white leading-none">Live Monitoring</p>
                            </div>
                            <div className="relative w-2.5 h-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {searchTerm ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map((r, idx) => (
                        <button key={idx} onClick={() => onNavigate(r.page)} className="flex items-center gap-5 p-6 bg-white/60 backdrop-blur-xl border border-white/60 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all text-left group">
                            <div className="p-4 rounded-2xl bg-[#064E3B] text-white"><r.icon size={24} /></div>
                            <div className="flex-1"><p className="text-[10px] font-bold text-[#D4AF37] uppercase">{r.type}</p><h4 className="text-lg font-bold text-gray-800">{r.title}</h4><p className="text-sm text-gray-500">{r.subtitle}</p></div>
                            <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {portalItems.map(item => (
                        <button key={item.id} onClick={() => onNavigate(item.targetPage)} className="group relative flex flex-col text-left h-full bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-sm hover:shadow-xl transition-all p-7 overflow-hidden">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#042f24] text-white shadow-xl"><item.icon size={26} /></div>
                                <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${item.status === 'draft' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-gray-50 text-gray-400'}`}>
                                    {item.status === 'draft' ? <History size={12} /> : <Activity size={12} />}
                                    <span>{item.status === 'draft' ? 'Draft' : 'Belum'}</span>
                                </div>
                            </div>
                            <div className="mb-2"><span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{item.subtitle}</span><h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#064E3B] transition-colors font-playfair">{item.title}</h3></div>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">{item.description}</p>
                            <div className="mt-auto"><div className="flex justify-between mb-2"><span className="text-[10px] text-gray-400 font-bold">PROGRESS</span><span className="text-sm font-bold text-gray-600">{item.progress}%</span></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FBBF24] transition-all duration-1000" style={{ width: `${item.progress}%` }}></div></div></div>
                            <div className="absolute bottom-6 right-6 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#064E3B] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all"><ChevronRight size={20} /></div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
