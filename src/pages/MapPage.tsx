import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ArrowLeft, MapPin, Phone, Globe, Clock, Info, Search, Menu, X, Navigation, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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

interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  address: string;
  phone?: string;
  hours?: string;
  website?: string;
}

const SAMPLE_POINTS: MapPoint[] = [
  // VETERINERLER
  {
    id: 'v1',
    name: 'VETART Veteriner Polikinliği',
    lat: 41.0285,
    lng: 29.0271,
    category: 'Veteriner',
    address: 'İcadiye, Cumhuriyet Cd. No:57, 34674 Üsküdar/İstanbul',
    phone: '(0216) 553 01 12',
    hours: '09:30–22:30',
    website: 'http://www.vetart.com.tr/'
  },
  {
    id: 'v2',
    name: 'Dr. Pati Üsküdar Veteriner Kliniği',
    lat: 41.0182,
    lng: 29.0205,
    category: 'Veteriner',
    address: 'Barbaros, Nuhkuyusu Cd No:76, 34662 Üsküdar/İstanbul',
    phone: '(0533) 498 96 62',
    hours: '10:00–19:00',
    website: 'https://uskudarveteriner.com/'
  },
  {
    id: 'v3',
    name: 'Da Vinci Üsküdar Veteriner Kliniği',
    lat: 41.0261,
    lng: 29.0152,
    category: 'Veteriner',
    address: 'Mimar Sinan, Dr. Fahri Atabey Cd. no31, 34672 Üsküdar/İstanbul',
    phone: '0538 876 92 96',
    hours: '09:00–19:00',
    website: 'http://davinciveteriner.com/'
  },
  {
    id: 'v4',
    name: 'Üsküdar Pet Tower Veteriner Kliniği',
    lat: 41.0185,
    lng: 29.0082,
    category: 'Veteriner',
    address: 'Salacak, Halk Dersanesi Sk. No: 3 D:A, 34668 Üsküdar/İstanbul',
    phone: '0506 545 71 02',
    hours: '24 Saat Açık',
    website: 'http://pettowerveteriner.com/'
  },
  {
    id: 'v5',
    name: 'Veterinerim Hayvan Kliniği',
    lat: 41.0302,
    lng: 29.0225,
    category: 'Veteriner',
    address: 'Selamiali mah. Cumhuriyet Cad. 54/A Fıstıkağacı, Üsküdar',
    phone: '(0216) 553 12 03',
    hours: '10:00–19:00',
    website: 'http://www.veteriner.im/'
  },
  // BARINAK
  {
    id: 'b1',
    name: 'Üsküdar Geçici Hayvan Barınağı',
    lat: 41.0455,
    lng: 29.0852,
    category: 'Barınak',
    address: 'Hekimbaşı, Hemka Sokak No:1, 34766 Ümraniye/İstanbul',
    phone: '0216 630 2234',
    hours: '24 Saat Açık',
    website: 'http://www.uskudar.bel.tr/hayvanbarinagi'
  },
  // PETSHOPLAR
  {
    id: 'p1',
    name: 'Üsküdar Hayvan Merkezi',
    lat: 41.0155,
    lng: 29.0202,
    category: 'Petshop',
    address: 'Zeynep Kamil, Dr. Fahri Atabey Cd. No:110/B, Üsküdar',
    phone: '0535 673 89 84',
    hours: '10:00-20.30'
  },
  {
    id: 'p2',
    name: 'Seçkin Hayvan Dükkanı',
    lat: 41.0305,
    lng: 29.0221,
    category: 'Petshop',
    address: 'Selami Ali, Fıstık Ağacı Sokağı no:2, Üsküdar',
    phone: '(0216) 532 01 85',
    hours: '09:00–21:30'
  },
  {
    id: 'p3',
    name: 'Petburada Üsküdar',
    lat: 41.0282,
    lng: 29.0275,
    category: 'Petshop',
    address: 'İcadiye, Cumhuriyet Cd. No:51/A, Üsküdar',
    phone: '(0216) 771 91 77',
    hours: '09:30–20:00'
  },
  // OTELLER
  {
    id: 'o1',
    name: 'Loft Pet House',
    lat: 41.0052,
    lng: 29.0305,
    category: 'Otel',
    address: 'Koşuyolu, İsmailpaşa Sk. No:32, 34718 Kadıköy/İstanbul',
    phone: '0532 529 0176',
    hours: '09:00–18:30'
  },
  {
    id: 'o2',
    name: 'Patinga',
    lat: 41.0125,
    lng: 29.0201,
    category: 'Otel',
    address: 'Valide-i Atik, Dr. Fahri Atabey Cd. No:75 D:6, Üsküdar',
    phone: '0216 695 2026',
    hours: '24 Saat Açık'
  },
  // KUAFÖRLER
  {
    id: 'k1',
    name: 'Kaymak Pet Kuaför Üsküdar',
    lat: 41.0235,
    lng: 29.0155,
    category: 'Kuaför',
    address: 'Ahmediye, Gündoğumu Cd. No:37 D:B, Üsküdar',
    phone: '0501 672 62 34',
    hours: '10.00-19.00',
    website: 'https://kaymakpetkuafor.com/'
  },
  {
    id: 'k2',
    name: 'ZESA Evcil Hayvan Kuaförü',
    lat: 41.0005,
    lng: 29.0352,
    category: 'Kuaför',
    address: 'Acıbadem, Nişantaşı Yolu Sokağı No:13, Üsküdar',
    phone: '0532 234 21 79',
    hours: '10.30-20.00',
    website: 'https://zesapetkuafor.com/'
  },
  {
    id: 'k3',
    name: 'Petico Pet kuaförü',
    lat: 41.0505,
    lng: 29.0552,
    category: 'Kuaför',
    address: 'Çengelköy, Mehmet Akif Ersoy, Bosna Blv No:63, Üsküdar',
    phone: '0532 722 68 48',
    hours: '10.00-19.00',
    website: 'http://www.peticopetkuafor.com.tr/'
  },
  {
    id: 'k4',
    name: 'Petcanlar',
    lat: 41.0402,
    lng: 29.0005,
    category: 'Kuaför',
    address: 'Bahçelievler, Zübeyde Hanım Cd. No:6, 34688 Üsküdar/İstanbul',
    phone: '(0216) 308 56 37',
    hours: '09.30-20.30',
    website: 'https://www.petcanlar.com/'
  },
  {
    id: 'k5',
    name: 'Ata Pet Kuaför',
    lat: 40.9752,
    lng: 29.0555,
    category: 'Kuaför',
    address: 'Göztepe, Bahariyeli Sk No:33/A, 34738 Kadıköy/İstanbul',
    phone: '0532 255 25 30',
    hours: '10.00-21.00',
    website: 'https://www.erenkoypetkuafor.com/'
  },
  {
    id: 'p4',
    name: 'Yunus Evcil Hayvan Dükkanı',
    lat: 41.0288,
    lng: 29.0278,
    category: 'Petshop',
    address: 'İcadiye, Cumhuriyet Cd. No:137, 34664 Üsküdar/İstanbul',
    phone: '(0216) 391 45 40',
    hours: '10:00–20:00'
  },
  {
    id: 'p5',
    name: 'Erka Evcil Hayvan Dükkanı',
    lat: 41.0205,
    lng: 29.0252,
    category: 'Petshop',
    address: 'Murat Reis, Nuhkuyusu Cd 251/B, 34664 Üsküdar/İstanbul',
    phone: '(0216) 553 67 98',
    hours: '08:00–21:00'
  }
];

function MapController({ selectedPoint }: { selectedPoint: MapPoint | null }) {
  const map = useMap();
  React.useEffect(() => {
    if (selectedPoint) {
      map.flyTo([selectedPoint.lat, selectedPoint.lng], 16, { duration: 1.5 });
    }
  }, [selectedPoint, map]);
  return null;
}

export default function MapPage() {
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const filteredPoints = useMemo(() => {
    return SAMPLE_POINTS.filter(point => 
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const getMarkerColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('veteriner')) return '#ef4444'; // red-500
    if (cat.includes('barınak')) return '#22c55e'; // green-500
    if (cat.includes('petshop')) return '#3b82f6'; // blue-500
    if (cat.includes('otel')) return '#a855f7'; // purple-500
    if (cat.includes('kuaför')) return '#ec4899'; // pink-500
    return '#f59e0b'; // amber-500 (default)
  };

  return (
    <div className={`h-screen w-full flex overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '380px' : '0px' }}
        className={`flex flex-col relative z-[1002] shadow-xl overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 border-r border-gray-800' : 'bg-white border-r border-gray-200'}`}
      >
        <div className={`p-6 shrink-0 ${isDarkMode ? 'border-b border-gray-800' : 'border-b border-gray-100'}`}>
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={() => navigate('/')}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-blue-900/50 text-blue-400' : 'hover:bg-amber-50 text-amber-600'}`}
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Zootropolis</h1>
              <p className={`text-[10px] font-black uppercase tracking-widest leading-none ${isDarkMode ? 'text-blue-400' : 'text-amber-500'}`}>Pati Haritası</p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`ml-auto p-2.5 rounded-full transition-all shadow-sm hover:shadow-md active:scale-95 ${isDarkMode ? 'bg-blue-950/80 border-2 border-blue-800 text-blue-300 hover:bg-blue-900' : 'bg-white/80 border-2 border-amber-100 text-amber-700 hover:bg-amber-50'}`}
            >
              {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-blue-500" />}
            </button>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Mekan, tür veya adres ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-semibold outline-none transition-all border-2 ${isDarkMode ? 'bg-gray-800 border-transparent focus:border-blue-500/30 focus:bg-gray-750 text-white placeholder:text-gray-500' : 'bg-gray-50 border-transparent focus:border-amber-500/20 focus:bg-white placeholder:text-gray-400'}`}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 scroller-hide">
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {filteredPoints.length} Sonuç Bulundu
          </p>
          
          {filteredPoints.map(point => (
            <button
              key={point.id}
              onClick={() => setSelectedPoint(point)}
              className={`w-full text-left p-4 rounded-2xl transition-all border-2 group ${selectedPoint?.id === point.id ? (isDarkMode ? 'bg-blue-900/30 border-blue-500/30' : 'bg-amber-50 border-amber-500/30') : (isDarkMode ? 'bg-gray-800 border-transparent hover:border-gray-700' : 'bg-white border-transparent hover:border-gray-200')}`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${selectedPoint?.id === point.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {point.category}
                </span>
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm`} style={{ backgroundColor: getMarkerColor(point.category) }}></div>
              </div>
              <h3 className={`font-bold transition-colors ${isDarkMode ? `text-white group-hover:text-blue-400 ${selectedPoint?.id === point.id ? 'text-blue-400' : ''}` : `text-gray-900 group-hover:text-amber-600 ${selectedPoint?.id === point.id ? 'text-amber-600' : ''}`}`}>
                {point.name}
              </h3>
              <div className="mt-2 space-y-1">
                <div className={`flex items-start gap-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <MapPin size={14} className="shrink-0 mt-0.5 opacity-50" />
                  <span className="line-clamp-2">{point.address}</span>
                </div>
                {point.hours && (
                  <div className={`flex items-center gap-2 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Clock size={12} className="shrink-0 opacity-50" />
                    <span>{point.hours}</span>
                  </div>
                )}
              </div>
            </button>
          ))}

          {filteredPoints.length === 0 && (
            <div className="text-center py-12">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                <Search size={24} />
              </div>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sonuç Bulunamadı</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Aramanı değiştirmeyi dene.</p>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Sidebar Toggle Button (Mobile/Tablet) */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-8 left-8 z-[1005] bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all md:hidden"
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Map Content */}
      <div className="flex-1 relative z-0">
        <MapContainer 
          center={ISTANBUL_CENTER} 
          zoom={12} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <MapController selectedPoint={selectedPoint} />
          {isDarkMode ? (
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          ) : (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )}
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
                  click: () => setSelectedPoint(point)
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
              <div className="p-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-amber-100 text-amber-700'}`}>
                    {selectedPoint.category}
                  </span>
                </div>
                <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPoint.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 text-gray-400 shrink-0" />
                    <span>{selectedPoint.address}</span>
                  </div>
                  {selectedPoint.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400 shrink-0" />
                      <a href={`tel:${selectedPoint.phone}`} className="hover:text-amber-600 transition-colors">{selectedPoint.phone}</a>
                    </div>
                  )}
                  {selectedPoint.hours && (
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400 shrink-0" />
                      <span>{selectedPoint.hours}</span>
                    </div>
                  )}
                  {selectedPoint.website && selectedPoint.website !== 'yok' && (
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-gray-400 shrink-0" />
                      <a 
                        href={selectedPoint.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:underline truncate"
                      >
                        Web Sitesi
                      </a>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => {
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedPoint.lat},${selectedPoint.lng}`, '_blank');
                  }}
                  className={`w-full mt-4 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95 ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/20' : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'}`}
                >
                  <Navigation size={14} />
                  Yol Tarifi Al
                </button>
              </div>
            </Popup>
          )}
        </MapContainer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-container { font-family: inherit; }
        .custom-popup .leaflet-popup-content-wrapper { border-radius: 20px; padding: 4px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border: none; }
        .custom-popup .leaflet-popup-content { margin: 12px; }
        .custom-popup .leaflet-popup-tip { box-shadow: none; }
        
        .marker-pulse {
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          opacity: 0.6;
          animation: marker-glow 2s infinite ease-out;
          z-index: 1;
        }

        @keyframes marker-glow {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        .scroller-hide::-webkit-scrollbar { display: none; }
        .scroller-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

