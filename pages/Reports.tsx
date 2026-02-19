
import React, { useState, useMemo } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ChefHat, UtensilsCrossed, Truck, Store, Signal, Download, Printer, Filter, Search, MapPin, User, Calendar, Clock, Building, ShoppingCart, ChevronDown, Check, ArrowDownUp, Database } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { TableRowSkeleton } from '../components/Skeletons';
import { HeroSection } from '../components/HeroSection';
import { StatusBadge } from '../components/StatusBadge';

const TableHeader = ({ children }: React.PropsWithChildren<{}>) => (
  <th className="px-5 py-3 text-left group relative">
    <div className="flex items-center gap-1.5 w-fit">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap group-hover:text-[#064E3B] transition-colors">{children}</span>
    </div>
  </th>
);

const TableRow = ({ children, idx, style }: React.PropsWithChildren<{ idx: number; style?: React.CSSProperties }>) => (
  <tr 
    style={style}
    className={`transition-all duration-300 hover:bg-[#064E3B]/5 ${idx % 2 === 0 ? 'bg-white/30' : 'bg-transparent'} animate-fade-in-up opacity-0 fill-mode-forwards`}
  >
      {children}
  </tr>
);

export const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bumbu' | 'beras' | 'rte' | 'tenant' | 'ekspedisi' | 'telco'>('bumbu');
  const { bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData, riceData, isLoading } = useData();
  const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'newest' | 'oldest' | 'highest_vol' | 'highest_price'>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- DATA PROCESSING LOGIC ---
  const processedData = useMemo(() => {
      let data: any[] = [];

      // 1. Combine/Select Data Source
      switch (activeTab) {
          case 'bumbu':
              data = [
                  ...bumbuMakkah.filter(i => i.isUsed).map(i => ({ ...i, loc: 'Makkah' })),
                  ...bumbuMadinah.filter(i => i.isUsed).map(i => ({ ...i, loc: 'Madinah' }))
              ];
              break;
          case 'beras': data = [...riceData]; break;
          case 'rte': data = [...rteData]; break;
          case 'tenant': data = [...tenantData]; break;
          case 'ekspedisi': data = [...expeditionData]; break;
          case 'telco': data = [...telecomData]; break;
      }

      // 2. Filter by Search Term (Specific to first 2 columns per tab)
      if (searchTerm) {
          const lowerTerm = searchTerm.toLowerCase();
          data = data.filter(item => {
              switch (activeTab) {
                  case 'bumbu':
                      // Col 1: name, companyName | Col 2: loc, kitchenName, address, pic
                      return (
                          (item.name && item.name.toLowerCase().includes(lowerTerm)) ||
                          (item.companyName && item.companyName.toLowerCase().includes(lowerTerm)) ||
                          (item.loc && item.loc.toLowerCase().includes(lowerTerm)) ||
                          (item.kitchenName && item.kitchenName.toLowerCase().includes(lowerTerm)) ||
                          (item.address && item.address.toLowerCase().includes(lowerTerm)) ||
                          (item.pic && item.pic.toLowerCase().includes(lowerTerm))
                      );
                  case 'beras':
                      // Col 1: companyName | Col 2: riceType, volume
                      return (
                          (item.companyName && item.companyName.toLowerCase().includes(lowerTerm)) ||
                          (item.riceType && item.riceType.toLowerCase().includes(lowerTerm)) ||
                          (item.volume && item.volume.toString().toLowerCase().includes(lowerTerm))
                      );
                  case 'rte':
                      // Col 1: companyName | Col 2: menu
                      return (
                          (item.companyName && item.companyName.toLowerCase().includes(lowerTerm)) ||
                          (item.menu && item.menu.toLowerCase().includes(lowerTerm))
                      );
                  case 'tenant':
                      // Col 1: shopName | Col 2: hotelName, location, pic
                      return (
                          (item.shopName && item.shopName.toLowerCase().includes(lowerTerm)) ||
                          (item.hotelName && item.hotelName.toLowerCase().includes(lowerTerm)) ||
                          (item.location && item.location.toLowerCase().includes(lowerTerm)) ||
                          (item.pic && item.pic.toLowerCase().includes(lowerTerm))
                      );
                  case 'ekspedisi':
                      // Col 1: companyName | Col 2: hotelName, location, pic
                      return (
                          (item.companyName && item.companyName.toLowerCase().includes(lowerTerm)) ||
                          (item.hotelName && item.hotelName.toLowerCase().includes(lowerTerm)) ||
                          (item.location && item.location.toLowerCase().includes(lowerTerm)) ||
                          (item.pic && item.pic.toLowerCase().includes(lowerTerm))
                      );
                  case 'telco':
                      // Col 1: providerName | Col 2: respondentName, kloter, embarkation, province
                      return (
                          (item.providerName && item.providerName.toLowerCase().includes(lowerTerm)) ||
                          (item.respondentName && item.respondentName.toLowerCase().includes(lowerTerm)) ||
                          (item.kloter && item.kloter.toLowerCase().includes(lowerTerm)) ||
                          (item.embarkation && item.embarkation.toLowerCase().includes(lowerTerm)) ||
                          (item.province && item.province.toLowerCase().includes(lowerTerm))
                      );
                  default:
                      return false;
              }
          });
      }

      // 3. Sort Data based on Filter Mode
      data.sort((a, b) => {
          switch (filterMode) {
              case 'newest':
                   // Mock sort by ID desc as proxy for date if date parsing is complex
                   return b.id - a.id;
              case 'oldest':
                   return a.id - b.id;
              case 'highest_vol':
                   const volA = parseFloat(a.volume || a.weight || '0');
                   const volB = parseFloat(b.volume || b.weight || '0');
                   return volB - volA;
              case 'highest_price':
                   const priceA = parseFloat(a.price || a.rentCost || a.pricePerKg || '0');
                   const priceB = parseFloat(b.price || b.rentCost || b.pricePerKg || '0');
                   return priceB - priceA;
              default:
                   return 0;
          }
      });

      return data;
  }, [activeTab, bumbuMakkah, bumbuMadinah, riceData, rteData, tenantData, expeditionData, telecomData, searchTerm, filterMode]);

  const getSearchPlaceholder = () => {
      switch(activeTab) {
          case 'bumbu': return 'Cari bumbu, dapur, PIC...';
          case 'beras': return 'Cari perusahaan, jenis beras...';
          case 'rte': return 'Cari perusahaan, menu...';
          case 'tenant': return 'Cari toko, hotel, PIC...';
          case 'ekspedisi': return 'Cari perusahaan, hotel, PIC...';
          case 'telco': return 'Cari provider, jemaah, kloter...';
          default: return 'Cari data...';
      }
  };

  const handleExport = () => {
      if (!processedData || processedData.length === 0) {
          alert('Tidak ada data untuk diekspor');
          return;
      }

      let headers: string[] = [];
      let keys: string[] = [];

      switch (activeTab) {
          case 'bumbu':
              headers = ['Jenis Bumbu', 'Perusahaan', 'Lokasi', 'Dapur', 'Alamat', 'PIC', 'Volume (Ton)', 'Bahan Lain', 'Harga (SAR)', 'Surveyor', 'Tanggal', 'Waktu'];
              keys = ['name', 'companyName', 'loc', 'kitchenName', 'address', 'pic', 'volume', 'otherIngredients', 'price', 'surveyor', 'date', 'time'];
              break;
          case 'beras':
              headers = ['Perusahaan', 'Jenis Beras', 'Volume (Ton)', 'Harga (SAR)', 'Asal Produk', 'Harga Asal', 'Surveyor', 'Tanggal'];
              keys = ['companyName', 'riceType', 'volume', 'price', 'originProduct', 'productPrice', 'surveyor', 'date'];
              break;
          case 'rte':
              headers = ['Perusahaan', 'Menu', 'Dapur', 'Alamat', 'PIC', 'Volume (Porsi)', 'Harga (SAR)', 'Surveyor', 'Tanggal', 'Waktu'];
              keys = ['companyName', 'menu', 'kitchenName', 'address', 'pic', 'volume', 'price', 'surveyor', 'date', 'time'];
              break;
          case 'tenant':
              headers = ['Nama Toko', 'Hotel', 'Lokasi', 'PIC', 'Produk Utama', 'Best Seller', 'Biaya Sewa (SAR)', 'Surveyor', 'Tanggal', 'Waktu'];
              keys = ['shopName', 'hotelName', 'location', 'pic', 'productType', 'bestSeller', 'rentCost', 'surveyor', 'date', 'time'];
              break;
          case 'ekspedisi':
              headers = ['Perusahaan', 'Hotel', 'Lokasi', 'PIC', 'Berat (Kg)', 'Harga/Kg (SAR)', 'Surveyor', 'Tanggal', 'Waktu'];
              keys = ['companyName', 'hotelName', 'location', 'pic', 'weight', 'pricePerKg', 'surveyor', 'date', 'time'];
              break;
          case 'telco':
              headers = ['Provider', 'Nama Jemaah', 'Kloter', 'Embarkasi', 'Provinsi', 'Paket Roaming', 'Surveyor', 'Tanggal'];
              keys = ['providerName', 'respondentName', 'kloter', 'embarkation', 'province', 'roamingPackage', 'surveyor', 'date'];
              break;
      }

      const csvContent = [
          headers.join(','),
          ...processedData.map(row => keys.map(key => {
              const val = row[key] || '-';
              const stringVal = String(val).replace(/"/g, '""');
              return `"${stringVal}"`;
          }).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `laporan_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const renderTableBody = () => {
      if (isLoading) {
          return (
              <tbody className="divide-y divide-gray-100">
                  {[...Array(6)].map((_, i) => <TableRowSkeleton key={i} />)}
              </tbody>
          );
      }

      if (processedData.length === 0) {
          return (
              <tbody>
                  <tr>
                      <td colSpan={5} className="p-12 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-400">
                              <Search size={32} className="mb-2 opacity-50" />
                              <p className="font-medium text-sm">Data tidak ditemukan.</p>
                              <p className="text-xs mt-1">Coba kata kunci pencarian lain.</p>
                          </div>
                      </td>
                  </tr>
              </tbody>
          );
      }

      const getDelay = (idx: number) => ({ animationDelay: `${idx * 50}ms` });

      switch(activeTab) {
          case 'bumbu':
              return (
                <tbody key={activeTab} className="divide-y divide-gray-100">
                    {processedData.map((row: any, idx) => (
                        <TableRow key={idx} idx={idx} style={getDelay(idx)}>
                            <td className="px-5 py-3">
                                <div className="font-bold text-gray-800 text-sm">{row.name}</div>
                                <div className="text-xs text-gray-500 font-medium">{row.companyName}</div>
                            </td>
                            <td className="px-5 py-3">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#064E3B]">
                                    <MapPin size={14} /> {row.loc}
                                </div>
                                <div className="text-xs font-bold text-gray-700 mt-1">{row.kitchenName || '-'}</div>
                                <div className="text-xs text-gray-500">{row.address}</div>
                                <div className="text-xs text-gray-500 mt-0.5">PIC: <span className="font-medium">{row.pic || '-'}</span></div>
                            </td>
                            <td className="px-5 py-3">
                                <div className="text-gray-700 font-bold text-sm">{row.volume} Ton</div>
                                <div className="text-xs text-gray-500">Bahan Lain: {row.otherIngredients || '-'}</div>
                            </td>
                            <td className="px-5 py-3 text-[#D4AF37] font-bold text-sm">SAR {row.price}</td>
                            <td className="px-5 py-3">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    <User size={14} /> {row.surveyor || '-'}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Calendar size={12} /> {row.date || '-'}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Clock size={12} /> {row.time || '-'}
                                    </div>
                                </div>
                            </td>
                        </TableRow>
                    ))}
                </tbody>
              );
          case 'beras':
              return (
                <tbody key={activeTab} className="divide-y divide-gray-100">
                    {processedData.map((row: any, idx) => (
                        <TableRow key={row.id} idx={idx} style={getDelay(idx)}>
                            <td className="px-5 py-3">
                                <div className="font-bold text-[#064E3B]">{row.companyName}</div>
                            </td>
                            <td className="px-5 py-3">
                                <div className="text-xs font-bold text-gray-700">{row.riceType}</div>
                                <div className="text-[10px] text-gray-500 mt-0.5">Vol: {row.volume} Ton</div>
                            </td>
                            <td className="px-5 py-3 text-[#D4AF37] font-bold">SAR {row.price}</td>
                            <td className="px-5 py-3">
                                <div className="text-xs font-medium text-gray-700">{row.originProduct || '-'}</div>
                                <div className="text-[10px] text-gray-400">Harga Asal: {row.productPrice || '-'}</div>
                            </td>
                            <td className="px-5 py-3">
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
                <tbody key={activeTab} className="divide-y divide-gray-100">
                    {processedData.map((row: any, idx) => (
                        <TableRow key={row.id} idx={idx} style={getDelay(idx)}>
                            <td className="px-5 py-3">
                                <div className="font-bold text-[#064E3B]">{row.companyName}</div>
                            </td>
                            <td className="px-5 py-3 text-gray-700 font-medium">{row.menu}</td>
                            <td className="px-5 py-3">
                                <div className="text-xs font-bold text-gray-700">{row.kitchenName || '-'}</div>
                                <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                                    <MapPin size={10} /> {row.address || '-'}
                                </div>
                                <div className="text-[10px] text-gray-500 mt-0.5">PIC: <span className="font-medium">{row.pic || '-'}</span></div>
                            </td>
                            <td className="px-5 py-3">
                                <div className="font-medium text-gray-700">{row.volume} Porsi</div>
                                <div className="text-[10px] font-bold text-[#D4AF37]">SAR {row.price}</div>
                            </td>
                            <td className="px-5 py-3">
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
                <tbody key={activeTab} className="divide-y divide-gray-100">
                    {processedData.map((row: any, idx) => (
                        <TableRow key={row.id} idx={idx} style={getDelay(idx)}>
                            <td className="px-5 py-3">
                                <div className="font-bold text-[#064E3B]">{row.shopName}</div>
                            </td>
                            <td className="px-5 py-3">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                                    <Building size={12} className="text-gray-400" /> {row.hotelName || '-'}
                                </div>
                                <div className="text-[10px] text-gray-500 ml-4">{row.location || '-'}</div>
                                <div className="text-[10px] text-gray-500 ml-4">PIC: {row.pic || '-'}</div>
                            </td>
                            <td className="px-5 py-3 text-gray-700">
                                <div className="font-medium text-xs">{row.productType}</div>
                                <div className="text-[10px] text-gray-400 mt-0.5">Best: {row.bestSeller}</div>
                            </td>
                            <td className="px-5 py-3 text-[#D4AF37] font-bold">SAR {row.rentCost}</td>
                            <td className="px-5 py-3">
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
                <tbody key={activeTab} className="divide-y divide-gray-100">
                    {processedData.map((row: any, idx) => (
                        <TableRow key={row.id} idx={idx} style={getDelay(idx)}>
                            <td className="px-5 py-3 font-bold text-[#064E3B]">{row.companyName}</td>
                            <td className="px-5 py-3">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                                    <Building size={12} className="text-gray-400" /> {row.hotelName || '-'}
                                </div>
                                <div className="text-[10px] text-gray-500 ml-4">{row.location || '-'}</div>
                                <div className="text-[10px] text-gray-500 ml-4">PIC: {row.pic || '-'}</div>
                            </td>
                            <td className="px-5 py-3 text-gray-700 font-medium">{row.weight} Kg</td>
                            <td className="px-5 py-3 text-[#D4AF37] font-bold">SAR {row.pricePerKg}</td>
                            <td className="px-5 py-3">
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
                <tbody key={activeTab} className="divide-y divide-gray-100">
                    {processedData.map((row: any, idx) => (
                        <TableRow key={row.id} idx={idx} style={getDelay(idx)}>
                            <td className="px-5 py-3 font-bold text-[#064E3B]">{row.providerName}</td>
                            <td className="px-5 py-3">
                                <div className="text-xs font-bold text-gray-700">{row.respondentName || '-'}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">Kloter: {row.kloter || '-'}</span>
                                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{row.embarkation || '-'}</span>
                                </div>
                                <div className="text-[10px] text-gray-400 mt-0.5">{row.province}</div>
                            </td>
                            <td className="px-5 py-3 text-gray-700 text-xs">{row.roamingPackage || '-'}</td>
                            <td className="px-5 py-3">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${row.roamingPackage ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${row.roamingPackage ? 'bg-emerald-600' : 'bg-gray-400'}`}></span>
                                    {row.roamingPackage ? 'Terisi' : 'Kosong'}
                                </span>
                            </td>
                            <td className="px-5 py-3">
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

  const filterOptions = [
      { id: 'newest', label: 'Terbaru Ditambahkan' },
      { id: 'oldest', label: 'Terlama Ditambahkan' },
      { id: 'highest_vol', label: 'Volume Tertinggi' },
      { id: 'highest_price', label: 'Harga Tertinggi' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
        
        <HeroSection
            title={<span>Laporan <span className="text-[#D4AF37]">Ekosistem Haji</span></span>}
            subtitle="Arsip lengkap dan rekapitulasi data real-time untuk kebutuhan pelaporan, audit, dan evaluasi layanan."
            currentDate={currentDate}
        >
             <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs font-bold text-white hover:bg-white/20 transition-all shadow-lg group">
                     <Printer size={14} className="text-emerald-200 group-hover:text-white transition-colors" /> Print Laporan
                 </button>
                 <button 
                     onClick={handleExport}
                     className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#064E3B] rounded-xl text-xs font-bold hover:bg-[#b08d24] hover:text-white shadow-lg shadow-[#D4AF37]/20 transition-all transform hover:-translate-y-0.5"
                 >
                     <Download size={14} /> Export CSV
                 </button>
             </div>

             {/* Status Badge */}
             <StatusBadge />
        </HeroSection>

        {/* Tab Navigation - Premium Pill Style */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 custom-scrollbar px-1 -mx-4 md:mx-0 px-4 md:px-0">
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
                    onClick={() => { setActiveTab(tab.id as any); setSearchTerm(''); }}
                    className={`group flex items-center gap-2 md:gap-2.5 px-4 py-2.5 md:px-6 md:py-3.5 rounded-2xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap border
                        ${activeTab === tab.id 
                            ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-lg shadow-[#064E3B]/20' 
                            : 'bg-white/60 text-gray-500 hover:bg-white hover:text-[#064E3B] border-transparent hover:border-gray-200'}`}
                >
                    <tab.icon size={18} className={activeTab === tab.id ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-[#064E3B]'} />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Data Table Card */}
        <GlassCard className="min-h-[500px] !bg-white/70">
            {/* Filters Row */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-1 gap-4">
                
                {/* LEFT: Search & Filter Group */}
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                    
                    {/* Search Bar */}
                    <div className="relative group w-full sm:w-60">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FBBF24] rounded-xl blur opacity-10 group-focus-within:opacity-20 transition-opacity"></div>
                        <div className="relative flex items-center">
                            <Search size={16} className="absolute left-4 text-gray-400 group-focus-within:text-[#064E3B] transition-colors" />
                            <input 
                                type="text" 
                                placeholder={getSearchPlaceholder()} 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 transition-all placeholder-gray-400 text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Filter Dropdown - Compact */}
                    <div className="relative w-full sm:w-auto">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-xs font-bold uppercase tracking-wide w-full sm:w-auto justify-between min-w-[120px]
                            ${isFilterOpen || filterMode !== 'newest' ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-lg' : 'bg-white text-gray-500 border-gray-200 hover:border-[#064E3B]'}`}
                        >
                            <div className="flex items-center gap-2">
                                    <ArrowDownUp size={14} />
                                    <span>{filterOptions.find(f => f.id === filterMode)?.label.split(' ')[0] || 'Filter'}</span>
                            </div>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <div className={`absolute top-full left-0 mt-2 w-full md:w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden transition-all duration-200 ease-out origin-top-left transform ${isFilterOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                            <div className="p-1.5">
                                {filterOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => {
                                            setFilterMode(opt.id as any);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between group
                                            ${filterMode === opt.id 
                                                ? 'bg-[#064E3B]/5 text-[#064E3B]' 
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-[#064E3B]'}`}
                                    >
                                        {opt.label}
                                        {filterMode === opt.id && <Check size={14} className="text-[#064E3B]" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Total Record - Compact */}
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm w-full md:w-auto justify-center md:justify-start">
                    <div className="p-1 bg-[#064E3B]/10 rounded-md text-[#064E3B]">
                            <Database size={12} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-0.5">Total Record</span>
                        <span className="text-xs font-bold text-gray-800 leading-none">{processedData.length} <span className="text-[10px] font-medium text-gray-400">Items</span></span>
                    </div>
                </div>

            </div>

            <div className="hidden md:block overflow-x-auto pb-4">
                {renderTable()}
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {isLoading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                            </div>
                        </div>
                    ))
                ) : processedData.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 bg-white/50 rounded-2xl border border-gray-100">
                        <Search size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">Data tidak ditemukan.</p>
                    </div>
                ) : (
                    processedData.map((row: any, idx) => (
                        <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-[#064E3B] text-sm line-clamp-1">{row.name || row.companyName || row.shopName || row.providerName}</h4>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">{row.loc || row.riceType || row.menu || row.productType || row.respondentName}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-[#D4AF37]">
                                        {row.price ? `SAR ${row.price}` : row.rentCost ? `SAR ${row.rentCost}` : row.pricePerKg ? `SAR ${row.pricePerKg}` : ''}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        {row.volume ? `${row.volume} ${activeTab === 'rte' ? 'Porsi' : 'Ton'}` : row.weight ? `${row.weight} Kg` : ''}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-2 pt-3 border-t border-gray-100/50">
                                {(row.kitchenName || row.hotelName || row.embarkation) && (
                                    <div className="flex items-start gap-2 text-xs text-gray-600">
                                        <Building size={14} className="text-gray-400 mt-0.5 shrink-0" />
                                        <span className="line-clamp-1">{row.kitchenName || row.hotelName || row.embarkation}</span>
                                    </div>
                                )}
                                {(row.address || row.location || row.province) && (
                                    <div className="flex items-start gap-2 text-xs text-gray-600">
                                        <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
                                        <span className="line-clamp-1">{row.address || row.location || row.province}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between mt-2 pt-2">
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                                        <User size={10} /> {row.pic || row.surveyor || '-'}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Clock size={10} /> {row.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200/60">
                <p className="text-sm font-medium text-gray-400">
                    Menampilkan <span className="text-gray-800 font-bold">{processedData.length} Data</span> dari total tersedia
                </p>
                <div className="flex gap-2">
                    <button disabled className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
                    <button disabled className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
                </div>
            </div>
        </GlassCard>
    </div>
  );
};
