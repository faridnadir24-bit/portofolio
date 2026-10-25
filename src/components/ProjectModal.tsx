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
  Network,
  Github,
  Volume2,
  Scan,
  Radio,
  Server,
  Zap,
  ShieldAlert,
  Thermometer,
  Pill,
  RefreshCw,
  Box
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

  // 1. AVO-BIO Simulator States
  const [bioPressure, setBioPressure] = useState<number>(34.2);
  const [bioMethane, setBioMethane] = useState<number>(68.5);
  const [bioTemp, setBioTemp] = useState<number>(37.2);

  // 2. LONTAR-AI Simulator States
  const [lontarScanProgress, setLontarScanProgress] = useState<number>(100);
  const [isScanningLontar, setIsScanningLontar] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedManuscriptIndex, setSelectedManuscriptIndex] = useState<number>(0);

  const lontarManuscripts = [
    {
      title: 'Lontar Usadha Taru Premana (Foliant 14b)',
      origin: 'Koleksi Klasik Nusantara · Abad 17',
      aksara: 'ꦱꦧ꧀ꦢꦥꦭꦺꦴꦤ꧀ꦠꦂꦲꦺꦴꦤꦺꦴꦕꦺꦴꦫꦺꦴꦏꦺꦴ',
      latin: 'sabda palon taru premana hanacaraka',
      terjemahan: 'Khasiat sari daun kelor dan temulawak sebagai ramuan penolak racun demam dan penyeimbang suhu raga.',
      context: 'Pedoman medis botani kuno Nusantara yang mencatat lebih dari 150 varietas tanaman obat endemik.'
    },
    {
      title: 'Lontar Sanghyang Siksakanda ng Karesian',
      origin: 'Manuskrip Kuno Sunda · 1518 Masehi',
      aksara: 'ꦤꦢꦶꦤ꧀ꦢꦃꦏꦱꦸꦏꦤ꧀ꦠꦫꦸꦤꦱꦸꦤ꧀ꦢ',
      latin: 'ndah dina kasukan taru na sunda dwipa',
      terjemahan: 'Segala lumbung pangan dan kesuburan air hulu sungai wajib dijaga demi kelestarian anak cucu tanah Sunda.',
      context: 'Hukum tata kelola konservasi air, hutan lindung, dan etika kepemimpinan masyarakat Sunda klasik.'
    }
  ];

  // 3. VANDER-AI Simulator States
  const [flowRate, setFlowRate] = useState<number>(15.0); // mL/min
  const [bedHeight, setBedHeight] = useState<number>(25.0); // cm
  const [valveOpen, setValveOpen] = useState<boolean>(true);

  // 4. PANGANARA AI Simulator States
  const [selectedProvince, setSelectedProvince] = useState<string>('Jawa Barat');
  const provinceData: Record<string, { food: string; type: string; nutrition: string; history: string }> = {
    'Jawa Barat': { food: 'Peuyeum & Tutug Oncom', type: 'Fermentasi Tradisional', nutrition: 'Probiotik Alami, Serat 6.2g', history: 'Metode fermentasi singkong Sunda kuno untuk menjaga ketahanan pangan keluarga.' },
    'Sumatera Barat': { food: 'Rendang Daging & Asam Padeh', type: 'Pengawetan Rempah Tropis', nutrition: 'Protein Tinggi, Antimikroba Alami', history: 'Filosofi masakan Minangkabau dengan teknik karamelisasi santan berdaya simpan hingga berminggu-minggu.' },
    'Sulawesi Selatan': { food: 'Kapurung & Coto', type: 'Olahan Sagu Pesisir', nutrition: 'Karbohidrat Rendah Glikemik', history: 'Pangan pokok berbasis pati sagu sebagai kearifan lumbung pangan pesisir Nusantara.' },
    'Papua': { food: 'Papeda & Ikan Kuah Kuning', type: 'Pangan Pokok Hutan Hujan', nutrition: 'Zat Besi, Rendah Lemak Jenuh', history: 'Sumber ketahanan pangan alami dari pohon sagu liar endemik pulau Papua.' },
    'Nusa Tenggara Timur': { food: 'Jagung Bose & Sei', type: 'Serealia Kering & Pengasapan', nutrition: 'Serat Tinggi, Antioksidan', history: 'Adaptasi iklim semi-arid melalui pengasapan kayu kosambi dan varietas jagung pulut.' },
  };

  // 5. SIGAP Biomassa Failover Simulator
  const [networkMode, setNetworkMode] = useState<'internet' | 'sms' | 'lora'>('internet');
  const [syngasTemp, setSyngasTemp] = useState<number>(765);

  // 6. OBATKU Inventory Simulator
  const [medicineStock, setMedicineStock] = useState([
    { id: 1, name: 'Amoxicillin 500mg', batch: 'AMX-2026-08', expDays: 45, qty: 120, unit: 'Strip', status: 'FEFO_PRIORITY' },
    { id: 2, name: 'Vaksin BCG 2ml (Cold-Chain)', batch: 'BCG-VAK-02', expDays: 190, qty: 35, unit: 'Vial', status: 'COLD_OK' },
    { id: 3, name: 'Paracetamol Drop 15ml', batch: 'PCT-DROPS-11', expDays: 310, qty: 85, unit: 'Botol', status: 'NORMAL' },
  ]);
  const [offlineSyncQueue, setOfflineSyncQueue] = useState<number>(2);

  // Lock body scroll when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Speech synthesis for Lontar-AI
  const handlePlayVoice = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Code Snippets for Engineering tab
  const getProjectCode = (id: string) => {
    switch (id) {
      case 'avo-bio':
        return `// [AVO-BIO v2.0] ESP32 Telemetry Firmware (Embedded C++ / Arduino)
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

      case 'lontar-ai':
        return `// [LONTAR-AI] OCR Transliteration & Web Speech Synthesis Engine (JavaScript)
export class LontarVisionEngine {
  constructor() {
    this.synth = window.speechSynthesis;
  }

  // Segmentasi Aksara Jawa kuno dari citra bounding box daun lontar
  async transcribeBoundingBox(roiImageData) {
    const preprocessed = this.applyOtsuBinarization(roiImageData);
    const glyphVector = await this.extractTopologicalMoments(preprocessed);
    
    // Model klasifikasi Aksara Jawa leksikon kuno
    const predictedChar = this.matchAksaraUnicode(glyphVector);
    return {
      unicodeGlyph: predictedChar.glyph,
      latinTranslit: predictedChar.romanization,
      confidence: predictedChar.score
    };
  }

  // Sintesis Suara Terjemahan Bahasa Indonesia via Web Speech API
  speakTranslation(indonesianText) {
    if (!this.synth) return;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(indonesianText);
    utterance.lang = 'id-ID';
    utterance.pitch = 1.0;
    utterance.rate = 0.92;
    this.synth.speak(utterance);
  }
}`;

      case 'vander-ai':
        return `// [VANDER-AI SCADA v4.2] Fixed-Bed Thomas Breakthrough Kinetic Model (JavaScript)
export function calculateThomasBreakthrough({
  inletConcentrationMgL, // C0: Konsentrasi pewarna tekstil masukan
  flowRateMlMin,         // Q: Laju alir limbah
  bedMassGrams,          // m: Massa adsorben biochar ayam
  timeMinutes            // t: Durasi operasional
}) {
  const kTh = 0.024;    // Konstanta laju Thomas (mL/min·mg)
  const q0  = 48.6;     // Kapasitas adsorpsi maksimum (mg/g)

  // Persamaan Kinetika Thomas: C_t / C_0 = 1 / (1 + exp((kTh * q0 * m / Q) - kTh * C0 * t))
  const exponent = ((kTh * q0 * bedMassGrams) / flowRateMlMin) - (kTh * inletConcentrationMgL * timeMinutes);
  const effluentRatio = 1.0 / (1.0 + Math.exp(exponent));
  const effluentConcentration = inletConcentrationMgL * effluentRatio;

  // Status Katup SCADA Otomatis
  const isBreakthrough = effluentRatio >= 0.05; // Titik terobosan 5%
  return {
    effluentMgL: Number(effluentConcentration.toFixed(2)),
    removalEfficiencyPct: Number(((1 - effluentRatio) * 100).toFixed(1)),
    isBreakthrough,
    scadaAction: isBreakthrough ? 'TRIGGER_SECONDARY_COLUMN' : 'NORMAL_PURIFICATION'
  };
}`;

      case 'panganara-ai':
        return `// [PanganNusantara AI] Google Gemini Multimodal Vector Query (TypeScript)
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function matchCulinaryHeritage(userQuery: string, provinceFilter?: string) {
  // 1. Ekstrak embedding vektor teks query pengguna
  const embedding = await ai.models.embedContent({
    model: 'text-embedding-004',
    content: { parts: [{ text: userQuery }] }
  });

  // 2. Query similarity search ke tabel basis data Supabase (pgvector)
  const { data: results, error } = await supabase.rpc('match_food_vectors', {
    query_vector: embedding.embedding.values,
    match_threshold: 0.78,
    match_count: 5,
    filter_province: provinceFilter || null
  });

  if (error) throw new Error(error.message);
  return results;
}`;

      case 'sigap-biomassa':
        return `// [SIGAP Biomassa] Multi-Protocol Failover Router (C++ / Firmware)
enum UplinkMode { MODE_INTERNET_MQTT, MODE_CELLULAR_SMS, MODE_LORA_RADIO };

UplinkMode currentMode = MODE_INTERNET_MQTT;

void dispatchTelemetryPacket(SyngasTelemetry payload) {
  // 1. Coba kirim via TCP/IP Internet Utama
  if (WiFi.status() == WL_CONNECTED && mqttClient.connected()) {
    mqttClient.publish("scada/sigap/telemetry", serializeCompact(payload));
    currentMode = MODE_INTERNET_MQTT;
    return;
  }

  // 2. Fallback Level 1: Cellular SMS Gateway (Bila internet down)
  if (gsmModem.isNetworkRegistered()) {
    String smsPayload = compressBase64(serializeCompact(payload));
    gsmModem.sendSMS("+6281902716562", smsPayload);
    currentMode = MODE_CELLULAR_SMS;
    return;
  }

  // 3. Fallback Level 2: LoRa 915MHz P2P Radio (Bila BTS/seluler mati total)
  LoRa.beginPacket();
  LoRa.write((uint8_t*)&payload, sizeof(payload));
  LoRa.endPacket();
  currentMode = MODE_LORA_RADIO;
}`;

      case 'obatku-farmasi':
        return `// [OBATKU] Offline-First SQLite Local Repository (Flutter / Dart)
import 'package:sqflite/sqflite.dart';

class LocalMedicineRepository {
  final Database db;
  LocalMedicineRepository(this.db);

  // Mutasi stok offline instan tanpa blocking koneksi internet
  Future<void> recordStockMutation({
    required String batchNo,
    required int quantityDelta,
    required String operatorId,
  }) async {
    await db.transaction((txn) async {
      await txn.rawUpdate(
        'UPDATE medicine_inventory SET qty = qty + ? WHERE batch = ?',
        [quantityDelta, batchNo]
      );

      // Simpan log ke antrean sync lokal
      await txn.insert('sync_mutation_queue', {
        'batch': batchNo,
        'delta': quantityDelta,
        'operator': operatorId,
        'timestamp': DateTime.now().toIso8601String(),
        'synced': 0
      });
    });
  }
}`;

      default:
        return `// [Engineering Prototype] Core Microcontroller Loop
void loop() {
  sampleSensors();
  processLocalState();
  dispatchTelemetry();
  delay(1000);
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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 dark:bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#111215] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200 dark:border-neutral-800 shadow-2xl relative text-left transition-colors"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#111215]/95 backdrop-blur-md px-6 py-4 border-b border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between z-20">
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
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
              {project.categoryLabel}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-700 transition-colors"
                title="Buka Repositori GitHub"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800 transition-colors"
                title="Buka Demo Web Langsung"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Live Demo</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2 bg-neutral-50/50 dark:bg-[#15161b]">
          <button
            onClick={() => setActiveTab('demo')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-semibold border-b-2 transition-all ${
              activeTab === 'demo'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-[#111215] rounded-t-lg'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Simulasi &amp; Hasil</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-semibold border-b-2 transition-all ${
              activeTab === 'architecture'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-[#111215] rounded-t-lg'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Aliran Sistem</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-semibold border-b-2 transition-all ${
              activeTab === 'code'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-[#111215] rounded-t-lg'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Cuplikan Kode</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* Description */}
          <div className="space-y-2">
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* TAB 1: DEMO / SIMULATOR */}
          {activeTab === 'demo' && (
            <div className="space-y-6">

              {/* 1. AVO-BIO SIMULATOR */}
              {project.interactiveType === 'biogas-telemetry' && (
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <span>Simulator Telemetri Sensor ESP32 Digester</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      MQTT: Connected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-[#15161a] p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-500 font-mono">Metana (CH4)</span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 font-mono">{bioMethane}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="95"
                        value={bioMethane}
                        onChange={(e) => setBioMethane(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 cursor-pointer"
                      />
                    </div>

                    <div className="bg-white dark:bg-[#15161a] p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-500 font-mono">Tekanan (kPa)</span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 font-mono">{bioPressure} kPa</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        step="0.5"
                        value={bioPressure}
                        onChange={(e) => setBioPressure(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 cursor-pointer"
                      />
                    </div>

                    <div className="bg-white dark:bg-[#15161a] p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-500 font-mono">Suhu (°C)</span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 font-mono">{bioTemp}°C</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="60"
                        step="0.2"
                        value={bioTemp}
                        onChange={(e) => setBioTemp(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50/50 dark:bg-blue-950/20 p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="text-blue-900 dark:text-blue-300 font-medium">
                      Estimasi Output Energi Setara: <strong className="font-mono">{((bioMethane * bioPressure) / 210).toFixed(2)} kWh/hari</strong>
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400 font-mono">
                      Setara {(((bioMethane * bioPressure) / 210) * 0.22).toFixed(1)} Tabung LPG 3kg / minggu
                    </span>
                  </div>
                </div>
              )}

              {/* 2. LONTAR-AI SIMULATOR */}
              {project.interactiveType === 'lontar-scanner' && (
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide flex items-center gap-2">
                      <Scan className="w-4 h-4 text-amber-500" />
                      <span>Optical Viewfinder &amp; Aksara Jawa OCR</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {lontarManuscripts.map((m, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedManuscriptIndex(idx)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-colors ${
                            selectedManuscriptIndex === idx
                              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                              : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                          }`}
                        >
                          Foliant {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Viewfinder display */}
                  <div className="relative rounded-xl overflow-hidden border border-amber-900/20 dark:border-amber-500/20 bg-neutral-900 text-amber-100 p-5 space-y-3 font-mono">
                    <div className="flex items-center justify-between text-[11px] text-amber-400/80 border-b border-amber-500/20 pb-2">
                      <span>{lontarManuscripts[selectedManuscriptIndex].title}</span>
                      <span>{lontarManuscripts[selectedManuscriptIndex].origin}</span>
                    </div>

                    {/* Aksara Script Display */}
                    <div className="py-3 text-center">
                      <p className="text-2xl sm:text-3xl text-amber-300 tracking-widest select-none">
                        {lontarManuscripts[selectedManuscriptIndex].aksara}
                      </p>
                      <p className="text-xs text-amber-200/70 italic mt-1.5">
                        Transliterasi Latin: "{lontarManuscripts[selectedManuscriptIndex].latin}"
                      </p>
                    </div>

                    {/* Translation result */}
                    <div className="bg-black/50 p-3.5 rounded-lg border border-amber-500/20 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-amber-400 uppercase font-semibold">Terjemahan Modern (Bahasa Indonesia)</span>
                        <button
                          onClick={() => handlePlayVoice(lontarManuscripts[selectedManuscriptIndex].terjemahan)}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 transition-colors"
                          title="Putar Suara Sintesis (Web Speech API)"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-pulse text-amber-300' : ''}`} />
                          <span>{isPlayingAudio ? 'Memutar...' : 'Putar Audio'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-amber-100/90 leading-relaxed font-sans">
                        {lontarManuscripts[selectedManuscriptIndex].terjemahan}
                      </p>
                      <p className="text-[11px] text-neutral-400 font-sans italic pt-1 border-t border-white/5">
                        {lontarManuscripts[selectedManuscriptIndex].context}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. VANDER-AI SIMULATOR */}
              {project.interactiveType === 'vander-scada' && (
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Enterprise SCADA v4.2 Fixed-Bed Biochar Digital Twin</span>
                    </span>
                    <button
                      onClick={() => setValveOpen(!valveOpen)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-colors ${
                        valveOpen 
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                      }`}
                    >
                      Katup V-01: {valveOpen ? 'TERBUKA (ON)' : 'TERTUTUP (OFF)'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-[#15161a] p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-500 font-mono">Laju Alir (Q)</span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 font-mono">{flowRate} mL/menit</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="35"
                        step="1"
                        value={flowRate}
                        onChange={(e) => setFlowRate(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 cursor-pointer"
                      />
                    </div>

                    <div className="bg-white dark:bg-[#15161a] p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-500 font-mono">Tinggi Bed Adsorben (Z)</span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 font-mono">{bedHeight} cm</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="40"
                        step="1"
                        value={bedHeight}
                        onChange={(e) => setBedHeight(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-white dark:bg-[#15161a] rounded-xl border border-neutral-200/80 dark:border-neutral-800">
                      <p className="text-[10px] text-neutral-400 font-mono">Waktu Terobosan</p>
                      <p className="text-base font-bold text-neutral-900 dark:text-neutral-100 font-mono mt-0.5">
                        {valveOpen ? `${((bedHeight * 8.4) / (flowRate * 0.45)).toFixed(1)} jam` : '0 jam'}
                      </p>
                    </div>
                    <div className="p-3 bg-white dark:bg-[#15161a] rounded-xl border border-neutral-200/80 dark:border-neutral-800">
                      <p className="text-[10px] text-neutral-400 font-mono">Efisiensi Reduksi</p>
                      <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                        {valveOpen ? `${(98.2 - (flowRate * 0.3)).toFixed(1)}%` : '0%'}
                      </p>
                    </div>
                    <div className="p-3 bg-white dark:bg-[#15161a] rounded-xl border border-neutral-200/80 dark:border-neutral-800">
                      <p className="text-[10px] text-neutral-400 font-mono">Kinetika Model</p>
                      <p className="text-base font-bold text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                        Thomas / Yoon
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. PANGANARA AI SIMULATOR */}
              {project.interactiveType === 'pangan-map' && (
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>Eksplorasi Spasial 38 Provinsi &amp; Vektor Gizi</span>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">Peta GeoJSON Cerdas</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(provinceData).map((p) => (
                      <button
                        key={p}
                        onClick={() => setSelectedProvince(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedProvince === p
                            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                            : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white dark:bg-[#15161a] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-base">
                        {provinceData[selectedProvince].food}
                      </h4>
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {provinceData[selectedProvince].type}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                      Profil Nutrisi: {provinceData[selectedProvince].nutrition}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1 border-t border-neutral-100 dark:border-neutral-800">
                      {provinceData[selectedProvince].history}
                    </p>
                  </div>
                </div>
              )}

              {/* 5. SIGAP BIOMASSA SIMULATOR */}
              {project.interactiveType === 'sigap-telemetry' && (
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-600" />
                      <span>Simulasi Multi-Hop Failover Router (Daerah 3T)</span>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">Offline-First Protocol</span>
                  </div>

                  {/* Failover Mode Selector */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setNetworkMode('internet')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        networkMode === 'internet'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold shadow-xs'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15161a] text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span>Tier 1</span>
                        <Zap className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <p className="text-xs font-bold">Internet IP</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">MQTT Cloud Socket</p>
                    </button>

                    <button
                      onClick={() => setNetworkMode('sms')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        networkMode === 'sms'
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold shadow-xs'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15161a] text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span>Tier 2 (Failover)</span>
                        <Radio className="w-3.5 h-3.5 text-amber-500" />
                      </div>
                      <p className="text-xs font-bold">Cellular SMS</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Base64 Encoded Packet</p>
                    </button>

                    <button
                      onClick={() => setNetworkMode('lora')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        networkMode === 'lora'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold shadow-xs'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15161a] text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span>Tier 3 (Emergency)</span>
                        <Activity className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <p className="text-xs font-bold">LoRa 915MHz</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Peer-to-Peer Radio</p>
                    </button>
                  </div>

                  <div className="p-3.5 bg-neutral-900 text-neutral-200 rounded-xl font-mono text-xs space-y-1.5">
                    <div className="flex justify-between text-neutral-400 text-[11px] border-b border-neutral-800 pb-1">
                      <span>Status Router: {networkMode.toUpperCase()}</span>
                      <span className="text-emerald-400">Packet Loss: 0.00%</span>
                    </div>
                    <p className="text-neutral-300">
                      Suhu Reaktor Gasifier: <strong className="text-amber-400">{syngasTemp}°C</strong> (Zona Reduksi Stabil)
                    </p>
                    <p className="text-neutral-400 text-[11px]">
                      Kapasitas Generator Listrik: 15 kVA · Elektrifikasi 45 Rumah Desa Terpencil
                    </p>
                  </div>
                </div>
              )}

              {/* 6. OBATKU INVENTORY SIMULATOR */}
              {project.interactiveType === 'obatku-inventory' && (
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide flex items-center gap-2">
                      <Pill className="w-4 h-4 text-blue-600" />
                      <span>Manajemen Stok Puskesmas 3T &amp; Rantai Dingin</span>
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      Suhu Vaksin: 4.2°C (Aman: 2-8°C)
                    </span>
                  </div>

                  <div className="space-y-2">
                    {medicineStock.map((med) => (
                      <div
                        key={med.id}
                        className="p-3 bg-white dark:bg-[#15161a] rounded-xl border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-neutral-900 dark:text-neutral-100">{med.name}</p>
                          <p className="text-[11px] font-mono text-neutral-500">Batch: {med.batch} · Exp: {med.expDays} hari lagi</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                            med.status === 'FEFO_PRIORITY' 
                              ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                          }`}>
                            {med.status === 'FEFO_PRIORITY' ? 'Prioritas Keluar (FEFO)' : 'Stok Aman'}
                          </span>
                          <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">{med.qty} {med.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono pt-1">
                    <span>Antrean Sinkronisasi Offline: {offlineSyncQueue} transaksi lokal</span>
                    <button
                      onClick={() => setOfflineSyncQueue(0)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Sinkronisasi Cloud</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Key Features List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                  Fitur Rekayasa Kunci
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-[#15161a] border border-neutral-100 dark:border-neutral-800/80 text-xs text-neutral-700 dark:text-neutral-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SYSTEM ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Diagram Aliran &amp; Topologi Sistem</span>
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">Arsitektur Produksi</span>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-[#15161a] border border-neutral-200/80 dark:border-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-200 leading-relaxed overflow-x-auto">
                  {project.architectureSummary}
                </div>

                {/* Tech Stack Breakdown */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                    Teknologi &amp; Protokol yang Digunakan
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-white dark:bg-[#15161a] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CODE SNIPPET */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Implementasi Kode Nyata</span>
                </span>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Tersalin' : 'Salin Kode'}</span>
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#0d0e12] p-4 text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed max-h-[50vh]">
                <pre>{getProjectCode(project.id)}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-[#15161b]">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{project.githubRepoName || 'Lihat di GitHub'} ↗</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
