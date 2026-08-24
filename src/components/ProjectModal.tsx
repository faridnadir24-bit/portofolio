import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Trophy, 
  Sparkles, 
  Flame, 
  Wind, 
  Droplet, 
  MapPin, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Activity,
  Layers
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Simulator States
  const [bioPressure, setBioPressure] = useState<number>(34.2);
  const [bioMethane, setBioMethane] = useState<number>(68.5);
  const [bioTemp, setBioTemp] = useState<number>(37.2);

  const [selectedProvince, setSelectedProvince] = useState<string>('Jawa Barat');
  const provinceData: Record<string, { food: string; type: string; nutrition: string; history: string }> = {
    'Jawa Barat': { food: 'Peuyeum & Tutug Oncom', type: 'Fermentasi Tradisional', nutrition: 'Probiotik Alami, Serat 6.2g', history: 'Metode fermentasi singkong Sunda kuno untuk menjaga ketahanan pangan keluarga.' },
    'Sumatera Barat': { food: 'Rendang Daging & Asam Padeh', type: 'Pengawetan Rempah Tropis', nutrition: 'Protein Tinggi, Antimikroba Alami', history: 'Filosofi masakan Minangkabau dengan teknik karamelisasi santan berdaya simpan hingga berminggu-minggu.' },
    'Sulawesi Selatan': { food: 'Kapurung & Coto', type: 'Olahan Sagu Pesisir', nutrition: 'Karbohidrat Rendah Glikemik', history: 'Pangan pokok berbasis pati sagu sebagai kearifan lumbung pangan pesisir Nusantara.' },
    'Papua': { food: 'Papeda & Ikan Kuah Kuning', type: 'Pangan Pokok Hutan Hujan', nutrition: 'Zat Besi, Rendah Lemak Jenuh', history: 'Sumber ketahanan pangan alami dari pohon sagu liar endemik pulau Papua.' },
    'Nusa Tenggara Timur': { food: 'Jagung Bose & Sei', type: 'Serealia Kering & Pengasapan', nutrition: 'Serat Tinggi, Antioksidan', history: 'Adaptasi iklim semi-arid melalui pengasapan kayu kosambi dan varietas jagung pulut.' },
  };

  const [selectedCommodity, setSelectedCommodity] = useState<string>('Beras Premium');

  const [posCart, setPosCart] = useState<{ id: number; name: string; price: number; qty: number }[]>([
    { id: 1, name: 'Nasi Liwet Komplit', price: 35000, qty: 2 },
    { id: 2, name: 'Es Teh Manis Nusantara', price: 8000, qty: 2 },
  ]);
  const [selectedTable] = useState<string>('Meja 04');

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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="project-modal-container"
        className="bg-[#141414] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-white/10 shadow-2xl relative text-left text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="sticky top-0 bg-[#161616]/95 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center font-mono font-bold text-sm">
              {project.title.substring(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xl text-white">{project.title}</h3>
                {project.awardBadge && (
                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    project.awardBadge.isChampion 
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' 
                      : 'bg-white/5 text-stone-300 border border-white/10'
                  }`}>
                    <Trophy className="w-3 h-3" />
                    {project.awardBadge.text}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-stone-400">{project.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold bg-white text-black hover:bg-stone-200 transition-all shadow-md active:scale-95"
              >
                <span>Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              id="close-project-modal-btn"
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
              aria-label="Tutup Detail"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#181818] border border-white/5 text-left">
                <span className="text-[10px] font-mono text-stone-400 block">{m.label}</span>
                <span className="text-lg font-bold font-mono text-white mt-1 block">{m.value}</span>
              </div>
            ))}
            <div className="p-4 rounded-2xl bg-[#181818] border border-white/5 text-left">
              <span className="text-[10px] font-mono text-stone-400 block">CATEGORY</span>
              <span className="text-xs font-semibold text-stone-200 mt-1 block">{project.categoryLabel}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#181818] border border-white/5 text-left">
              <span className="text-[10px] font-mono text-stone-400 block">SYSTEM STATUS</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Verified & Deployed
              </span>
            </div>
          </div>

          {/* Interactive Live Prototype Sandbox / Simulation Area */}
          <div className="rounded-3xl border border-white/10 bg-[#101010] p-6 overflow-hidden space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Interactive Prototype Simulator
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 text-stone-300">
                Sandbox Mode
              </span>
            </div>

            {/* --- SIMULATOR 1: AVO-BIO --- */}
            {project.interactiveType === 'biogas-telemetry' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#161616] p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                      <span>Kadar Metana (CH4)</span>
                      <Flame className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-2xl font-bold font-mono text-white">{bioMethane.toFixed(1)}%</p>
                    <span className="text-[10px] font-mono text-emerald-400">Optimal (Standar: 60-70%)</span>
                  </div>

                  <div className="bg-[#161616] p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                      <span>Tekanan Digester</span>
                      <Wind className="w-4 h-4 text-stone-400" />
                    </div>
                    <p className="text-2xl font-bold font-mono text-white">{bioPressure.toFixed(1)} mbar</p>
                    <span className="text-[10px] font-mono text-stone-400">Ambang: 45.0 mbar</span>
                  </div>

                  <div className="bg-[#161616] p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                      <span>Suhu Mesofilik</span>
                      <Droplet className="w-4 h-4 text-stone-400" />
                    </div>
                    <p className="text-2xl font-bold font-mono text-white">{bioTemp.toFixed(1)} °C</p>
                    <span className="text-[10px] font-mono text-emerald-400">Bakteri Aktif</span>
                  </div>
                </div>

                <div className="bg-[#161616] p-4 rounded-2xl border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-semibold text-white block">Uji Respon Telemetri Tekanan:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBioPressure(prev => Math.min(48, prev + 2.5))}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl font-mono text-white"
                      >
                        + Tambah Beban Gas
                      </button>
                      <button
                        onClick={() => setBioPressure(prev => Math.max(20, prev - 2.5))}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl font-mono text-white"
                      >
                        - Buka Katup Alir
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-stone-400">Status Katup:</span>
                    <span className={`px-2.5 py-1 rounded-xl font-mono font-bold text-xs ${
                      bioPressure > 40 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {bioPressure > 40 ? 'AUTO PURGE ACTIVE' : 'VALVE STABLE (AUTO)'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* --- SIMULATOR 2: PANGANARA --- */}
            {project.interactiveType === 'pangan-map' && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 pb-1">
                  {Object.keys(provinceData).map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setSelectedProvince(prov)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                        selectedProvince === prov
                          ? 'bg-white text-black font-bold'
                          : 'bg-[#181818] text-stone-400 border border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <MapPin className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                      {prov}
                    </button>
                  ))}
                </div>

                <div className="bg-[#161616] p-5 rounded-2xl border border-white/5 space-y-3 text-left">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">
                        Provinsi: {selectedProvince}
                      </span>
                      <h4 className="font-bold text-lg text-white">
                        {provinceData[selectedProvince].food}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-stone-300 text-xs font-mono">
                      {provinceData[selectedProvince].type}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed">
                    {provinceData[selectedProvince].history}
                  </p>

                  <div className="p-3 bg-[#0E0E0E] rounded-xl flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-400">Nutrisi Terindeks AI:</span>
                    <span className="text-white font-bold">{provinceData[selectedProvince].nutrition}</span>
                  </div>
                </div>
              </div>
            )}

            {/* --- SIMULATOR 3: SIRKULAR --- */}
            {project.interactiveType === 'ocean-detection' && (
              <div className="space-y-4">
                <div className="bg-[#161616] rounded-2xl p-5 text-white space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      COASTAL VISION INFERENCE: MUARA CILEUNGSI #03
                    </span>
                    <span className="text-stone-500">FPS: 30 • Inference: 85ms</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-emerald-500/40 bg-emerald-500/10 p-3 rounded-xl text-left">
                      <span className="text-[10px] font-mono bg-emerald-500 text-black px-1.5 py-0.5 rounded font-bold">
                        Plastic Bottle #01 (94.2%)
                      </span>
                      <p className="text-xs text-stone-300 mt-1 font-mono">Koordinat: -6.5892, 107.4431</p>
                    </div>
                    <div className="border border-cyan-500/40 bg-cyan-500/10 p-3 rounded-xl text-left">
                      <span className="text-[10px] font-mono bg-cyan-400 text-black px-1.5 py-0.5 rounded font-bold">
                        Fishing Net Mesh (91.8%)
                      </span>
                      <p className="text-xs text-stone-300 mt-1 font-mono">Area: Pesisir Estuari</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- SIMULATOR 4: NERACA --- */}
            {project.interactiveType === 'commodity-forecast' && (
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  {['Beras Premium', 'Cabai Merah', 'Minyak Goreng'].map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCommodity(c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono ${
                        selectedCommodity === c ? 'bg-white text-black font-bold' : 'bg-[#181818] text-stone-400'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="bg-[#161616] p-4 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-stone-400">Komoditas: <strong className="text-white">{selectedCommodity}</strong></span>
                    <span className="text-emerald-400">Prediksi 30 Hari: Stabil</span>
                  </div>
                  <div className="h-20 bg-[#0C0C0C] rounded-xl border border-white/5 flex items-end px-4 pb-2 justify-between">
                    {[12, 13.5, 14, 13.8, 14.2, 14.0, 14.5, 14.3, 14.6].map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div 
                          className="w-5 bg-white/80 rounded-t transition-all"
                          style={{ height: `${h * 4}px` }}
                        ></div>
                        <span className="text-[8px] font-mono text-stone-500">H+{i*3}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- SIMULATOR 5: POS RESTO --- */}
            {project.interactiveType === 'pos-checkout' && (
              <div className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-7 space-y-2">
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
                          className="p-3 bg-[#161616] hover:bg-[#1C1C1C] rounded-2xl border border-white/5 text-left transition-colors flex flex-col justify-between"
                        >
                          <span className="text-xs font-bold text-white">{item.name}</span>
                          <span className="font-mono text-xs text-stone-400 mt-2">Rp {item.price.toLocaleString()}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-[#161616] p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold border-b border-white/5 pb-2">
                        <span>Cart ({selectedTable})</span>
                        <span className="text-[10px] font-mono text-emerald-400">Offline-Ready</span>
                      </div>
                      <div className="space-y-1.5 max-h-28 overflow-y-auto">
                        {posCart.map(item => (
                          <div key={item.id} className="flex items-center justify-between text-xs font-mono">
                            <span className="truncate max-w-[90px]">{item.name}</span>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => updateCartQty(item.id, -1)} className="p-0.5 hover:bg-white/10 rounded">
                                <Minus className="w-3 h-3 text-stone-400" />
                              </button>
                              <span>{item.qty}</span>
                              <button onClick={() => updateCartQty(item.id, 1)} className="p-0.5 hover:bg-white/10 rounded">
                                <Plus className="w-3 h-3 text-stone-400" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 mt-3 text-xs flex justify-between font-bold font-mono">
                      <span>Total:</span>
                      <span>Rp {calculateSubtotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Long Description & Features */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              System Architecture & Highlights
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              {project.longDescription}
            </p>
            <div className="p-4 rounded-2xl bg-[#161616] border border-white/5 font-mono text-xs text-stone-300">
              <span className="text-stone-500 block mb-1">DATA FLOW PIPELINE:</span>
              {project.architectureSummary}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
