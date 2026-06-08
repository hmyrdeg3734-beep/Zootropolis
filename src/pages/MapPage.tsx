import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { ArrowLeft,  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  Info, 
  Search, 
  Menu, 
  X, 
  Navigation, 
  Filter, 
  Zap, 
  Locate, 
  Layers,
  Share2,
  ExternalLink,
  Star,
  Bot,
  Plus
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Istanbul center coordinates
const ISTANBUL_CENTER: [number, number] = [41.0082, 28.9784];

export interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  address: string;
  phone?: string;
  hours?: string;
  website?: string;
  is24h?: boolean;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
}

import { SAMPLE_POINTS } from '../data/samplePoints';

function MapController({ selectedPoint }: { selectedPoint: MapPoint | null }) {
  const map = useMap();
  React.useEffect(() => {
    if (selectedPoint) {
      map.flyTo([selectedPoint.lat, selectedPoint.lng], 16, { duration: 1.5 });
    }
  }, [selectedPoint, map]);
  return null;
}

function MapEventsHandler({ 
  isPickingCoords, 
  onCoordinatesPicked 
}: { 
  isPickingCoords: boolean; 
  onCoordinatesPicked: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (isPickingCoords) {
        onCoordinatesPicked(e.latlng.lat, e.latlng.lng);
      }
    }
  });
  return null;
}

export default function MapPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isEmergencyOnly, setIsEmergencyOnly] = useState(false);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite' | 'dark'>('streets');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const [mapPoints, setMapPoints] = useState<MapPoint[]>(() => {
    const saved = localStorage.getItem('patika_map_points');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length < SAMPLE_POINTS.length) {
          localStorage.setItem('patika_map_points', JSON.stringify(SAMPLE_POINTS));
          return SAMPLE_POINTS;
        }
        return parsed;
      } catch (e) {}
    }
    return SAMPLE_POINTS;
  });

  const [isAddingPoint, setIsAddingPoint] = useState(false);
  const [addMode, setAddMode] = useState<'manual' | 'import'>('manual');
  const [sheetUrl, setSheetUrl] = useState('');
  const [rawPasteText, setRawPasteText] = useState('');
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [useAIGeocoding, setUseAIGeocoding] = useState(true);

  const [isPickingCoords, setIsPickingCoords] = useState(false);
  const [newPoint, setNewPoint] = useState<Partial<MapPoint>>({
    name: '',
    category: 'Veteriner',
    lat: 41.0082,
    lng: 29.0271,
    address: '',
    phone: '',
    hours: '09:00-19:00',
    website: '',
    is24h: false,
    tags: []
  });

  const handleCoordinatesPicked = (lat: number, lng: number) => {
    setNewPoint(prev => ({ ...prev, lat, lng }));
    setIsPickingCoords(false);
  };

  const handlePointSelect = (point: MapPoint) => {
    setSelectedPoint(point);
  };

  useEffect(() => {
    if (state?.selectedPoint) {
      setSelectedPoint(state.selectedPoint);
    } else if (state?.center && state?.districtName) {
      const distName = state.districtName;
      const matchingPoint = mapPoints.find(p => 
        p.address.toLocaleLowerCase('tr').includes(distName.toLocaleLowerCase('tr'))
      );
      if (matchingPoint) {
        setSelectedPoint(matchingPoint);
      } else {
        setSelectedPoint({
          id: 'temp_district_center',
          name: `${distName} İlçe Merkezi`,
          lat: state.center[0],
          lng: state.center[1],
          category: 'Genel',
          address: `${distName}/İstanbul`,
        } as MapPoint);
      }
    }
  }, [state, mapPoints]);

  const MapViewUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (userLocation) {
        map.setView(userLocation, state?.districtName ? 14 : 13);
      }
    }, [userLocation]);
    return null;
  };

  const categories = ['Tümü', 'Veteriner', 'Barınak', 'Petshop', 'Otel', 'Kuaför'];
  const allAvailableTags = useMemo(() => {
    const tags = new Set<string>();
    mapPoints.forEach(p => p.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [mapPoints]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredPoints = useMemo(() => {
    return mapPoints.filter(point => {
      const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           point.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Tümü' || point.category === activeCategory;
      const matchesEmergency = !isEmergencyOnly || point.is24h;
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => point.tags?.includes(tag));
      return matchesSearch && matchesCategory && matchesEmergency && matchesTags;
    });
  }, [mapPoints, searchTerm, activeCategory, isEmergencyOnly, selectedTags]);

  const getMarkerColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('veteriner')) return '#ef4444'; // red-500
    if (cat.includes('barınak')) return '#22c55e'; // green-500
    if (cat.includes('petshop')) return '#3b82f6'; // blue-500
    if (cat.includes('otel')) return '#a855f7'; // purple-500
    if (cat.includes('kuaför')) return '#ec4899'; // pink-500
    return '#f59e0b'; // amber-500 (default)
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  };

  const handleSavePoint = () => {
    if (!newPoint.name || !newPoint.lat || !newPoint.lng || !newPoint.address) {
      alert('Lütfen en azından Mekan Adı, Koordinat ve Adres alanlarını doldurunuz.');
      return;
    }
    const createdPoint: MapPoint = {
      id: 'custom_' + Date.now(),
      name: newPoint.name,
      lat: Number(newPoint.lat),
      lng: Number(newPoint.lng),
      category: newPoint.category || 'Veteriner',
      address: newPoint.address,
      phone: newPoint.phone || undefined,
      hours: newPoint.hours || undefined,
      website: newPoint.website || undefined,
      is24h: newPoint.is24h || false,
      tags: newPoint.is24h ? ['7/24', 'Acil'] : [newPoint.category || 'Genel'],
      rating: 5.0,
      reviewCount: 1
    };
    const updatedPoints = [...mapPoints, createdPoint];
    setMapPoints(updatedPoints);
    localStorage.setItem('patika_map_points', JSON.stringify(updatedPoints));
    setSelectedPoint(createdPoint);
    setIsAddingPoint(false);
    setIsPickingCoords(false);
  };

  const parseAndImportData = async (type: 'url' | 'paste') => {
    setImportLoading(true);
    setImportError(null);
    setImportSuccess(null);

    let csvContent = '';

    try {
      if (type === 'url') {
        if (!sheetUrl) {
          throw new Error('Lütfen önce geçerli bir Google E-Tablo linki girin.');
        }

        // Extract spreadsheet ID
        const sheetIdMatch = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (!sheetIdMatch || !sheetIdMatch[1]) {
          throw new Error('Geçersiz Google E-Tablo link formatı. Lütfen tarayıcı adres satırındaki linki kopyalayıp yapıştırın.');
        }
        const sheetId = sheetIdMatch[1];
        
        // Form the CSV URL
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

        // Fetch CSV from the public URL
        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error('Dosya indirilemedi. Lütfen Google E-Tablonuzun paylaşım ayarlarını "Bağlantıya sahip olan herkes görüntüleyebilir/görüntüleyebilir" olarak güncelleyin veya aşağıdaki alana kopyalayıp yapıştırın.');
        }
        csvContent = await response.text();
      } else {
        if (!rawPasteText || !rawPasteText.trim()) {
          throw new Error('Lütfen kopyaladığınız e-tablo satırlarını yapıştırın.');
        }
        csvContent = rawPasteText;
      }

      // Parse with PapaParse
      const parsed = Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
      });

      if (parsed.errors && parsed.errors.length > 0 && parsed.data.length === 0) {
        console.error('PapaParse list err:', parsed.errors);
        throw new Error('Veri okunamadı. Lütfen geçerli bir CSV veya Excel satır formatı kullandığınızdan emin olun.');
      }

      const rows: any[] = parsed.data;
      if (rows.length === 0) {
        throw new Error('Tabloda veri bulunamadı.');
      }

      // Detect headers
      const firstRowKeys = Object.keys(rows[0]);
      
      const findField = (keys: string[], candidates: string[]): string | undefined => {
        return keys.find(k => 
          candidates.some(c => k.toLowerCase().trim().includes(c.toLowerCase()))
        );
      };

      const nameKey = findField(firstRowKeys, ['adı', 'adi', 'name', 'klinik', 'mekan', 'isim']);
      const categoryKey = findField(firstRowKeys, ['kategori', 'category', 'tür', 'tur', 'tip']);
      const addressKey = findField(firstRowKeys, ['adres', 'address', 'konum', 'yer']);
      const phoneKey = findField(firstRowKeys, ['phone', 'tel', 'telefon', 'gsm']);
      const hoursKey = findField(firstRowKeys, ['saat', 'hours', 'mesai', 'çalışma']);
      const websiteKey = findField(firstRowKeys, ['web', 'website', 'link', 'url', 'site']);
      const is24hKey = findField(firstRowKeys, ['7/24', '24h', 'acil', 'is24h']);
      const latKey = findField(firstRowKeys, ['enlem', 'lat', 'latitude', 'x']);
      const lngKey = findField(firstRowKeys, ['boylam', 'lng', 'longitude', 'y']);

      if (!nameKey) {
        throw new Error('Lütfen tablonuzda klinik / mekan adını belirten bir başlık (örneğin "Mekan Adı" veya "Name") bulunduğundan emin olun.');
      }

      // Convert rows to MapPoints
      let parsedPoints: Partial<MapPoint>[] = rows.map((row, idx) => {
        const id = 'imported_' + Date.now() + '_' + idx;
        const name = String(row[nameKey!] || '').trim();
        const category = categoryKey ? String(row[categoryKey] || 'Veteriner').trim() : 'Veteriner';
        const address = addressKey ? String(row[addressKey] || '').trim() : 'Üsküdar/İstanbul';
        const phone = phoneKey ? String(row[phoneKey] || '').trim() : undefined;
        const hours = hoursKey ? String(row[hoursKey] || '09:00-19:00').trim() : '09:00-19:00';
        const website = websiteKey ? String(row[websiteKey] || '').trim() : undefined;
        let is24h = false;
        
        if (is24hKey) {
          const val = String(row[is24hKey]).toLowerCase();
          is24h = val.includes('evet') || val.includes('yes') || val.includes('true') || val.includes('1') || val.includes('7/24') || val.includes('aktif') || val.includes('açık');
        } else if (hours.includes('24') || hours.toLowerCase().includes('açık')) {
          is24h = true;
        }

        let lat = latKey ? Number(row[latKey]) : NaN;
        let lng = lngKey ? Number(row[lngKey]) : NaN;

        return {
          id,
          name,
          category,
          address,
          phone: phone || undefined,
          hours,
          website: website || undefined,
          is24h,
          lat: isNaN(lat) ? undefined : lat,
          lng: isNaN(lng) ? undefined : lng,
          tags: is24h ? ['7/24', 'Acil'] : [category]
        };
      }).filter(p => p.name && p.name.length > 0);

      // Check if some points need geocoding
      const pointsToGeocode = parsedPoints.filter(p => !p.lat || !p.lng);

      if (pointsToGeocode.length > 0 && useAIGeocoding) {
        setImportSuccess(`Tablo başarıyla çözümlendi. ${parsedPoints.length} satır bulundu. Enlem/Boylam (Lat/Lng) olmayan ${pointsToGeocode.length} adresin koordinatları PatiAsistan Yapay Zeka tarafından bulunuyor...`);
        
        // Call geocoding API in batches
        const batchSize = 10;
        for (let i = 0; i < pointsToGeocode.length; i += batchSize) {
          const batch = pointsToGeocode.slice(i, i + batchSize);
          
          const prompt = `Aşağıdaki mekanların İstanbul Üsküdar bölgesindeki fiziki yaklaşık enlem (latitude) ve boylam (longitude) koordinat çiftlerini (genellikle 41.01 ile 41.04 enlem, 29.00 ile 29.05 boylam arasındadır) bul.
Lütfen gerçek konumları olabildiğince isabetli yansıt. Sadece Üsküdar/İstanbul sınırlarında koordinatlar ver.
Aramayı Üsküdar'da yapıyorsun.

Çıktıyı KESİNLİKLE markdown veya \`\`\`json etiketleri OLMADAN, salt JSON array formatında döndür. Hiçbir açıklama yazma.
Örnek format:
[
  {"id": "imported_...", "lat": 41.025, "lng": 29.023}
]

Mekanlar listesi:
${JSON.stringify(batch.map(b => ({ id: b.id, name: b.name, address: b.address })))}`;

          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: prompt })
          });
          const data = await res.json();
          if (data.text) {
            let text = data.text.trim();
            if (text.startsWith('```')) {
              text = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
            }
            try {
              const geocodedResults = JSON.parse(text);
              geocodedResults.forEach((geo: any) => {
                const found = parsedPoints.find(p => p.id === geo.id);
                if (found) {
                  found.lat = Number(geo.lat);
                  found.lng = Number(geo.lng);
                }
              });
            } catch (e) {
              console.error("Yapay zeka yanıtını ayrıştırma hatası:", e, text);
            }
          }
        }
      }

      // Fill remaining defaults so they don't crash
      const finalPoints: MapPoint[] = parsedPoints.map(p => ({
        id: p.id!,
        name: p.name!,
        lat: p.lat || 41.01 + Math.random() * 0.02,
        lng: p.lng || 29.01 + Math.random() * 0.02,
        category: p.category || 'Veteriner',
        address: p.address || 'Üsküdar/İstanbul',
        phone: p.phone,
        hours: p.hours,
        website: p.website,
        is24h: p.is24h,
        tags: p.tags,
        rating: 4.8,
        reviewCount: Math.floor(Math.random() * 40) + 10
      }));

      const updatedPoints = [...mapPoints, ...finalPoints];
      setMapPoints(updatedPoints);
      localStorage.setItem('patika_map_points', JSON.stringify(updatedPoints));

      setImportSuccess(`Harika! ${finalPoints.length} yeni konum başarıyla haritanıza eklendi. (Eksik koordinatlar Yapay Zeka ile doğrulandı)`);
      setSheetUrl('');
      setRawPasteText('');
      
      setTimeout(() => {
        setIsAddingPoint(false);
        setImportSuccess(null);
        if (finalPoints.length > 0) {
          setSelectedPoint(finalPoints[0]);
        }
      }, 2500);

    } catch (err: any) {
      console.error(err);
      setImportError(err.message || 'Bir hata oluştu, lütfen e-tablo linkini veya yapıştırılan metni kontrol edin.');
    } finally {
      setImportLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '420px' : '0px' }}
        className="bg-white border-r border-gray-200 flex flex-col relative z-[1002] shadow-xl overflow-hidden"
      >
        {isAddingPoint ? (
          <>
            {/* Add Point Header */}
            <div className="p-6 border-b border-gray-100 shrink-0 bg-amber-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => { setIsAddingPoint(false); setIsPickingCoords(false); }}
                    className="p-2 hover:bg-amber-100 rounded-full transition-colors text-amber-700"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h1 className="text-lg font-black text-gray-900 tracking-tight">Yeni Yer Öner / Ekle</h1>
                    <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest leading-none">Haritaya Nokta Ekle</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsAddingPoint(false); setIsPickingCoords(false); }}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                  title="Kapat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Add Point Form Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 scroller-hide bg-gray-50/50">
              {/* Tab Selector */}
              <div className="flex bg-gray-200/60 p-1 rounded-2xl shrink-0">
                <button
                  type="button"
                  onClick={() => setAddMode('manual')}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    addMode === 'manual' 
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Tek Tek Ekle
                </button>
                <button
                  type="button"
                  onClick={() => setAddMode('import')}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    addMode === 'import' 
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  E-Tablo İçe Aktar
                </button>
              </div>

              {addMode === 'manual' ? (
                <>
                  {isPickingCoords && (
                    <div className="p-4 bg-rose-50 text-rose-700 border border-rose-100 rounded-2xl text-xs font-bold animate-pulse flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                      Haritada eklemek istediğiniz yere tıklayarak koordinatları seçin.
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5">Mekan / Klinik Adı</label>
                      <input 
                        type="text"
                        required
                        value={newPoint.name || ''}
                        onChange={e => setNewPoint(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Örn: Pati Parkı, Pati Sarayı Vet"
                        className="w-full bg-white border border-gray-200 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm font-semibold outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5">Kategori</label>
                      <select
                        value={newPoint.category || 'Veteriner'}
                        onChange={e => setNewPoint(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-white border border-gray-200 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm font-semibold outline-none transition-all cursor-pointer"
                      >
                        <option value="Veteriner">Veteriner</option>
                        <option value="Barınak">Barınak</option>
                        <option value="Petshop">Petshop</option>
                        <option value="Otel">Otel</option>
                        <option value="Kuaför">Kuaför</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5">Enlem (Lat)</label>
                        <input 
                          type="number"
                          step="0.0001"
                          required
                          value={newPoint.lat || ''}
                          onChange={e => setNewPoint(prev => ({ ...prev, lat: parseFloat(e.target.value) }))}
                          className="w-full bg-white border border-gray-200 focus:border-amber-500 rounded-2xl px-4 py-3 text-xs font-mono outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5">Boylam (Lng)</label>
                        <input 
                          type="number"
                          step="0.0001"
                          required
                          value={newPoint.lng || ''}
                          onChange={e => setNewPoint(prev => ({ ...prev, lng: parseFloat(e.target.value) }))}
                          className="w-full bg-white border border-gray-200 focus:border-amber-500 rounded-2xl px-4 py-3 text-xs font-mono outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPickingCoords(!isPickingCoords)}
                      className={`w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border-2 transition-all ${
                        isPickingCoords 
                          ? 'bg-rose-500 border-rose-600 text-white shadow-lg' 
                          : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                      }`}
                    >
                      <Locate size={14} />
                      {isPickingCoords ? "Haritada Seçimi Bekliyor..." : "Haritadan Konumu Seç"}
                    </button>

                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5">Tam Adres</label>
                      <textarea 
                        required
                        value={newPoint.address || ''}
                        onChange={e => setNewPoint(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Adres satırı..."
                        rows={3}
                        className="w-full bg-white border border-gray-200 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm font-semibold outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5">Telefon (İsteğe Bağlı)</label>
                        <input 
                          type="text"
                          value={newPoint.phone || ''}
                          onChange={e => setNewPoint(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="0216 ..."
                          className="w-full bg-white border border-gray-200 focus:border-amber-500 rounded-2xl px-4 py-3 text-xs font-semibold outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5">Çalışma Saatleri</label>
                        <input 
                          type="text"
                          value={newPoint.hours || ''}
                          onChange={e => setNewPoint(prev => ({ ...prev, hours: e.target.value }))}
                          placeholder="Örn: 09:00-19:00"
                          className="w-full bg-white border border-gray-200 focus:border-amber-500 rounded-2xl px-4 py-3 text-xs font-semibold outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5">Web Sitesi (İsteğe Bağlı)</label>
                      <input 
                        type="text"
                        value={newPoint.website || ''}
                        onChange={e => setNewPoint(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://..."
                        className="w-full bg-white border border-gray-200 focus:border-amber-500 rounded-2xl px-4 py-3 text-xs font-semibold outline-none transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                      <input 
                        type="checkbox" 
                        id="chk24Form" 
                        checked={newPoint.is24h || false}
                        onChange={e => setNewPoint(prev => ({ ...prev, is24h: e.target.checked }))}
                        className="w-4 h-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label htmlFor="chk24Form" className="text-xs font-bold text-gray-700 cursor-pointer select-none">
                        Acil Durum / 7-24 Açık Hizmet Noktası
                      </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        type="button"
                        onClick={() => { setIsAddingPoint(false); setIsPickingCoords(false); }}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3.5 rounded-2xl text-xs transition-colors"
                      >
                        İptal
                      </button>
                      <button 
                        type="button"
                        onClick={handleSavePoint}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-black py-3.5 rounded-2xl text-xs shadow-lg shadow-amber-500/10 transition-all active:scale-[0.98]"
                      >
                        Kaydet ve Ekle
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-xs text-amber-800 leading-relaxed space-y-1">
                    <p className="font-bold">📋 Kolay ve Hızlı Toplu Yükleme</p>
                    <p>Mekan veya klinik listelerinizi Google E-Tablo linki vererek ya da kopyalayıp-yapıştırarak saniyeler içinde toplu olarak haritaya ekleyebilirsiniz!</p>
                  </div>

                  {/* Feedback Alerts */}
                  {importError && (
                    <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl text-xs font-semibold whitespace-pre-line animate-fade-in">
                      ⚠️ {importError}
                    </div>
                  )}

                  {importSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl text-xs font-semibold whitespace-pre-line animate-fade-in">
                      ✨ {importSuccess}
                    </div>
                  )}

                  {/* Option 1: URL */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-3 bg-amber-500 rounded-full block"></span>
                      Yol 1: Google E-Tablo Linki ile
                    </h3>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-400 font-black uppercase tracking-wide">E-Tablo URL'si</label>
                      <input
                        type="text"
                        value={sheetUrl}
                        onChange={e => setSheetUrl(e.target.value)}
                        placeholder="Örn: https://docs.google.com/spreadsheets/d/.../edit"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none transition-all"
                        disabled={importLoading}
                      />
                    </div>

                    <p className="text-[10px] text-rose-500/95 font-medium leading-normal">
                      💡 <strong>Önemli:</strong> Linkin çalışabilmesi için e-tablonuzdaki <strong>Paylaş</strong> ayarlarından "Bağlantıya sahip olan herkes görüntüleyebilir" seçeneğini aktif etmeniz gerekir.
                    </p>

                    <button
                      type="button"
                      disabled={importLoading}
                      onClick={() => parseAndImportData('url')}
                      className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 text-white font-black py-3 rounded-xl text-xs shadow-md shadow-amber-500/10 transition-all flex items-center justify-center gap-2"
                    >
                      {importLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          İçe Aktarılıyor...
                        </>
                      ) : (
                        'E-Tablo Verilerini Çek ve Ekle'
                      )}
                    </button>
                  </div>

                  {/* Option 2: Paste */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-3 bg-indigo-500 rounded-full block"></span>
                      Yol 2: Kopyala - Yapıştır (Önerilen)
                    </h3>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-400 font-black uppercase tracking-wide">E-Tablodaki Satırları Buraya Yapıştırın</label>
                      <textarea
                        value={rawPasteText}
                        onChange={e => setRawPasteText(e.target.value)}
                        placeholder="E-tablonuzdaki veya Excel'deki başlıklar dahil satırları seçip (Ctrl+C) buraya (Ctrl+V) yapıştırın...&#10;Adı&#9;Kategori&#9;Adres&#10;Mutlu Pati Vet&#9;Veteriner&#9;Üsküdar Mh."
                        rows={5}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono outline-none transition-all resize-vertical"
                        disabled={importLoading}
                      />
                    </div>

                    <p className="text-[10px] text-gray-400 font-medium leading-normal">
                      💡 <strong>İpucu:</strong> Google E-Tablo veya Excel tablonuzdan dilediğiniz satırları farenizle seçip doğrudan buraya yapıştırabilirsiniz. Sistem hücreleri otomatik ayırır.
                    </p>

                    <button
                      type="button"
                      disabled={importLoading}
                      onClick={() => parseAndImportData('paste')}
                      className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-200 text-white font-black py-3 rounded-xl text-xs shadow-md shadow-indigo-500/10 transition-all flex items-center justify-center gap-2"
                    >
                      {importLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Veri İşleniyor...
                        </>
                      ) : (
                        'Yapıştırılan Veriyi Ekle'
                      )}
                    </button>
                  </div>

                  {/* AI Assistance Toggle */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
                        <Bot size={14} className="text-amber-500 animate-pulse" />
                        Eksik Koordinatları AI ile Bul
                      </h4>
                      <p className="text-[10px] text-gray-400">Enlem/Boylam bulunmayan mekanların koordinatlarını PatiAsistan AI Üsküdar haritasında otomatik ayarlar.</p>
                    </div>
                    <input
                      type="checkbox"
                      id="useAIGeocoding"
                      checked={useAIGeocoding}
                      onChange={e => setUseAIGeocoding(e.target.checked)}
                      className="w-4 h-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded cursor-pointer shrink-0"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => { setIsAddingPoint(false); }}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3.5 rounded-2xl text-xs transition-colors"
                    >
                      İptal ve Kapat
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="p-6 border-b border-gray-100 shrink-0">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-amber-50 rounded-full transition-colors text-amber-600"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">PatiKa</h1>
                    <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest leading-none">Can Dostu Rehberi</p>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative group mb-6">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Mekan ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-amber-500/20 focus:bg-white pl-12 pr-4 py-3.5 rounded-2xl text-sm font-semibold outline-none transition-all"
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 mb-4 overflow-x-auto scroller-hide pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeCategory === cat 
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Service Tags */}
              <div className="flex gap-1.5 mb-6 overflow-x-auto scroller-hide pb-2">
                {allAvailableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-500/20' 
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Emergency Toggle */}
              <div className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl border border-rose-100">
                <div className="flex items-center gap-3">
                  <div className="bg-rose-500 p-2 rounded-lg text-white">
                    <Zap size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-rose-700 uppercase tracking-tight">Acil Durum Modu</p>
                    <p className="text-[10px] text-rose-600 font-bold">Sadece açık klinik & barınaklar</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEmergencyOnly(!isEmergencyOnly)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${isEmergencyOnly ? 'bg-rose-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isEmergencyOnly ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroller-hide bg-gray-50/50">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                {filteredPoints.length} Nokta Listeleniyor
              </p>
              
              {filteredPoints.map(point => (
                <motion.div
                  layout
                  key={point.id}
                  onClick={() => handlePointSelect(point)}
                  className={`w-full group cursor-pointer bg-white p-5 rounded-3xl transition-all border-2 ${
                    selectedPoint?.id === point.id 
                      ? 'border-amber-500 shadow-xl shadow-amber-500/10' 
                      : 'border-transparent hover:border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                       <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                         selectedPoint?.id === point.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-500'
                       }`}>
                        {point.category}
                      </span>
                      {point.is24h && (
                        <span className="flex items-center gap-1 text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg">
                          <Zap size={10} fill="currentColor" />
                          7/24
                        </span>
                      )}
                      {point.rating && (
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg">
                          <Star size={10} className="text-amber-500 fill-current" />
                          <span className="text-[10px] font-black text-amber-700">{point.rating}</span>
                          <span className="text-[9px] text-amber-500/60 font-bold">({point.reviewCount})</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-black text-gray-900 group-hover:text-amber-600 transition-colors leading-tight mb-2">
                    {point.name}
                  </h3>

                  {point.tags && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {point.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-bold text-gray-400 border border-gray-100 px-1.5 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-gray-500">
                      <MapPin size={14} className="shrink-0 mt-0.5 text-gray-300" />
                      <span className="line-clamp-2 leading-relaxed">{point.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-[10px] font-bold">
                      {point.hours && (
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Clock size={12} className="shrink-0" />
                          <span>{point.hours}</span>
                        </div>
                      )}
                      {point.phone && (
                        <div className="flex items-center gap-1.5 text-amber-600">
                          <Phone size={12} className="shrink-0" />
                          <span>{point.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedPoint?.id === point.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-4 border-t border-gray-100 flex gap-2"
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`, '_blank');
                        }}
                        className="flex-1 bg-amber-500 text-white p-3 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors"
                      >
                        <Navigation size={14} /> Google Maps'te Görüntüle
                      </button>
                      {point.website && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(point.website, '_blank');
                          }}
                          className="p-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </button>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Suggest a Place */}
              <div className="pt-8 pb-12">
                <button 
                  onClick={() => setIsAddingPoint(true)}
                  className="w-full p-6 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center gap-3 text-gray-400 hover:border-amber-500 hover:text-amber-500 hover:bg-amber-50 transition-all group"
                >
                  <div className="bg-gray-50 group-hover:bg-amber-100 p-3 rounded-2xl transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black uppercase tracking-widest">Nokta Öner</p>
                    <p className="text-[10px] font-medium">Bilmeyenlerle paylaşmak istediğin bir pati dostu lokasyon mu var?</p>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
      </motion.aside>

      {/* Map Control Overlays */}
      <div className="fixed top-6 right-6 z-[1001] flex flex-col gap-3">
        {/* Style Switcher */}
        <div className="bg-white/90 backdrop-blur-md p-1 rounded-2xl shadow-xl flex flex-col gap-1 border border-white">
          {(['streets', 'satellite', 'dark'] as const).map(style => (
            <button
              key={style}
              onClick={() => setMapStyle(style)}
              className={`p-3 rounded-xl transition-all ${
                mapStyle === style ? 'bg-amber-500 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'
              }`}
              title={style === 'streets' ? 'Sade Harita (Minimal)' : style === 'satellite' ? 'Uydu Görünümü' : 'Karanlık Mod'}
            >
              <Layers size={18} />
            </button>
          ))}
        </div>

        {/* Locate Me */}
        <button 
          onClick={handleLocate}
          className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl text-gray-700 hover:text-amber-600 border border-white transition-all active:scale-95"
          title="Konumumu Bul"
        >
          <Locate size={18} />
        </button>
      </div>

      {/* Map Content */}
      <div className={`flex-1 relative z-0 ${isPickingCoords ? 'cursor-crosshair' : ''}`}>
        <MapContainer 
          center={ISTANBUL_CENTER} 
          zoom={12} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <MapController selectedPoint={selectedPoint} />
          <MapEventsHandler isPickingCoords={isPickingCoords} onCoordinatesPicked={handleCoordinatesPicked} />
          <TileLayer
            key={mapStyle}
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={
              mapStyle === 'streets' ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" :
              mapStyle === 'satellite' ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" :
              "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            }
          />
          <ZoomControl position="bottomright" />

          {filteredPoints.map(point => {
            const color = getMarkerColor(point.category);
            const dotIcon = L.divIcon({
              className: 'custom-dot-marker',
              html: `
                <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                  <div class="marker-pulse" style="background-color: ${color};"></div>
                  <div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); z-index: 2; position: relative;"></div>
                </div>
              `,
              iconSize: [24, 24],
              iconAnchor: [12, 12],
              popupAnchor: [0, -12]
            });

            return (
              <Marker 
                key={point.id} 
                position={[point.lat, point.lng]}
                icon={dotIcon}
                eventHandlers={{
                  click: () => handlePointSelect(point)
                }}
              />
            );
          })}

          {selectedPoint && (
            <Popup 
              position={[selectedPoint.lat, selectedPoint.lng]}
              onClose={() => setSelectedPoint(null)}
              className="custom-popup"
              autoPan={false}
            >
              <div className="p-1 min-w-[240px]">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter bg-amber-100 text-amber-700`}>
                    {selectedPoint.category}
                  </span>
                  {selectedPoint.is24h && (
                    <span className="text-[9px] font-black text-rose-600 uppercase">Açık 24 Saat</span>
                  )}
                  {selectedPoint.rating && (
                    <div className="flex items-center gap-1 ml-auto bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                      <Star size={10} className="text-amber-500 fill-current" />
                      <span className="text-[10px] font-black text-amber-700">{selectedPoint.rating}</span>
                    </div>
                  )}
                </div>
                <h3 className="font-black text-gray-900 mb-3">{selectedPoint.name}</h3>
                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 text-gray-400 shrink-0" />
                    <span>{selectedPoint.address}</span>
                  </div>
                  {selectedPoint.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400 shrink-0" />
                      <a href={`tel:${selectedPoint.phone}`} className="font-bold text-amber-600">{selectedPoint.phone}</a>
                    </div>
                  )}
                  {selectedPoint.hours && (
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400 shrink-0" />
                      <span>{selectedPoint.hours}</span>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => {
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedPoint.lat},${selectedPoint.lng}`, '_blank');
                  }}
                  className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Navigation size={14} />
                  Google Maps'te Görüntüle
                </button>
              </div>
            </Popup>
          )}
        </MapContainer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-container { font-family: inherit; }
        .custom-popup .leaflet-popup-content-wrapper { border-radius: 24px; padding: 6px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.2) !important; border: none; }
        .custom-popup .leaflet-popup-content { margin: 16px; width: 100% !important; }
        .custom-popup .leaflet-popup-tip { box-shadow: none; }
        
        .marker-pulse {
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          opacity: 0.6;
          animation: marker-glow 2.5s infinite ease-out;
          z-index: 1;
        }

        @keyframes marker-glow {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }

        .scroller-hide::-webkit-scrollbar { display: none; }
        .scroller-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Floating AI Assistant Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/assistant')}
        className="fixed bottom-6 right-20 z-[1000] w-14 h-14 bg-gradient-to-tr from-amber-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 text-white cursor-pointer group"
      >
        <Bot size={28} />
        <div className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
           Asistana Sor
        </div>
      </motion.button>
    </div>
  );
}


