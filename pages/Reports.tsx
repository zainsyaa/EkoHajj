
import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ChefHat, UtensilsCrossed, Truck, Store, Signal, Download, Printer, Filter, Search, MapPin, User, Calendar, Clock, Building, ShoppingCart } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { TableRowSkeleton } from '../components/Skeletons';

const TableHeader = ({ children }: React.PropsWithChildren<{}>) => (
  <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{children}</th>
);

const TableRow = ({ children, idx }: React.PropsWithChildren<{ idx: number }>) => (
  <tr className={`transition-colors hover:bg-[#064E3B]/5 ${idx % 2 === 0 ? 'bg-white/30' : 'bg-transparent'}`}>
      {children}
  </tr>
);

export const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bumbu' | 'beras' | 'rte' | 'tenant' | 'ekspedisi' | 'telco'>('bumbu');
  const { bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData, riceData, isLoading } = useData();
  const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const renderTableBody = () => {
      if (isLoading) {
          return (
              <tbody className="divide-y divide-gray-100">
                  {[...Array(6)].map((_, i) => <TableRowSkeleton key={i} />)}
              </tbody>
          );
      }

      switch(activeTab) {
          case 'bumbu':
              const allBumbu = [
                  ...bumbuMakkah.filter(i => i.isUsed).map(i => ({ ...i, loc: 'Makkah' })),
                  ...bumbuMadinah.filter(i => i.isUsed).map(i => ({ ...i, loc: 'Madinah' }))
              ];
              return (
                <tbody className="divide-y divide-gray-100">
                    {allBumbu.map((row, idx) => (
                        <TableRow key={idx} idx={idx}>
                            <td className="px-6 py-4">
                                <div className="font-bold text-gray-700">{row.name}</div>
                                <div className="text-[10px] text-gray-400 font-medium">{row.originProduct}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#064E3B]">
                                    <MapPin size={12} /> {row.loc}
                                </div>
                                <div className="text-[11px] font-bold text-gray-700 mt-1">{row.kitchenName || '-'}</div>
                                <div className="text-[10px] text-gray-400">{row.address}</div>
                                <div className="text-[10px] text-gray-500 mt-0.5">PIC: <span className="font-medium">{row.pic || '-'}</span></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-gray-600 font-bold">{row.volume} Ton</div>
                                <div className="text-[10px] text-gray-400">Bahan Lain: {row.otherIngredients || '-'}</div>
                            </td>
                            <td className="px-6 py-4 text-[#D4AF37] font-bold">SAR {row.price}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    <User size={12} /> {row.surveyor || '-'}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Calendar size={10} /> {row.date || '-'}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Clock size={10} /> {row.time || '-'}
                                    </div>
                                </div>
                            </td>
                        </TableRow>
                    ))}
                </tbody>
              );
          case 'beras':
              return (
                <tbody className="divide-y divide-gray-100">
                    {riceData.map((row, idx) => (
                        <TableRow key={row.id} idx={idx}>
                            <td className="px-6 py-4">
                                <div className="font-bold text-[#064E3B]">{row.companyName}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-xs font-bold text-gray-700">{row.riceType}</div>
                                <div className="text-[10px] text-gray-500 mt-0.5">Vol: {row.volume} Ton</div>
                            </td>
                            <td className="px-6 py-4 text-[#D4AF37] font-bold">SAR {row.price}</td>
                            <td className="px-6 py-4">
                                <div className="text-xs font-medium text-gray-700">{row.originProduct || '-'}</div>
                                <div className="text-[10px] text-gray-400">Harga Asal: {row.productPrice || '-'}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    <User size={12} /> {row.surveyor || '-'}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Calendar size={10} /> {row.date || '-'}
                                    </div>
                                </div>
                            </td>
                        </TableRow>
                    ))}
                </tbody>
              );
          case 'rte':
               return (
                <tbody className="divide-y divide-gray-100">
                    {rteData.map((row, idx) => (
                        <TableRow key={row.id} idx={idx}>
                            <td className="px-6 py-4">
                                <div className="font-bold text-[#064E3B]">{row.companyName}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-700 font-medium">{row.menu}</td>
                            <td className="px-6 py-4">
                                <div className="text-xs font-bold text-gray-700">{row.kitchenName || '-'}</div>
                                <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                                    <MapPin size={10} /> {row.address || '-'}
                                </div>
                                <div className="text-[10px] text-gray-500 mt-0.5">PIC: <span className="font-medium">{row.pic || '-'}</span></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-700">{row.volume} Porsi</div>
                                <div className="text-[10px] font-bold text-[#D4AF37]">SAR {row.price}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    <User size={12} /> {row.surveyor || '-'}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Calendar size={10} /> {row.date || '-'}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Clock size={10} /> {row.time || '-'}
                                    </div>
                                </div>
                            </td>
                        </TableRow>
                    ))}
                </tbody>
              );
          case 'tenant':
               return (
                <tbody className="divide-y divide-gray-100">
                    {tenantData.map((row, idx) => (
                        <TableRow key={row.id} idx={idx}>
                            <td className="px-6 py-4">
                                <div className="font-bold text-[#064E3B]">{row.shopName}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                                    <Building size={12} className="text-gray-400" /> {row.hotelName || '-'}
                                </div>
                                <div className="text-[10px] text-gray-500 ml-4">{row.location || '-'}</div>
                                <div className="text-[10px] text-gray-500 ml-4">PIC: {row.pic || '-'}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                <div className="font-medium text-xs">{row.productType}</div>
                                <div className="text-[10px] text-gray-400 mt-0.5">Best: {row.bestSeller}</div>
                            </td>
                            <td className="px-6 py-4 text-[#D4AF37] font-bold">SAR {row.rentCost}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    <User size={12} /> {row.surveyor || '-'}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Calendar size={10} /> {row.date || '-'}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Clock size={10} /> {row.time || '-'}
                                    </div>
                                </div>
                            </td>
                        </TableRow>
                    ))}
                </tbody>
              );
          case 'ekspedisi':
              return (
                <tbody className="divide-y divide-gray-100">
                    {expeditionData.map((row, idx) => (
                        <TableRow key={row.id} idx={idx}>
                            <td className="px-6 py-4 font-bold text-[#064E3B]">{row.companyName}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                                    <Building size={12} className="text-gray-400" /> {row.hotelName || '-'}
                                </div>
                                <div className="text-[10px] text-gray-500 ml-4">{row.location || '-'}</div>
                                <div className="text-[10px] text-gray-500 ml-4">PIC: {row.pic || '-'}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-700 font-medium">{row.weight} Kg</td>
                            <td className="px-6 py-4 text-[#D4AF37] font-bold">SAR {row.pricePerKg}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    <User size={12} /> {row.surveyor || '-'}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Calendar size={10} /> {row.date || '-'}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Clock size={10} /> {row.time || '-'}
                                    </div>
                                </div>
                            </td>
                        </TableRow>
                    ))}
                </tbody>
             );
          case 'telco':
              return (
                <tbody className="divide-y divide-gray-100">
                    {telecomData.map((row, idx) => (
                        <TableRow key={row.id} idx={idx}>
                            <td className="px-6 py-4 font-bold text-[#064E3B]">{row.providerName}</td>
                            <td className="px-6 py-4">
                                <div className="text-xs font-bold text-gray-700">{row.respondentName || '-'}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">Kloter: {row.kloter || '-'}</span>
                                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{row.embarkation || '-'}</span>
                                </div>
                                <div className="text-[10px] text-gray-400 mt-0.5">{row.province}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-700 text-xs">{row.roamingPackage || '-'}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${row.roamingPackage ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${row.roamingPackage ? 'bg-emerald-600' : 'bg-gray-400'}`}></span>
                                    {row.roamingPackage ? 'Terisi' : 'Kosong'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    <User size={12} /> {row.surveyor || '-'}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Calendar size={10} /> {row.date || '-'}
                                    </div>
                                </div>
                            </td>
                        </TableRow>
                    ))}
                </tbody>
             );
          default:
              return <tbody><tr><td colSpan={5} className="p-12 text-center text-gray-400 font-medium">Data belum tersedia.</td></tr></tbody>;
      }
  }

  const renderTable = () => {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200/50">
            <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                    <tr>
                        {activeTab === 'bumbu' && (
                            <>
                                <TableHeader>Jenis Bumbu</TableHeader>
                                <TableHeader>Detail Dapur & PIC</TableHeader>
                                <TableHeader>Data Bumbu</TableHeader>
                                <TableHeader>Harga (SAR)</TableHeader>
                                <TableHeader>Surveyor & Waktu</TableHeader>
                            </>
                        )}
                        {activeTab === 'beras' && (
                            <>
                                <TableHeader>Perusahaan</TableHeader>
                                <TableHeader>Jenis & Volume</TableHeader>
                                <TableHeader>Harga (SAR)</TableHeader>
                                <TableHeader>Asal Produk</TableHeader>
                                <TableHeader>Surveyor & Waktu</TableHeader>
                            </>
                        )}
                        {activeTab === 'rte' && (
                            <>
                                <TableHeader>Perusahaan</TableHeader>
                                <TableHeader>Menu / Jenis</TableHeader>
                                <TableHeader>Lokasi & PIC</TableHeader>
                                <TableHeader>Volume & Harga</TableHeader>
                                <TableHeader>Surveyor & Waktu</TableHeader>
                            </>
                        )}
                        {activeTab === 'tenant' && (
                            <>
                                <TableHeader>Nama Toko</TableHeader>
                                <TableHeader>Lokasi Hotel & PIC</TableHeader>
                                <TableHeader>Produk Utama</TableHeader>
                                <TableHeader>Biaya Sewa</TableHeader>
                                <TableHeader>Surveyor & Waktu</TableHeader>
                            </>
                        )}
                        {activeTab === 'ekspedisi' && (
                            <>
                                <TableHeader>Perusahaan</TableHeader>
                                <TableHeader>Lokasi Asal & PIC</TableHeader>
                                <TableHeader>Berat (Kg)</TableHeader>
                                <TableHeader>Harga / Kg</TableHeader>
                                <TableHeader>Surveyor & Waktu</TableHeader>
                            </>
                        )}
                        {activeTab === 'telco' && (
                            <>
                                <TableHeader>Provider</TableHeader>
                                <TableHeader>Identitas Jemaah</TableHeader>
                                <TableHeader>Paket Roaming</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Surveyor & Waktu</TableHeader>
                            </>
                        )}
                    </tr>
                </thead>
                {renderTableBody()}
            </table>
        </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
        
        {/* HERO SECTION - Styled like Dashboard */}
        <div className="bg-[#064E3B] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-[#064E3B]/20">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#10B981] to-[#064E3B] rounded-full blur-[100px] opacity-30 translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D4AF37] rounded-full blur-[80px] opacity-20 -translate-x-1/4 translate-y-1/4"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">
                        <Calendar size={14} /> <span>{currentDate}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2 leading-tight">
                        Laporan <span className="text-[#D4AF37]">Ekosistem Haji</span>
                    </h1>
                    <p className="text-emerald-100/80 text-sm max-w-lg leading-relaxed">
                        Arsip lengkap dan rekapitulasi data real-time untuk kebutuhan pelaporan, audit, dan evaluasi layanan.
                    </p>
                </div>
                
                <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
                     <div className="flex items-center gap-3">
                         <button className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs font-bold text-white hover:bg-white/20 transition-all shadow-lg group">
                             <Printer size={16} className="text-emerald-200 group-hover:text-white transition-colors" /> Print Laporan
                         </button>
                         <button className="flex items-center gap-2 px-5 py-3 bg-[#D4AF37] text-[#064E3B] rounded-xl text-xs font-bold hover:bg-[#b08d24] hover:text-white shadow-lg shadow-[#D4AF37]/20 transition-all transform hover:-translate-y-0.5">
                             <Download size={16} /> Export CSV
                         </button>
                     </div>

                     {/* Status Badge */}
                     <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 h-full min-h-[48px]">
                        <div className="text-right">
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

        {/* Tab Navigation - Premium Pill Style */}
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar px-1">
            {[
                { id: 'bumbu', label: 'Konsumsi Bumbu', icon: ChefHat },
                { id: 'beras', label: 'Monitoring Beras', icon: ShoppingCart },
                { id: 'rte', label: 'RTE (Siap Saji)', icon: UtensilsCrossed },
                { id: 'tenant', label: 'Tenant Hotel', icon: Store },
                { id: 'ekspedisi', label: 'Ekspedisi Barang', icon: Truck },
                { id: 'telco', label: 'Telekomunikasi', icon: Signal },
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border
                        ${activeTab === tab.id 
                            ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-lg shadow-[#064E3B]/20' 
                            : 'bg-white/60 text-gray-500 hover:bg-white hover:text-[#064E3B] border-transparent hover:border-gray-200'}`}
                >
                    <tab.icon size={16} className={activeTab === tab.id ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-[#064E3B]'} />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Data Table Card */}
        <GlassCard className="min-h-[500px] !bg-white/70">
            {/* Filters */}
            <div className="flex justify-between items-center mb-8 px-1">
                <div className="relative group w-full max-w-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FBBF24] rounded-xl blur opacity-10 group-focus-within:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center">
                        <Search size={18} className="absolute left-4 text-gray-400 group-focus-within:text-[#064E3B] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Cari data laporan..." 
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 transition-all placeholder-gray-400 text-gray-700"
                        />
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-[#064E3B] hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200">
                    <Filter size={18} />
                    <span className="text-xs font-bold uppercase">Filter</span>
                </button>
            </div>

            <div className="overflow-x-auto pb-4">
                {renderTable()}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200/60">
                <p className="text-xs font-medium text-gray-400">
                    Menampilkan <span className="text-gray-800 font-bold">Semua Data</span> secara real-time
                </p>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-50">Prev</button>
                    <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-50">Next</button>
                </div>
            </div>
        </GlassCard>
    </div>
  );
};
