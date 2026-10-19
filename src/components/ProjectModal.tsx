import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Flame, 
  Wind, 
  Droplet, 
  MapPin, 
  Plus, 
  Minus,
  Code2, 
  Cpu, 
  Copy, 
  Check, 
  Layers, 
  Play, 
  Activity, 
  Network
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Tabs: 'demo' | 'architecture' | 'code'
  const [activeTab, setActiveTab] = useState<'demo' | 'architecture' | 'code'>('demo');
  const [isCopied, setIsCopied] = useState<boolean>(false);

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

  // Code Snippets for Engineering tab
  const getProjectCode = (id: string) => {
    switch (id) {
      case 'avo-bio':
        return `// [AVO-BIO v2.0] ESP32 Telemetry Firmware (C++ / Arduino)
#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <ArduinoJson.h>

#define MQ4_ANALOG_PIN  34
#define STATUS_LED_PIN   2

Adafruit_BMP280 bmp;
WiFiClient espClient;
PubSubClient mqttClient(espClient);

void sampleAndPublishTelemetry() {
  // 1. Baca sensor analog dengan smoothing filter
  int rawAdc = analogRead(MQ4_ANALOG_PIN);
  float voltage = (rawAdc / 4095.0) * 3.3;
  float methanePpm = (voltage > 0.4) ? pow(10, ((log10(voltage) - 0.4) / 0.6)) * 100.0 : 0.0;
  
  // 2. Baca tekanan barometrik & suhu biodigester
  float pressureKpa = bmp.readPressure() / 1000.0F;
  float temperatureC = bmp.readTemperature();

  // 3. Serialize payload JSON kompak
  StaticJsonDocument<256> doc;
  doc["node_id"]      = "AVO-DIGESTER-01";
  doc["methane_pct"]  = constrain(methanePpm / 100.0, 0.0, 100.0);
  doc["pressure_kpa"] = pressureKpa;
  doc["temp_c"]       = temperatureC;
  doc["uptime_sec"]   = millis() / 1000;

  char buffer[256];
  serializeJson(doc, buffer);

  // 4. Publikasikan ke EMQX MQTT Broker (QoS 1)
  mqttClient.publish("telemetry/biogas/node-01", buffer, 1);
  digitalWrite(STATUS_LED_PIN, !digitalRead(STATUS_LED_PIN));
}`;
      case 'pangan-nusantara':
        return `// [PanganNusantara] Vector Semantic Search & Culinary Matcher (TypeScript)
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function matchCulinaryHeritage(userQuery: string, provinceFilter?: string) {
  // 1. Ekstrak embedding vektor teks query pengguna
  const embeddingResponse = await ai.models.embedContent({
    model: 'text-embedding-004',
    content: { parts: [{ text: userQuery }] }
  });
  const vector = embeddingResponse.embedding.values;

  // 2. Query similarity search ke tabel basis data Supabase (pgvector)
  const { data: results, error } = await supabase.rpc('match_food_vectors', {
    query_vector: vector,
    match_threshold: 0.78,
    match_count: 5,
    filter_province: provinceFilter || null
  });

  if (error) throw new Error(error.message);
  return results;
}`;
      case 'sistem-monitoring-cctv':
        return `# [SIKAM-AI] Edge Video Stream Worker (Python & YOLOv8)
import cv2
from ultralytics import YOLO
import requests

model = YOLO("weights/waste_seg_v8n.pt")
STREAM_SOURCE = "rtsp://edge-camera.local:554/live"

def run_edge_inference():
    cap = cv2.VideoCapture(STREAM_SOURCE)
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        # Inference deteksi sampah & limbah saluran air
        results = model.track(frame, conf=0.72, persist=True)
        detected_anomalies = []

        for box in results[0].boxes:
            cls_name = model.names[int(box.cls[0])]
            conf_val = float(box.conf[0])
            if cls_name in ["plastic_waste", "debris", "organic_clog"]:
                detected_anomalies.append({
                    "class": cls_name,
                    "confidence": round(conf_val, 3),
                    "coordinates": box.xyxy[0].tolist()
                })

        if detected_anomalies:
            # Trigger dispatch alert ke webhook backend
            requests.post("https://api.sikam.internal/alerts", json={
                "stream_id": "CH-01",
                "events": detected_anomalies
            }, timeout=2.0)`;
      case 'water-track':
        return `# [Water-Track] LSTM Hydraulic Mass-Balance Forecaster (Python)
import numpy as np
import tensorflow as tf

def forecast_reservoir_inflow(time_series_inflow, rainfall_history):
    """
    Menghitung prediksi debit air dan neraca massa waduk 24 jam ke depan
    menggunakan model recurrent neural network LSTM terlatih.
    """
    model = tf.keras.models.load_model("models/reservoir_lstm_v3.keras")
    
    # Normalisasi data masukan
    inputs = np.stack([time_series_inflow, rainfall_history], axis=-1)
    batch_input = np.expand_dims(inputs, axis=0)
    
    projected_outflow = model.predict(batch_input, verbose=0)
    return {
        "status": "CALCULATED",
        "next_24h_peak_flow_m3s": float(np.max(projected_outflow)),
        "flood_risk_level": "LOW" if np.max(projected_outflow) < 140.0 else "ALERT"
    }`;
      default:
        return `// [POS Kasir] Offline-First Sync Worker (TypeScript)
import { openDB } from 'idb';

export async function storeReceiptOffline(orderData: object) {
  const db = await openDB('pos_local_store', 1, {
    upgrade(db) {
      db.createObjectStore('pending_orders', { keyPath: 'id', autoIncrement: true });
    }
  });

  await db.add('pending_orders', {
    ...orderData,
    createdAt: new Date().toISOString(),
    syncStatus: 'PENDING'
  });

  // Daftarkan background sync worker bila koneksi terputus
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const registration = await navigator.serviceWorker.ready;
    await (registration as any).sync.register('sync-pos-transactions');
  }
}`;
    }
  };

  const handleCopyCode = () => {
    const code = getProjectCode(project.id);
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#121214] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200 dark:border-neutral-800 shadow-2xl relative text-left transition-colors"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#121214]/95 backdrop-blur-md px-6 py-4 border-b border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between z-20">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-xl text-neutral-900 dark:text-neutral-100">{project.title}</h3>
              {project.awardBadge && (
                <span className={`text-xs font-mono font-medium px-2.5 py-0.5 rounded-md ${
                  project.awardBadge.isChampion
                    ? 'text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/80'
                    : 'text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
                }`}>
                  {project.awardBadge.text}
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{project.tagline}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-2xs"
              >
                <span>Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('demo')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-t-lg border-b-2 transition-colors ${
              activeTab === 'demo'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Simulasi &amp; Hasil</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-t-lg border-b-2 transition-colors ${
              activeTab === 'architecture'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Aliran Sistem</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-t-lg border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Cuplikan Kode</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Metrics Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{m.label}</p>
                <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono mt-1">{m.value}</p>
              </div>
            ))}
          </div>

          {/* TAB 1: INTERACTIVE DEMO */}
          {activeTab === 'demo' && (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-mono">Interactive Sandbox</p>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live State
                </span>
              </div>

              {/* SIMULATOR 1: AVO-BIO */}
              {project.interactiveType === 'biogas-telemetry' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-[#161618] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                        <span>Metana (CH4)</span>
                        <Flame className="w-4 h-4 text-amber-500" />
                      </div>
                      <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">{bioMethane.toFixed(1)}%</p>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">Optimal</span>
                    </div>
                    <div className="bg-white dark:bg-[#161618] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                        <span>Tekanan Tangki</span>
                        <Wind className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">{bioPressure.toFixed(1)} kPa</p>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Aman (&lt; 50 kPa)</span>
                    </div>
                    <div className="bg-white dark:bg-[#161618] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                        <span>Suhu Digester</span>
                        <Droplet className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">{bioTemp.toFixed(1)}°C</p>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">Mesofilik Aktif</span>
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1 font-mono">
                        <span>Simulasi Pasokan Substrat Organik (Tekanan)</span>
                        <span>{bioPressure.toFixed(1)} kPa</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="60"
                        step="0.5"
                        value={bioPressure}
                        onChange={(e) => setBioPressure(parseFloat(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1 font-mono">
                        <span>Konsentrasi Gas Metana (CH4)</span>
                        <span>{bioMethane.toFixed(1)}%</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="85"
                        step="0.5"
                        value={bioMethane}
                        onChange={(e) => setBioMethane(parseFloat(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATOR 2: PANGAN NUSANTARA */}
              {project.interactiveType === 'pangan-nusantara' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(provinceData).map(p => (
                      <button
                        key={p}
                        onClick={() => setSelectedProvince(p)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                          selectedProvince === p
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold'
                            : 'bg-white dark:bg-[#161618] text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white dark:bg-[#161618] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-left space-y-2">
                    <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                      <p className="font-bold text-neutral-900 dark:text-neutral-100 text-base">{provinceData[selectedProvince].food}</p>
                      <span className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                        {provinceData[selectedProvince].type}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{provinceData[selectedProvince].history}</p>
                    <p className="text-xs font-mono text-neutral-600 dark:text-neutral-300 pt-1">
                      Nutrisi Kunci: <span className="font-semibold text-neutral-900 dark:text-neutral-100">{provinceData[selectedProvince].nutrition}</span>
                    </p>
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
                          className="p-3 bg-white dark:bg-[#161618] hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-800 text-left transition-colors flex flex-col justify-between"
                        >
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{item.name}</span>
                          <span className="text-sm text-blue-600 dark:text-blue-400 font-mono mt-2">Rp {item.price.toLocaleString()}</span>
                        </button>
                      ))}
                    </div>

                    <div className="sm:col-span-5 bg-white dark:bg-[#161618] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold border-b border-neutral-100 dark:border-neutral-800 pb-2 text-neutral-900 dark:text-neutral-100">Keranjang</p>
                        <div className="space-y-1.5 max-h-28 overflow-y-auto">
                          {posCart.map(item => (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                              <span className="truncate max-w-[100px] text-neutral-700 dark:text-neutral-300">{item.name}</span>
                              <div className="flex items-center gap-1.5">
                                <button onClick={() => updateCartQty(item.id, -1)} className="p-0.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"><Minus className="w-3 h-3 text-neutral-400" /></button>
                                <span className="font-medium text-neutral-900 dark:text-neutral-100 w-4 text-center font-mono">{item.qty}</span>
                                <button onClick={() => updateCartQty(item.id, 1)} className="p-0.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"><Plus className="w-3 h-3 text-neutral-400" /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 mt-3 text-sm flex justify-between font-semibold">
                        <span className="text-neutral-700 dark:text-neutral-300">Total:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-mono">Rp {calculateSubtotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ARCHITECTURE PIPELINE */}
          {activeTab === 'architecture' && (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-mono">End-to-End System Pipeline</p>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Latency ~12ms
                </span>
              </div>

              {/* Node sequence */}
              <div className="space-y-3">
                <div className="p-3.5 bg-white dark:bg-[#161618] rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold">01</div>
                  <div>
                    <h5 className="font-bold text-neutral-900 dark:text-neutral-100 text-xs font-mono">Edge Ingestion Node</h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Mikrokontroler ESP32 melakukan sampling sensor gas MQ-4, barometer BMP280, dan thermistor dengan kalibrasi curve fitting.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white dark:bg-[#161618] rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">02</div>
                  <div>
                    <h5 className="font-bold text-neutral-900 dark:text-neutral-100 text-xs font-mono">Event-Driven MQTT Broker</h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Transmisi paket telemetri ringan format JSON melalui broker EMQX dengan jaminan QoS 1 untuk koneksi pedesaan yang fluktuatif.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white dark:bg-[#161618] rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold">03</div>
                  <div>
                    <h5 className="font-bold text-neutral-900 dark:text-neutral-100 text-xs font-mono">Backend Stream &amp; Realtime UI</h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Supabase Realtime Database menyiarkan perubahan state ke dashboard React &amp; Tailwind, lengkap dengan ambang batas auto-alerting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Flow Summary Pill */}
              <div className="p-3 bg-white dark:bg-[#161618] rounded-xl border border-neutral-200/80 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 font-mono">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">Ringkasan Arsitektur: </span>
                {project.architectureSummary}
              </div>
            </div>
          )}

          {/* TAB 3: CODE SNIPPET */}
          {activeTab === 'code' && (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#18181B] text-neutral-200 overflow-hidden text-left">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#121214] border-b border-neutral-800 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>Production Source Code</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Disalin' : 'Salin Kode'}</span>
                </button>
              </div>

              <div className="p-4 overflow-x-auto max-h-[380px]">
                <pre className="font-mono text-xs leading-relaxed text-neutral-300">
                  <code>{getProjectCode(project.id)}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Description & Features */}
          <div className="space-y-4 pt-2">
            <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100 font-mono">Arsitektur &amp; Penjelasan Teknis</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Tech stack */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">Teknologi Terintegrasi</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map(t => (
                <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/70 dark:border-neutral-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
