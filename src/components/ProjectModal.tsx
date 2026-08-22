import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Trophy, 
  Cpu, 
  Sparkles, 
  Activity, 
  Layers, 
  CheckCircle2, 
  BarChart2, 
  Sliders, 
  Sun, 
  Droplet, 
  Wind, 
  Flame, 
  MapPin, 
  Search,
  ShoppingCart,
  Plus,
  Minus,
  RefreshCw,
  Info,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // State for AVO-BIO simulator
  const [bioPressure, setBioPressure] = useState<number>(34.2);
  const [bioMethane, setBioMethane] = useState<number>(68.5);
  const [bioTemp, setBioTemp] = useState<number>(37.2);
  const [valveState, setValveState] = useState<'AUTO' | 'OPEN' | 'PURGE'>('AUTO');

  // State for PANGANARA simulator
  const [selectedProvince, setSelectedProvince] = useState<string>('Jawa Barat');
  const provinceData: Record<string, { food: string; type: string; nutrition: string; history: string }> = {
    'Jawa Barat': { food: 'Peuyeum & Tutug Oncom', type: 'Fermentasi Tradisional', nutrition: 'Probiotik Alami, Serat 6.2g', history: 'Metode fermentasi singkong Sunda kuno untuk menjaga ketahanan pangan keluarga.' },
    'Sumatera Barat': { food: 'Rendang Daging & Asam Padeh', type: 'Pengawetan Rempah Tropis', nutrition: 'Protein Tinggi, Antimikroba Alami', history: 'Filosofi masakan Minangkabau dengan teknik karamelisasi santan berdaya simpan hingga berminggu-minggu.' },
    'Sulawesi Selatan': { food: 'Kapurung & Coto', type: 'Olahan Sagu Pesisir', nutrition: 'Karbohidrat Rendah Glikemik', history: 'Pangan pokok berbasis pati sagu sebagai kearifan lumbung pangan pesisir Nusantara.' },
    'Papua': { food: 'Papeda & Ikan Kuah Kuning', type: 'Pangan Pokok Hutan Hujan', nutrition: 'Zat Besi, Rendah Lemak Jenuh', history: 'Sumber ketahanan pangan alami dari pohon sagu liar endemik pulau Papua.' },
    'Nusa Tenggara Timur': { food: 'Jagung Bose & Sei', type: 'Serealia Kering & Pengasapan', nutrition: 'Serat Tinggi, Antioksidan', history: 'Adaptasi iklim semi-arid melalui pengasapan kayu kosambi dan varietas jagung pulut.' },
  };

  // State for SIRKULAR detector simulator
  const [scannerActive, setScannerActive] = useState<boolean>(true);
  const [detectedCount, setDetectedCount] = useState<number>(4);

  // State for NERACA forecast simulator
  const [selectedCommodity, setSelectedCommodity] = useState<string>('Beras Premium');

  // State for POS Resto simulator
  const [posCart, setPosCart] = useState<{ id: number; name: string; price: number; qty: number }[]>([
    { id: 1, name: 'Nasi Liwet Komplit', price: 35000, qty: 2 },
    { id: 2, name: 'Es Teh Manis Nusantara', price: 8000, qty: 2 },
  ]);
  const [selectedTable, setSelectedTable] = useState<string>('Meja 04');
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  const calculateSubtotal = () => posCart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addItemToCart = (item: { id: number; name: string; price: number }) => {
    setPosCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateCartQty = (id: number, delta: number) => {
    setPosCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = i.qty + delta;
        return newQty > 0 ? { ...i, qty: newQty } : null;
      }
      return i;
    }).filter(Boolean) as typeof prev);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="project-modal-container"
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200/80 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6C7CE0]/15 text-[#5161C5] flex items-center justify-center font-serif font-bold text-lg">
              {project.title.substring(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xl text-[#2A2A3C]">{project.title}</h3>
                {project.awardBadge && (
                  <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${
                    project.awardBadge.isChampion 
                      ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                      : 'bg-[#6C7CE0]/10 text-[#6C7CE0] border border-[#6C7CE0]/20'
                  }`}>
                    <Trophy className="w-3 h-3" />
                    {project.awardBadge.text}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#5A5A72]">{project.tagline}</p>
            </div>
          </div>

          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors"
            aria-label="Tutup Detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-8">
          
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FDF9F3] border border-stone-200/80 text-left">
                <span className="text-[11px] font-mono text-[#6A6A82] block">{m.label}</span>
                <span className="text-xl font-serif font-bold text-[#2A2A3C] mt-1 block">{m.value}</span>
              </div>
            ))}
            <div className="p-4 rounded-2xl bg-[#FDF9F3] border border-stone-200/80 text-left">
              <span className="text-[11px] font-mono text-[#6A6A82] block">Kategori</span>
              <span className="text-sm font-semibold text-[#6C7CE0] mt-1 block">{project.categoryLabel}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FDF9F3] border border-stone-200/80 text-left">
              <span className="text-[11px] font-mono text-[#6A6A82] block">Status Sistem</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Prototipe Teruji
              </span>
            </div>
          </div>

          {/* Interactive Live Prototype Sandbox / Simulation Area */}
          <div className="rounded-2xl border-2 border-[#6C7CE0]/30 bg-gradient-to-b from-stone-50 to-stone-100/50 p-5 overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6C7CE0]" />
                <span className="text-xs font-mono font-bold text-[#2A2A3C] uppercase tracking-wider">
                  Interactive Prototype Simulator
                </span>
              </div>
              <span className="text-[11px] font-mono bg-white px-2.5 py-0.5 rounded-md border border-stone-200 text-[#5A5A72]">
                Live Interactive Mode
              </span>
            </div>

            {/* --- SIMULATOR 1: AVO-BIO Biogas Telemetry --- */}
            {project.interactiveType === 'biogas-telemetry' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-[#5A5A72] mb-1">
                      <span>Kadar Metana (CH4)</span>
                      <Flame className="w-4 h-4 text-amber-500" />
                    </div>
                    <p className="text-2xl font-serif font-bold text-[#2A2A3C]">{bioMethane.toFixed(1)}%</p>
                    <span className="text-[10px] font-mono text-emerald-600">Optimal (Standar: 60-70%)</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-[#5A5A72] mb-1">
                      <span>Tekanan Digester</span>
                      <Wind className="w-4 h-4 text-[#6C7CE0]" />
                    </div>
                    <p className="text-2xl font-serif font-bold text-[#2A2A3C]">{bioPressure.toFixed(1)} mbar</p>
                    <span className="text-[10px] font-mono text-stone-500">Ambang Maks: 45.0 mbar</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-[#5A5A72] mb-1">
                      <span>Suhu Mesofilik</span>
                      <Droplet className="w-4 h-4 text-[#B48CE0]" />
                    </div>
                    <p className="text-2xl font-serif font-bold text-[#2A2A3C]">{bioTemp.toFixed(1)} °C</p>
                    <span className="text-[10px] font-mono text-emerald-600">Bakteri Aktif</span>
                  </div>
                </div>

                {/* Interactive Controls */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-semibold text-[#2A2A3C] block">Uji Respon Sensor Tekanan:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBioPressure(prev => Math.min(48, prev + 2.5))}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg font-mono font-medium"
                      >
                        + Naikkan Gas Organik
                      </button>
                      <button
                        onClick={() => setBioPressure(prev => Math.max(20, prev - 2.5))}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg font-mono font-medium"
                      >
                        - Alirkan ke Kompor
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[#5A5A72]">Mode Katup Pengaman:</span>
                    <span className={`px-2.5 py-1 rounded-md font-mono font-bold text-xs ${
                      bioPressure > 40 ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {bioPressure > 40 ? 'AUTO PURGE ACTIVE (RELIEVED)' : 'VALVE STABLE (AUTO)'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* --- SIMULATOR 2: PANGANARA AI Map & Nutrition --- */}
            {project.interactiveType === 'pangan-map' && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 pb-1">
                  {Object.keys(provinceData).map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setSelectedProvince(prov)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        selectedProvince === prov
                          ? 'bg-[#B48CE0] text-white shadow-xs font-semibold'
                          : 'bg-white text-[#4A4A62] border border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <MapPin className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                      {prov}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <div>
                      <span className="text-[11px] font-mono text-[#8452B8] uppercase font-semibold">
                        Provinsi Terpilih: {selectedProvince}
                      </span>
                      <h4 className="font-serif font-bold text-lg text-[#2A2A3C]">
                        {provinceData[selectedProvince].food}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#B48CE0]/10 text-[#8452B8] text-xs font-medium">
                      {provinceData[selectedProvince].type}
                    </span>
                  </div>

                  <p className="text-xs text-[#4A4A62] leading-relaxed">
                    {provinceData[selectedProvince].history}
                  </p>

                  <div className="p-3 bg-stone-50 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-mono text-[#5A5A72]">Karakteristik Gizi AI:</span>
                    <span className="font-semibold text-[#2A2A3C]">{provinceData[selectedProvince].nutrition}</span>
                  </div>
                </div>
              </div>
            )}

            {/* --- SIMULATOR 3: SIRKULAR Ocean Plastic Detection --- */}
            {project.interactiveType === 'ocean-detection' && (
              <div className="space-y-4">
                <div className="relative bg-slate-900 rounded-xl p-4 text-white overflow-hidden min-h-[180px] flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      LIVE COASTAL FEED: MUARA CILEUNGSI #03
                    </span>
                    <span className="text-stone-400">FPS: 30 • Inference: 85ms</span>
                  </div>

                  {/* Simulated Object Detection Bounding Boxes */}
                  <div className="grid grid-cols-2 gap-3 my-3">
                    <div className="border border-emerald-400/80 bg-emerald-500/10 p-2 rounded text-left">
                      <span className="text-[10px] font-mono bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                        Plastic Bottle #01 (94.2%)
                      </span>
                      <p className="text-[11px] text-stone-300 mt-1">Koordinat: -6.5892, 107.4431</p>
                    </div>
                    <div className="border border-cyan-400/80 bg-cyan-500/10 p-2 rounded text-left">
                      <span className="text-[10px] font-mono bg-cyan-400 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                        Fishing Net Mesh (91.8%)
                      </span>
                      <p className="text-[11px] text-stone-300 mt-1">Area: Zona Pesisir Estuari</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-slate-800">
                    <span>Friend of The Sea AI Vision Engine</span>
                    <span className="text-emerald-400 font-mono">Sistem Siaga Satgas Pantai</span>
                  </div>
                </div>
              </div>
            )}

            {/* --- SIMULATOR 4: NERACA Commodity Forecast --- */}
            {project.interactiveType === 'commodity-forecast' && (
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  {['Beras Premium', 'Cabai Merah Keriting', 'Minyak Goreng Curah'].map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCommodity(c)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        selectedCommodity === c 
                          ? 'bg-[#B48CE0] text-white font-semibold' 
                          : 'bg-white text-stone-600 border border-stone-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#5A5A72]">Komoditas: <strong>{selectedCommodity}</strong></span>
                    <span className="font-mono text-emerald-600 font-semibold">Prediksi 30 Hari: Tren Stabil</span>
                  </div>
                  <div className="h-20 bg-stone-50 rounded-lg border border-stone-100 flex items-end px-4 pb-2 justify-between">
                    {[12, 13.5, 14, 13.8, 14.2, 14.0, 14.5, 14.3, 14.6].map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div 
                          className={`w-5 rounded-t transition-all ${i >= 6 ? 'bg-[#B48CE0]' : 'bg-[#6C7CE0]/60'}`}
                          style={{ height: `${h * 4}px` }}
                        ></div>
                        <span className="text-[9px] font-mono text-stone-400">H+{i*3}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span>LSTM Confidence Score: 94.2%</span>
                    <span className="font-mono text-[#6C7CE0]">Neraca Massa Air: Normal (+4.8%)</span>
                  </div>
                </div>
              </div>
            )}

            {/* --- SIMULATOR 5: POS Resto Offline-Ready & Realtime --- */}
            {project.interactiveType === 'pos-checkout' && (
              <div className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  
                  {/* Menu Catalog */}
                  <div className="sm:col-span-7 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#2A2A3C]">
                      <span>Katalog Menu Cepat:</span>
                      <span className="text-[11px] font-mono text-[#6C7CE0]">{selectedTable}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 1, name: 'Nasi Liwet Komplit', price: 35000 },
                        { id: 2, name: 'Es Teh Manis', price: 8000 },
                        { id: 3, name: 'Sate Maranggi 10tsk', price: 42000 },
                        { id: 4, name: 'Karedok Segar', price: 20000 },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => addItemToCart(item)}
                          className="p-2.5 bg-white hover:bg-stone-50 rounded-xl border border-stone-200 text-left transition-colors flex flex-col justify-between"
                        >
                          <span className="text-xs font-semibold text-[#2A2A3C] line-clamp-1">{item.name}</span>
                          <div className="flex justify-between items-center mt-2 text-xs">
                            <span className="font-mono text-[#6C7CE0]">Rp {item.price.toLocaleString()}</span>
                            <Plus className="w-3.5 h-3.5 text-stone-400 hover:text-[#6C7CE0]" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cart / Bill Summary */}
                  <div className="sm:col-span-5 bg-white p-3 rounded-xl border border-stone-200 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold border-b pb-1.5">
                        <span>Pesanan Meja</span>
                        <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">Synced</span>
                      </div>

                      <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                        {posCart.map(item => (
                          <div key={item.id} className="flex items-center justify-between text-xs">
                            <span className="truncate max-w-[90px]">{item.name}</span>
                            <div className="flex items-center gap-1.5 font-mono">
                              <button onClick={() => updateCartQty(item.id, -1)} className="p-0.5 hover:bg-stone-100 rounded">
                                <Minus className="w-3 h-3 text-stone-500" />
                              </button>
                              <span>{item.qty}</span>
                              <button onClick={() => updateCartQty(item.id, 1)} className="p-0.5 hover:bg-stone-100 rounded">
                                <Plus className="w-3 h-3 text-stone-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t mt-2 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-[#2A2A3C]">
                        <span>Total:</span>
                        <span className="font-mono">Rp {calculateSubtotal().toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => {
                          setOrderSuccess(true);
                          setTimeout(() => setOrderSuccess(false), 2500);
                        }}
                        className="w-full py-1.5 bg-[#6C7CE0] hover:bg-[#5868CA] text-white rounded-lg font-semibold text-xs transition-colors mt-1"
                      >
                        {orderSuccess ? '✓ Transaksi Berhasil Dicatat' : 'Bayar & Kirim ke Dapur (KOT)'}
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-base text-[#2A2A3C]">Ringkasan Inovasi</h4>
              <p className="text-sm text-[#4A4A62] leading-relaxed">
                {project.longDescription}
              </p>
              
              <div className="pt-2">
                <span className="text-xs font-mono font-semibold text-[#5A5A72] block mb-2">Arsitektur Sistem:</span>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono text-[#2A2A3C] leading-relaxed">
                  {project.architectureSummary}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-base text-[#2A2A3C]">Fitur Utama & Keunggulan</h4>
              <ul className="space-y-2">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4A4A62]">
                    <CheckCircle2 className="w-4 h-4 text-[#6C7CE0] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3">
                <span className="text-xs font-mono font-semibold text-[#5A5A72] block mb-2">Tech Stack & Library:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-mono bg-white border border-stone-200 text-[#4A4A62]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#5A5A72]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Karya Orisinil oleh Farid Nadir Amrulloh (STT Wastukancana)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#4A4A62] hover:bg-stone-200 transition-colors"
            >
              Tutup
            </button>
            <a
              href={`#${project.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-[#6C7CE0] text-white hover:bg-[#5A6ACB] transition-colors shadow-xs"
            >
              <span>Selesai Eksplorasi</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
