import React, { useState } from 'react';
import { MapPin, Navigation, Server, Info, ArrowRight, Search, ExternalLink } from 'lucide-react';
import { getNearestDataCenter, recommendService } from '../utils';
import { geminiService } from '../services/geminiService';
import { motion } from 'motion/react';

export const DistanceCalculator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<{
    dc: any;
    distance: number;
    recommendation: any;
    mapsUrls?: { title?: string; uri?: string }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processLocation = (lat: number, lng: number, urls?: any[]) => {
    const { dataCenter, distance } = getNearestDataCenter(lat, lng);
    const recommendation = recommendService(distance);
    
    setResult({
      dc: dataCenter,
      distance,
      recommendation,
      mapsUrls: urls
    });
    setLoading(false);
  };

  const handleLocate = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        processLocation(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError("Unable to retrieve your location. Please check your permissions.");
        setLoading(false);
      }
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const location = await geminiService.searchLocation(searchQuery);
      processLocation(location.lat, location.lng, location.urls);
    } catch (err) {
      setError("Could not find that location. Try being more specific.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-50 rounded-2xl">
            <Navigation className="w-6 h-6 text-rackh-red" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">DC Proximity Engine</h2>
            <p className="text-slate-500 text-sm">Find the best data center for your business</p>
          </div>
        </div>

        {!result ? (
          <div className="space-y-6">
            <p className="text-slate-600 leading-relaxed">
              Our AI will analyze your location and recommend the most efficient Rackh Data Center. You can use your current GPS or search for a specific location.
            </p>

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your city or address..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:ring-2 focus:ring-rackh-red outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-rackh-red text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 transition-all"
              >
                Search
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-slate-400">
                <span className="bg-white px-4">Or</span>
              </div>
            </div>

            <button
              onClick={handleLocate}
              disabled={loading}
              className="w-full border-2 border-slate-900 text-slate-900 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-50"
            >
              {loading && !searchQuery ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                  Locating...
                </>
              ) : (
                <>
                  <MapPin size={20} />
                  Use Current GPS Location
                </>
              )}
            </button>
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nearest DC</span>
                <p className="text-lg font-bold text-slate-900 mt-1">{result.dc.name}</p>
                <p className="text-sm text-slate-500">{result.dc.location}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Distance</span>
                <p className="text-lg font-bold text-slate-900 mt-1">{result.distance.toFixed(2)} km</p>
                <p className="text-sm text-slate-500">Estimated Latency: ~{(result.distance * 0.01).toFixed(1)}ms</p>
              </div>
            </div>

            <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-rackh-red rounded-lg mt-1">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Recommended Service: {result.recommendation.type}</h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {result.recommendation.reason}
                  </p>
                </div>
              </div>
            </div>

            {result.mapsUrls && result.mapsUrls.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location Sources</span>
                <div className="flex flex-wrap gap-2">
                  {result.mapsUrls.map((url, i) => (
                    <a
                      key={i}
                      href={url.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium transition-colors"
                    >
                      <ExternalLink size={12} />
                      {url.title || 'View on Maps'}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setResult(null);
                  setSearchQuery('');
                }}
                className="flex-1 px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-all"
              >
                Recalculate
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('lead-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 px-6 py-3 bg-rackh-red text-white rounded-xl font-medium hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                Get Quote <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center gap-2">
        <Info size={14} className="text-slate-400" />
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
          Powered by Google Maps Grounding & Geospatial AI
        </span>
      </div>
    </div>
  );
};
