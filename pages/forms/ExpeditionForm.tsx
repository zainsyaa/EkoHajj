import React, { useState } from 'react';
import { Save, Truck, Plus, Trash2, ArrowLeft, MapPin, User, Calendar, Building, DollarSign, Weight, Clock, FileText, Calculator, Layers, Building2 } from 'lucide-react';
import { ExpeditionRecord } from '../../types';
import { useData } from '../../contexts/DataContext';
import { Input } from '../../components/InputFields';

interface ExpeditionFormProps {
    onBack: () => void;
}

export const ExpeditionForm: React.FC<ExpeditionFormProps> = ({ onBack }) => {
  const { expeditionData, setExpeditionData } = useData();

  const [hotelName, setHotelName] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [sector, setSector] = useState(''); 
  const [surveyor, setSurveyor] = useState(''); 
  const [surveyDate, setSurveyDate] = useState(''); 
  const [surveyTime, setSurveyTime] = useState(''); 

  const handleRecordChange = (id: number, field: keyof ExpeditionRecord, value: string) => {
    setExpeditionData(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addRecord = () => {
    const newId = expeditionData.length > 0 ? Math.max(...expeditionData.map(r => r.id)) + 1 : 1;
    setExpeditionData([...expeditionData, { id: newId, companyName: '', pricePerKg: '', weight: '' }]);
  };

  const removeRecord = (id: number) => setExpeditionData(expeditionData.filter(r => r.id !== id));

  const getDateValue = (dateStr: string) => {
      if (!dateStr) return '';
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
  };
  const handleDateChange = (val: string) => {
      if (!val) { setSurveyDate(''); return; }
      const [year, month, day] = val.split('-');
      setSurveyDate(`${day}/${month}/${year}`);
  };
  const getTimeValue = (timeStr: string) => (timeStr ? timeStr.replace('.', ':') : '');
  const handleTimeChange = (val: string) => setSurveyTime(val.replace(':', '.'));

  const averageIncome = expeditionData.reduce((acc, curr) => acc + (Number(curr.pricePerKg || 0) * Number(curr.weight || 0)), 0) / (expeditionData.length || 1);

  return (
    <div className="flex flex-col relative font-sans bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl overflow-hidden animate-fade-in-up">
      <div className="relative z-20 bg-white/40 backdrop-blur-lg border-b border-white/50 px-8 py-6">
         <div className="flex items-center justify-between gap-6 mb-8">
             <div className="flex items-center gap-6">
                 <button onClick={onBack} className="p-3 rounded-2xl hover:bg-white text-gray-500 hover:text-[#064E3B] transition-all border border-transparent hover:border-gray-200"><ArrowLeft size={22} /></button>
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-[#064E3B]/20 bg-gradient-to-br from-[#064E3B] to-[#042f24] text-white ring-4 ring-white/50">
                        <Truck size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#064E3B] font-playfair leading-tight">Potensi Ekspedisi</h1>
                        <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 inline-block px-2 py-0.5 rounded border border-[#D4AF37]/20">Logistik Kargo Barang</p>
                    </div>
                 </div>
             </div>
             <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 bg-[#064E3B] text-white rounded-xl shadow-lg text-sm font-bold hover:scale-105 transition-all"><Save size={18} /> Simpan</button>
         </div>

         <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/50">
                <div className="p-2 bg-[#064E3B]/10 rounded-xl"><FileText size={18} className="text-[#064E3B]" /></div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">A. Identitas Lokasi & Petugas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PremiumInput label="1. Nama Hotel" icon={Building} value={hotelName} onChange={setHotelName} placeholder="Hotel..." />
                  <PremiumInput label="2. Alamat" icon={MapPin} value={address} onChange={setAddress} placeholder="Alamat..." />
                  <PremiumInput label="3. Sektor" icon={Layers} value={sector} onChange={setSector} placeholder="Sektor..." />
                  <PremiumInput label="4. Petugas Survei" icon={User} value={surveyor} onChange={setSurveyor} placeholder="Nama Petugas..." />
                  <PremiumInput label="5. Tanggal Survei" icon={Calendar} type="date" value={getDateValue(surveyDate)} onChange={handleDateChange} />
                  <PremiumInput label="6. Waktu Survei" icon={Clock} type="time" value={getTimeValue(surveyTime)} onChange={handleTimeChange} />
              </div>
         </div>
      </div>

      <div className="p-8">
        {/* Section B Header */}
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#064E3B] rounded-xl shadow-lg shadow-[#064E3B]/20"><Truck size={20} className="text-white" /></div>
              <div>
                  <h3 className="text-lg font-bold text-[#064E3B] font-playfair">B. Potensi Ekspedisi Barang</h3>
                  <p className="text-xs text-gray-500 font-medium tracking-wide">Data perusahaan kargo dan volume pengiriman</p>
              </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
            {expeditionData.map((record, idx) => (
                <div key={record.id} className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                   <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D4AF37] rounded-l-3xl"></div>
                   <button onClick={() => removeRecord(record.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all bg-red-50 p-2 rounded-lg"><Trash2 size={16} /></button>
                   <div className="flex items-center gap-3 mb-6 pl-2">
                       <span className="text-xs font-bold text-[#064E3B] bg-[#064E3B]/10 px-2.5 py-1.5 rounded-lg">Kargo #{idx + 1}</span>
                   </div>
                   <div className="space-y-4">
                       <CardInput icon={Building2} placeholder="Nama Toko/Perusahaan" value={record.companyName} onChange={(e: any) => handleRecordChange(record.id, 'companyName', e.target.value)} />
                       <div className="grid grid-cols-2 gap-4">
                           <CardInput icon={DollarSign} placeholder="Harga/Kg (SAR)" type="number" value={record.pricePerKg} onChange={(e: any) => handleRecordChange(record.id, 'pricePerKg', e.target.value)} highlight />
                           <CardInput icon={Weight} placeholder="Berat (KG)" type="number" value={record.weight} onChange={(e: any) => handleRecordChange(record.id, 'weight', e.target.value)} />
                       </div>
                   </div>
                </div>
            ))}
            <button onClick={addRecord} className="flex flex-col items-center justify-center min-h-[150px] border-2 border-dashed border-gray-200 rounded-3xl hover:bg-[#064E3B]/5 transition-all text-gray-400 font-bold gap-3 group">
                <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm group-hover:scale-110 transition-transform"><Plus size={24} /></div>
                Tambah Kargo Baru
            </button>
        </div>

        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-sm flex items-center justify-between mb-8">
            <div className="flex items-center gap-5">
                 <div className="p-4 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><Calculator size={28} /></div>
                 <div><h3 className="text-lg font-bold text-gray-800">Rata-rata Pendapatan Perhari</h3><p className="text-xs text-gray-500 font-medium">Kalkulasi otomatis input kargo harian</p></div>
            </div>
            <div className="text-4xl font-bold text-[#D4AF37] font-playfair">SAR {averageIncome.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

const PremiumInput = ({ label, icon: Icon, type = "text", value, onChange, placeholder }: any) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-[#064E3B] transition-colors">
      <Icon size={12} className="text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" /> {label}
    </label>
    <input 
        type={type} 
        value={value} 
        onChange={e => {
            const val = e.target.value;
            onChange(type === 'text' ? val.replace(/\b\w/g, c => c.toUpperCase()) : val);
        }} 
        className="w-full text-sm font-semibold text-gray-700 bg-white/60 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 outline-none transition-all placeholder:text-gray-300" 
        placeholder={placeholder} 
    />
  </div>
);

const CardInput = ({ icon: Icon, value, onChange, placeholder, type = "text", highlight = false }: any) => (
    <div className="relative group/input">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-[#064E3B] transition-colors">
            <Icon size={16} className={highlight ? 'text-[#D4AF37]' : ''} />
        </div>
        <input 
            type={type} 
            value={value} 
            onChange={(e) => {
                if (type === 'text') {
                    e.target.value = e.target.value.replace(/\b\w/g, c => c.toUpperCase());
                }
                onChange(e);
            }} 
            placeholder={placeholder}
            className={`w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 pl-10 text-sm font-semibold text-gray-700 focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/10 outline-none transition-all placeholder:text-gray-300 ${highlight ? 'text-[#064E3B]' : ''}`}
        />
    </div>
);