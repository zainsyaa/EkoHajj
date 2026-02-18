
import React, { useState, useMemo, useEffect } from 'react';
import { Toggle } from '../../components/InputFields';
import { BumbuRecord } from '../../types';
import { Save, Search, ChefHat, ArrowLeft, ChevronDown, ChevronUp, MapPin, Calendar, Clock, User, ClipboardList, Package, DollarSign, Globe, FileText, AlertCircle, Building2 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface SpiceFormProps {
  onBack: () => void;
}

export const SpiceForm: React.FC<SpiceFormProps> = ({ onBack }) => {
  const { bumbuMakkah, setBumbuMakkah, bumbuMadinah, setBumbuMadinah } = useData();
  const [activeTab, setActiveTab] = useState<'Makkah' | 'Madinah'>('Makkah');
  const [searchTerm, setSearchTerm] = useState('');
  const [isIdentityExpanded, setIsIdentityExpanded] = useState(true);
  const [otherReason, setOtherReason] = useState('');

  // Select correct data source based on active tab
  const records = activeTab === 'Makkah' ? bumbuMakkah : bumbuMadinah;
  const setRecords = activeTab === 'Makkah' ? setBumbuMakkah : setBumbuMadinah;

  // Identity State
  const [kitchenName, setKitchenName] = useState('');
  const [address, setAddress] = useState('');
  const [pic, setPic] = useState('');
  const [monitorDate, setMonitorDate] = useState('');
  const [monitorTime, setMonitorTime] = useState('');
  const [surveyor, setSurveyor] = useState('');

  // Helper to update identity fields in bulk for all records
  const updateIdentity = (field: keyof BumbuRecord, value: string) => {
      setRecords(prev => prev.map(r => ({ ...r, [field]: value })));
  };

  const handleRecordChange = (id: number, field: keyof BumbuRecord, value: any) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const filteredRecords = useMemo(() => {
    return records.filter(record => 
        record.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [records, searchTerm]);

  // CONVERSION HELPERS
  const getDateValue = (dateStr: string) => {
      if (!dateStr) return '';
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
  };

  const handleDateChange = (val: string) => {
      if (!val) {
          setMonitorDate('');
          updateIdentity('date', '');
          return;
      }
      const [year, month, day] = val.split('-');
      const formatted = `${day}/${month}/${year}`;
      setMonitorDate(formatted);
      updateIdentity('date', formatted);
  };

  const getTimeValue = (timeStr: string) => {
      if (!timeStr) return '';
      return timeStr.replace('.', ':');
  };

  const handleTimeChange = (val: string) => {
      const formatted = val.replace(':', '.');
      setMonitorTime(formatted);
      updateIdentity('time', formatted);
  };

  const toTitleCase = (str: string) => str.replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="flex flex-col relative font-sans bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl overflow-hidden transition-all duration-500">
      
      {/* HEADER */}
      <div className="relative z-20 bg-white/40 backdrop-blur-lg border-b border-white/50">
          <div className="px-8 py-6 flex items-center justify-between gap-6">
             <div className="flex items-center gap-6">
                 <button onClick={onBack} className="p-3 rounded-2xl hover:bg-white text-gray-500 hover:text-[#064E3B] transition-all border border-transparent hover:border-gray-200 shadow-sm"><ArrowLeft size={22} /></button>
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-[#064E3B]/20 bg-gradient-to-br from-[#064E3B] to-[#042f24] text-white ring-4 ring-white/50">
                        <ChefHat size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#064E3B] leading-none tracking-tight font-playfair mb-1.5">Bumbu Pasta</h1>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Layanan Konsumsi</span>
                        </div>
                    </div>
                 </div>
             </div>

             <div className="flex items-center gap-4">
                <div className="relative group hidden xl:block">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FBBF24] rounded-xl blur opacity-10 group-focus-within:opacity-20 transition-opacity"></div>
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#064E3B] transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Cari jenis bumbu..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-11 pr-5 py-3 w-72 bg-white/60 border border-white rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 transition-all shadow-sm"
                    />
                </div>
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-3 bg-[#064E3B] hover:bg-[#053d2e] text-white rounded-xl shadow-lg shadow-[#064E3B]/20 text-sm font-bold transition-all transform hover:translate-y-[-2px] hover:shadow-xl"
                >
                    <Save size={18} /> <span>Simpan</span>
                </button>
             </div>
          </div>

          {/* Location Toggle Tabs */}
          <div className="px-8 pb-4">
              <div className="flex p-1.5 bg-gray-100/50 backdrop-blur-md rounded-2xl w-fit border border-gray-200/50">
                  {['Makkah', 'Madinah'].map((loc) => (
                      <button
                          key={loc}
                          onClick={() => setActiveTab(loc as 'Makkah' | 'Madinah')}
                          className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                              activeTab === loc 
                              ? 'bg-white text-[#064E3B] shadow-md shadow-gray-200' 
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                      >
                          Wilayah {loc}
                      </button>
                  ))}
              </div>
          </div>

          {/* Identity Panel (A. Identitas Lokasi) */}
          <div className="px-8 pb-2 relative">
             <div className={`bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm relative z-10 ${isIdentityExpanded ? 'max-h-[600px] opacity-100 mb-8 p-8' : 'max-h-0 opacity-0 mb-0 p-0 border-0'}`}>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/50">
                    <div className="p-2 bg-[#064E3B]/10 rounded-xl"><FileText size={18} className="text-[#064E3B]" /></div>
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">A. Identitas Lokasi & Petugas ({activeTab})</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  <PremiumInput label="1. Nama Dapur" icon={MapPin} value={kitchenName} 
                      onChange={(val: string) => { setKitchenName(val); updateIdentity('kitchenName', val); }} 
                      placeholder="Isi nama dapur..." />
                  <PremiumInput label="2. Alamat" icon={MapPin} value={address} 
                      onChange={(val: string) => { setAddress(val); updateIdentity('address', val); }} 
                      placeholder="Isi alamat lengkap..." />
                  <PremiumInput label="3. Penanggung Jawab Dapur" icon={User} value={pic} 
                      onChange={(val: string) => { setPic(val); updateIdentity('pic', val); }} 
                      placeholder="Isi nama PIC..." />
                  
                  <PremiumInput label="4. Tanggal Monitoring" icon={Calendar} type="date" 
                      value={getDateValue(monitorDate)} 
                      onChange={handleDateChange}
                  />

                  <PremiumInput label="5. Waktu Monitoring" icon={Clock} type="time" 
                      value={getTimeValue(monitorTime)} 
                      onChange={handleTimeChange} 
                  />
                  
                  <PremiumInput label="6. Surveyor" icon={User} value={surveyor} 
                      onChange={(val: string) => { setSurveyor(val); updateIdentity('surveyor', val); }} 
                      placeholder="Isi nama surveyor..." />
                </div>
             </div>
             
             {/* Toggle Button */}
             <div className="flex justify-center -mt-4 relative z-20">
                 <button 
                    onClick={() => setIsIdentityExpanded(!isIdentityExpanded)}
                    className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-gray-500 hover:text-[#064E3B] hover:border-[#064E3B]/20 shadow-lg shadow-gray-100 transition-all hover:shadow-xl hover:-translate-y-0.5"
                 >
                    {isIdentityExpanded ? 'Tutup Identitas' : 'Buka Identitas'}
                    {isIdentityExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                 </button>
             </div>
          </div>
      </div>

      {/* GRID CONTENT */}
      <div className="p-8 pt-2 z-10">
          
          <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#064E3B] rounded-xl shadow-lg shadow-[#064E3B]/20"><Package size={20} className="text-white" /></div>
                <div>
                    <h3 className="text-lg font-bold text-[#064E3B] font-playfair">B. Jenis Bumbu Pasta ({activeTab})</h3>
                    <p className="text-xs text-gray-500 font-medium tracking-wide">Input ketersediaan, perusahaan penyedia, volume, dan harga</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-white/50 rounded-lg text-xs font-bold text-gray-500 border border-white">
                  Total {filteredRecords.length} jenis
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredRecords.map((record, idx) => (
                <div 
                    key={record.id} 
                    className={`relative flex flex-col rounded-3xl transition-all duration-300 group overflow-hidden border
                    ${record.isUsed 
                        ? 'bg-white shadow-[0_10px_30px_rgba(6,78,59,0.08)] border-[#064E3B]/10 ring-1 ring-[#064E3B]/5' 
                        : 'bg-white/30 hover:bg-white/60 border-white hover:border-gray-200 hover:shadow-lg opacity-75 hover:opacity-100'}`}
                >
                   <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${record.isUsed ? 'bg-[#064E3B]' : 'bg-gray-200 group-hover:bg-gray-300'}`}></div>

                   <div className="pl-6 pr-5 py-5 flex justify-between items-center border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-transparent">
                       <div className="flex items-center gap-4">
                           <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${record.isUsed ? 'bg-[#064E3B] text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>
                               {idx + 1}
                           </div>
                           <h3 className={`text-sm font-bold uppercase tracking-tight transition-colors ${record.isUsed ? 'text-[#064E3B]' : 'text-gray-500'}`}>{record.name}</h3>
                       </div>
                       <div className="flex flex-col items-end">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 mr-1">Tersedia?</span>
                            <Toggle checked={record.isUsed} onChange={(val) => handleRecordChange(record.id, 'isUsed', val)} />
                       </div>
                   </div>

                   <div className={`pl-6 pr-5 py-6 space-y-6 transition-all duration-500 ${record.isUsed ? 'block opacity-100' : 'hidden opacity-0'}`}>
                       
                       <div className="space-y-1.5 pb-4 border-b border-dashed border-gray-200">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Building2 size={12} className="text-[#064E3B]"/> Perusahaan Penyedia</label>
                           <div className="relative group/input">
                               <input type="text" value={record.companyName || ''} onChange={(e) => handleRecordChange(record.id, 'companyName', toTitleCase(e.target.value))} 
                                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 outline-none transition-all placeholder:font-normal placeholder:text-gray-300" placeholder="Nama Perusahaan / Suplier..." />
                           </div>
                       </div>

                       <div className="grid grid-cols-2 gap-5">
                           <div className="space-y-1.5">
                               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Package size={12} className="text-[#D4AF37]"/> Volume/Ton</label>
                               <div className="relative group/input">
                                   <input type="number" value={record.volume} onChange={(e) => handleRecordChange(record.id, 'volume', e.target.value)} 
                                          className="w-full pl-3 pr-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 outline-none transition-all placeholder:font-normal placeholder:text-gray-300" placeholder="0.00" />
                               </div>
                           </div>
                           <div className="space-y-1.5">
                               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><DollarSign size={12} className="text-[#D4AF37]"/> Harga</label>
                               <div className="relative group/input">
                                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">SAR</span>
                                   <input type="number" value={record.price} onChange={(e) => handleRecordChange(record.id, 'price', e.target.value)} 
                                          className="w-full pl-10 pr-3 py-3 bg-[#064E3B]/5 border border-[#064E3B]/20 rounded-xl text-sm font-bold text-[#064E3B] focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/10 outline-none transition-all placeholder:font-normal placeholder:text-gray-300" placeholder="0" />
                               </div>
                           </div>
                       </div>
                       
                       <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><ClipboardList size={12} className="text-gray-400"/> Bahan Lain</label>
                            <input type="text" value={record.otherIngredients} onChange={(e) => handleRecordChange(record.id, 'otherIngredients', toTitleCase(e.target.value))} 
                                   className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all placeholder:text-gray-300" placeholder="Bahan tambahan..." />
                       </div>

                       <div className="pt-4 border-t border-dashed border-gray-200 grid grid-cols-2 gap-5">
                           <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Globe size={12}/> Produk Asal</label>
                                <input type="text" value={record.originProduct} onChange={(e) => handleRecordChange(record.id, 'originProduct', toTitleCase(e.target.value))} 
                                       className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 focus:bg-white focus:border-gray-400 outline-none transition-all" placeholder="Merk / Negara" />
                           </div>
                           <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><DollarSign size={12}/> Harga (Asal)</label>
                                <input type="number" value={record.productPrice} onChange={(e) => handleRecordChange(record.id, 'productPrice', e.target.value)} 
                                       className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 focus:bg-white focus:border-gray-400 outline-none transition-all" placeholder="0" />
                           </div>
                       </div>
                   </div>
                </div>
              ))}
          </div>

          <div className="relative group overflow-hidden rounded-3xl border border-white/60 shadow-xl bg-white/60 backdrop-blur-xl mb-8">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4AF37]"></div>
               <div className="p-8">
                   <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/20"><AlertCircle size={20} className="text-[#D4AF37]" /></div>
                       <h3 className="text-base font-bold text-gray-800 uppercase tracking-wide">C. Alasan Memilih Bumbu Lain ({activeTab})</h3>
                   </div>
                   <textarea 
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      className="w-full h-32 bg-white/80 border border-gray-200 rounded-2xl p-5 text-sm font-medium text-gray-700 focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 outline-none resize-none shadow-inner transition-all hover:bg-white"
                      placeholder="Jelaskan alasan jika ada bumbu non-standar yang digunakan..."
                   ></textarea>
               </div>
          </div>
      </div>
    </div>
  );
};

const PremiumInput = ({ label, icon: Icon, type = "text", value, onChange, placeholder }: any) => (
    <div className="flex flex-col gap-2 group">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-[#064E3B] transition-colors">
            <Icon size={12} className="text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" /> {label}
        </label>
        <div className="relative">
            <input 
                type={type} 
                value={value} 
                onChange={(e) => {
                    const val = e.target.value;
                    onChange(type === 'text' ? val.replace(/\b\w/g, c => c.toUpperCase()) : val);
                }} 
                className="w-full text-sm font-semibold text-gray-700 bg-white/60 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 outline-none transition-all shadow-sm placeholder:font-medium placeholder:text-gray-300 hover:border-gray-300 hover:bg-white/80" 
                placeholder={placeholder} 
            />
        </div>
    </div>
);
