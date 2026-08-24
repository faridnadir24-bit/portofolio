import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Flame, Wind, Droplet, MapPin, Plus, Minus } from 'lucide-react';
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

  const calculateSubtotal = () => posCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const addItemToCart = (item: { id: number; name: string; price: number }) => {
    setPosCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
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
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-neutral-100 flex items-center justify-between z-20">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-xl text-neutral-900">{project.title}</h3>
              {project.awardBadge && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                  project.awardBadge.isChampion
                    ? 'text-amber-800 bg-amber-50 border border-amber-200'
                    : 'text-neutral-500 bg-neutral-100'
                }`}>
                  {project.awardBadge.text}
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-500 mt-0.5">{project.tagline}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
              >
                <span>Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <p className="text-xs text-neutral-500">{m.label}</p>
                <p className="text-lg font-bold text-neutral-900 font-mono mt-1">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Interactive Simulator */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <p className="text-sm font-semibold text-neutral-900">Interactive Prototype</p>
              <span className="text-xs text-neutral-400">Sandbox</span>
            </div>

            {/* SIMULATOR 1: AVO-BIO */}
            {project.interactiveType === 'biogas-telemetry' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-4 rounded-xl border border-neutral-200">
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                      <span>Metana (CH4)</span>
                      <Flame className="w-4 h-4 text-amber-500" />
                    </div>
                    <p className="text-2xl font-bold font-mono text-neutral-900">{bioMethane.toFixed(1)}%</p>
                    <span className="text-xs text-emerald-600">Optimal</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-neutral-200">
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                      <span>Tekanan</span>
                      <Wind className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold font-mono text-neutral-900">{bioPressure.toFixed(1)} mbar</p>
                    <span className="text-xs text-neutral-400">Ambang: 45.0</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-neutral-200">
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                      <span>Suhu</span>
                      <Droplet className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold font-mono text-neutral-900">{bioTemp.toFixed(1)} °C</p>
                    <span className="text-xs text-emerald-600">Bakteri Aktif</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBioPressure(prev => Math.min(48, prev + 2.5))}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm text-neutral-800 transition-colors"
                    >
                      + Tambah Beban
                    </button>
                    <button
                      onClick={() => setBioPressure(prev => Math.max(20, prev - 2.5))}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm text-neutral-800 transition-colors"
                    >
                      − Buka Katup
                    </button>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                    bioPressure > 40 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {bioPressure > 40 ? 'Auto Purge Active' : 'Valve Stable'}
                  </span>
                </div>
              </div>
            )}

            {/* SIMULATOR 2: PANGANARA */}
            {project.interactiveType === 'pangan-map' && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {Object.keys(provinceData).map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setSelectedProvince(prov)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedProvince === prov
                          ? 'bg-neutral-900 text-white font-medium'
                          : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
                <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-neutral-400">{selectedProvince}</p>
                      <h4 className="font-bold text-lg text-neutral-900">{provinceData[selectedProvince].food}</h4>
                    </div>
                    <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md">{provinceData[selectedProvince].type}</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{provinceData[selectedProvince].history}</p>
                  <div className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Nutrisi:</span>
                    <span className="font-medium text-neutral-900">{provinceData[selectedProvince].nutrition}</span>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR 3: SIRKULAR */}
            {project.interactiveType === 'ocean-detection' && (
              <div className="bg-neutral-900 rounded-xl p-5 text-white space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Coastal Vision Inference
                  </span>
                  <span className="text-neutral-400">FPS: 30 · 85ms</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-emerald-500/40 bg-emerald-500/10 p-3 rounded-lg">
                    <span className="text-xs bg-emerald-500 text-neutral-950 px-1.5 py-0.5 rounded font-medium">Plastic Bottle (94.2%)</span>
                    <p className="text-xs text-neutral-300 mt-1">-6.5892, 107.4431</p>
                  </div>
                  <div className="border border-cyan-500/40 bg-cyan-500/10 p-3 rounded-lg">
                    <span className="text-xs bg-cyan-400 text-neutral-950 px-1.5 py-0.5 rounded font-medium">Fishing Net (91.8%)</span>
                    <p className="text-xs text-neutral-300 mt-1">Pesisir Estuari</p>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR 4: NERACA */}
            {project.interactiveType === 'commodity-forecast' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {['Beras Premium', 'Cabai Merah', 'Minyak Goreng'].map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCommodity(c)}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        selectedCommodity === c ? 'bg-neutral-900 text-white font-medium' : 'bg-white text-neutral-600 border border-neutral-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-600">{selectedCommodity}</span>
                    <span className="text-emerald-600 font-medium">Tren Stabil (30 hari)</span>
                  </div>
                  <div className="h-20 bg-neutral-50 rounded-lg flex items-end px-4 pb-2 justify-between">
                    {[12, 13.5, 14, 13.8, 14.2, 14.0, 14.5, 14.3, 14.6].map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-5 bg-blue-500 rounded-t transition-all" style={{ height: `${h * 4}px` }}></div>
                        <span className="text-[8px] text-neutral-400">H+{i * 3}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR 5: POS RESTO */}
            {project.interactiveType === 'pos-checkout' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-7 grid grid-cols-2 gap-2">
                    {[
                      { id: 1, name: 'Nasi Liwet Komplit', price: 35000 },
                      { id: 2, name: 'Es Teh Manis', price: 8000 },
                      { id: 3, name: 'Sate Maranggi 10tsk', price: 42000 },
                      { id: 4, name: 'Karedok Segar', price: 20000 },
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => addItemToCart(item)}
                        className="p-3 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-200 text-left transition-colors flex flex-col justify-between"
                      >
                        <span className="text-sm font-medium text-neutral-900">{item.name}</span>
                        <span className="text-sm text-blue-600 font-mono mt-2">Rp {item.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>

                  <div className="sm:col-span-5 bg-white p-4 rounded-xl border border-neutral-200 flex flex-col justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold border-b border-neutral-100 pb-2">Keranjang</p>
                      <div className="space-y-1.5 max-h-28 overflow-y-auto">
                        {posCart.map(item => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <span className="truncate max-w-[100px] text-neutral-700">{item.name}</span>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => updateCartQty(item.id, -1)} className="p-0.5 hover:bg-neutral-100 rounded"><Minus className="w-3 h-3 text-neutral-400" /></button>
                              <span className="font-medium text-neutral-900 w-4 text-center">{item.qty}</span>
                              <button onClick={() => updateCartQty(item.id, 1)} className="p-0.5 hover:bg-neutral-100 rounded"><Plus className="w-3 h-3 text-neutral-400" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-neutral-100 mt-3 text-sm flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-blue-600 font-mono">Rp {calculateSubtotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-neutral-900">Arsitektur & Detail</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">{project.longDescription}</p>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 text-sm text-neutral-700">
              <p className="font-medium text-neutral-900 mb-1">Data Flow</p>
              <p>{project.architectureSummary}</p>
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <p className="text-xs text-neutral-400 mb-2">Teknologi</p>
            <p className="text-sm text-neutral-600">{project.techStack.join(' · ')}</p>
          </div>

        </div>
      </div>
    </div>
  );
};
