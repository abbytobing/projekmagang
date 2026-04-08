import React, { useEffect, useState } from 'react';
import { Chatbot } from './components/Chatbot';
import { DistanceCalculator } from './components/DistanceCalculator';
import { LeadForm } from './components/LeadForm';
import { motion } from "framer-motion";
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { auth } from "./services/firebase";
import { onAuthStateChanged, User } from 'firebase/auth';
import { generateServiceIcons } from './services/iconGenerator';
import { 
  Server, Shield, Zap, Globe, Cpu, Database, 
  ChevronRight, CheckCircle2, LayoutDashboard 
} from 'lucide-react';

const locations = [
  { name: "Medan", location: "RackH Medan (HQ)", desc: "Jl. Terusan No. 65", img: "/dc-medan.jpg" },
  { name: "Jakarta", location: "Cyber 1 & IDC3D", desc: "Pusat Interkoneksi Nasional", img: "/dc-jakarta.jpg" },
  { name: "Surabaya", location: "Omadata Surabaya", desc: "Intiland Tower", img: "/dc-surabaya.png" },
  { name: "Batam", location: "IDC Batam", desc: "Techno Plaza", img: "/dc-batam.jpg" },
  { name: "Singapore", location: "Equinix SG1", desc: "Global Connectivity Hub", img: "/dc-singapore.jpg" }
];

const colocationPlans = [
  { name: "1U @ Cyber / IDC3D", price: "1.000.000", setup: "1.000.000", city: "Jakarta" },
  { name: "1U @ APJII / Telkom", price: "1.500.000", setup: "1.500.000", city: "Jakarta" },
  { name: "1U @ Equinix SG1", price: "3.000.000", setup: "3.000.000", city: "Singapore" }
];

const dedicatedPlans = [
  { cpu: "XEON E3-1230", ram: "16 GB", storage: "250GB SSD + 1TB HDD", price: "1.490.000" },
  { cpu: "2 x XEON E5-2620", ram: "32 GB", storage: "500GB SSD + 1TB HDD", price: "1.900.000" },
  { cpu: "2 x XEON E5-2680", ram: "64 GB", storage: "1TB SSD + 1TB HDD", price: "2.900.000" }
];

const rackPlans = [
  {
    name: "20U Half Rack",
    location: "JAKARTA DATA CENTER",
    features: ["5 Ampere Power", "Fiber Connection Port", "Same Day Provisioning", "24/7 Onsite Engineer"],
    price: "8.000.000",
    setup: "3.000.000"
  },
  {
    name: "45U Full Rack",
    location: "JAKARTA DATA CENTER",
    features: ["10 Ampere Power", "Fiber Connection Port", "Same Day Provisioning", "24/7 Onsite Engineer"],
    price: "14.000.000",
    setup: "5.000.000"
  },
  {
    name: "Disaster Recovery",
    location: "MASTER AND SLAVE",
    features: ["2 Location Data Center", "Dark Fiber / Metro-E Port", "Same Day Provisioning", "24/7 Network Support"],
    price: "Call Sales",
    setup: "Custom"
  }
];

export default function App() {
  const [icons, setIcons] = useState<Record<string, string>>({});
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Memantau status login Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    const loadIcons = async () => {
      const generatedIcons = await generateServiceIcons();
      setIcons(generatedIcons);
    };
    loadIcons();

    return () => unsubscribe();
  }, []);

  // Logika untuk menampilkan Dashboard atau Login jika Mode Admin aktif
  if (isAdminMode) {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-rackh-red/30 border-t-rackh-red rounded-full animate-spin" />
        </div>
      );
    }

    if (!user) {
      return <AdminLogin onBack={() => setIsAdminMode(false)} />;
    }

    return <AdminDashboard onBack={() => setIsAdminMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-rackh-red/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center">
              <img 
                src="/logo-rackh.png" 
                alt="Rackh Logo" 
                className="h-10 w-auto object-contain" 
              />
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-rackh-red transition-colors">
              Services
            </a>
            {/* Nama sudah diganti menjadi teknik: DC Proximity Engine */}
            <a href="#calculator" className="text-sm font-medium text-slate-600 hover:text-rackh-red transition-colors">
              DC Proximity Engine
            </a>
            <a href="#lead-form" className="bg-rackh-red text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20">
              Get Started
            </a>

            {/* Tombol Admin di posisi paling ujung */}
            <button 
              onClick={() => setIsAdminMode(true)}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-rackh-red transition-all border-l pl-8 border-slate-200"
            >
              <LayoutDashboard size={18} />
              Admin
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-rackh-red text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-red-100">
                  <Zap size={12} /> Next-Gen Infrastructure
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                  Smart Lead Gen & <span className="text-transparent bg-clip-text bg-gradient-to-r from-rackh-red to-orange-500">AI Assistant</span> for PT Rackh
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
                  "Pilihlah yang Terbaik bukan yang Termurah". Solusi infrastruktur IT 100% Cepat, Stabil, dan Aman dengan dukungan teknis 24 jam.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-rackh-red text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 flex items-center gap-2"
                  >
                    Try Distance AI <ChevronRight size={20} />
                  </button>
                  <button 
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Explore Services
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


<section id="services" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* 1. VISUALISASI DATA CENTER (Gedung & Lokasi) */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-24">
      {[
        { name: "Medan", loc: "RackH Medan (HQ)", img: "/dc-medan.jpg" },
        { name: "Jakarta", loc: "Cyber 1 & IDC3D", img: "/dc-jakarta.jpg" },
        { name: "Surabaya", loc: "Intiland Tower", img: "/dc-surabaya.png" },
        { name: "Batam", loc: "Techno Plaza", img: "/dc-batam.jpg" },
        { name: "Singapore", loc: "Equinix SG1", img: "/dc-singapore.jpg" }
      ].map((dc) => (
        <div key={dc.name} className="group relative rounded-3xl overflow-hidden shadow-lg h-72">
          <img src={dc.img} alt={dc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 flex flex-col justify-end">
            <h3 className="text-white font-bold text-xl">{dc.name}</h3>
            <p className="text-white/70 text-xs leading-relaxed">{dc.loc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* 2. KATALOG COLOCATION SERVER */}
    <div className="mb-20">
      <h3 className="text-2xl font-black text-slate-900 mb-8 border-l-4 border-rackh-red pl-4">Colocation For Internet</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "1U @ Cyber / IDC3D", price: "1.000.000", setup: "1.000.000", city: "Jakarta" },
          { name: "1U @ APJII / Telkom", price: "1.500.000", setup: "1.500.000", city: "Jakarta" },
          { name: "1U @ Equinix SG1", price: "3.000.000", setup: "3.000.000", city: "Singapore" }
        ].map((plan) => (
          <div key={plan.name} className="border border-slate-200 rounded-3xl p-8 hover:border-rackh-red transition-all shadow-sm">
            <h4 className="text-xl font-bold mb-1">{plan.name}</h4>
            <p className="text-slate-400 text-xs mb-6 uppercase tracking-widest">{plan.city} Data Center</p>
            <div className="mb-6">
              <span className="text-3xl font-black text-rackh-red">Rp {plan.price}</span>
              <span className="text-slate-400 text-sm">/bln</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 mb-8">
              <li>• Network Router & Switch</li>
              <li>• 1 Port Connection & 1 Power Socket</li>
              <li>• 1 Dedicated IP</li>
              <li>• 24/7 Free Remote Hands</li>
            </ul>
            <div className="text-[10px] text-slate-400 mb-4 italic text-center">One Time Setup: Rp {plan.setup}</div>
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-rackh-red transition-all">Order Now</button>
          </div>
        ))}
      </div>
    </div>

    {/* 3. KATALOG DEDICATED SERVER (PROMO) */}
    <div className="mb-20">
      <h3 className="text-2xl font-black text-slate-900 mb-8 border-l-4 border-rackh-red pl-4">Dedicated Server (Promo Terbatas)</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { cpu: "XEON E3-1230*", ram: "16 GB", storage: "250GB SSD + 1TB HDD", price: "1.490.000" },
          { cpu: "2 x INTEL XEON E5-2620*", ram: "32 GB", storage: "500GB SSD + 1TB HDD", price: "1.900.000" },
          { cpu: "2 x INTEL XEON E5-2680*", ram: "64 GB", storage: "1000GB SSD + 1000GB HDD", price: "2.900.000" }
        ].map((spec) => (
          <div key={spec.cpu} className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-rackh-red px-4 py-1 text-[10px] font-bold uppercase">Promo</div>
            <h4 className="text-xl font-bold mb-4 text-rackh-red">{spec.cpu}</h4>
            <ul className="space-y-2 text-sm text-slate-300 mb-8">
              <li>• {spec.ram} RAM</li>
              <li>• {spec.storage}</li>
              <li>• Unmetered Bandwidth</li>
              <li>• 1 Gbps Connection</li>
            </ul>
            <div className="text-2xl font-black mb-6">Rp {spec.price}<span className="text-xs font-normal text-slate-500"> /bln</span></div>
            <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-rackh-red hover:text-white transition-all">Get Spec</button>
          </div>
        ))}
      </div>
    </div>

    {/* 4. KATALOG FULL RACK & DR */}
    <div className="mb-24">
      <h3 className="text-2xl font-black text-slate-900 mb-8 border-l-4 border-rackh-red pl-4">Full Rack & Disaster Recovery</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "20U Half Rack", loc: "JAKARTA", price: "8.000.000", setup: "3.000.000", power: "5 Ampere" },
          { name: "45U Full Rack", loc: "JAKARTA", price: "14.000.000", setup: "5.000.000", power: "10 Ampere" },
          { name: "Disaster Recovery", loc: "MASTER & SLAVE", price: "Call Sales", setup: "Custom", power: "2 Location" }
        ].map((rack) => (
          <div key={rack.name} className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
            <h4 className="text-xl font-bold mb-1">{rack.name}</h4>
            <p className="text-rackh-red text-[10px] font-black tracking-tighter mb-6">{rack.loc} DATA CENTER</p>
            <ul className="space-y-3 text-sm text-slate-600 mb-8">
              <li>• {rack.power} Power</li>
              <li>• Fiber Connection Port</li>
              <li>• 24/7 Onsite Engineer</li>
              <li>• 24/7 Remote Hands</li>
            </ul>
            <div className="text-xl font-black text-slate-900 mb-1">{rack.price !== "Call Sales" ? `Rp ${rack.price}/bln` : rack.price}</div>
            <div className="text-[10px] text-slate-400 italic mb-6">Setup: Rp {rack.setup}</div>
            <button className="w-full py-2 border-2 border-slate-900 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all">Order</button>
          </div>
        ))}
      </div>
    </div>

    {/* 5. CHECKLIST KEUNTUNGAN & TARGET 100% */}
    <div className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
      <div className="grid lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <h2 className="text-3xl font-black mb-8 italic">"Pilihlah yang Terbaik bukan yang Termurah"</h2>
          <div className="grid gap-5">
            {[
              "Staff Teknis 24 Jam On-site di lokasi Data Center",
              "100 Gbps Data Center Interconnect (DCI)",
              "Multi Peering (IIX, OpenIXP, Equinix, SGIX)",
              "Dukungan Anti DDoS & BGP Peering Sessions",
              "Gratis Bantuan Reboot/Power On/Off & Cek Fisik",
              "Sertifikasi Tier-3 dan Standar ISO"
            ].map((text, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 bg-rackh-red rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="font-medium text-slate-300 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {["Cepat", "Stabil", "Aman", "24 Jam"].map(item => (
            <div key={item} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-center">
              <div className="text-4xl font-black text-rackh-red mb-1">100%</div>
              <div className="text-xs font-bold tracking-widest uppercase text-white/50">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

  </div>
</section>

        {/* AI Tools Section */}
        <section id="calculator" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Smart Geospatial Recommendations</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Choosing the right data center location is critical for your application's performance. Our AI Distance Calculator uses real-time geospatial data to recommend the best facility for your needs.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                      <Globe className="text-rackh-red w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Low Latency Focus</h4>
                      <p className="text-sm text-slate-500">Automatically identifies the shortest path to our backbone.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                      <Zap className="text-rackh-red w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Instant Analysis</h4>
                      <p className="text-sm text-slate-500">Get service recommendations based on physical distance variables.</p>
                    </div>
                  </div>
                </div>
              </div>
              <DistanceCalculator />
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <LeadForm />
          </div>
        </section>
      </main>

{/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              
              {/* --- BAGIAN LOGO (SUDAH DIPERBAIKI) --- */}
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="/logo-rackh.png" 
                  alt="Rackh Logo" 
                  className="h-12 w-auto object-contain brightness-0 invert" 
                />
              </div>

              <p className="text-slate-400 max-w-sm leading-relaxed">
                PT Rackh Lintas Asia is your trusted partner for enterprise IT infrastructure and digital transformation in Indonesia.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Data Centers</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>Medan</li>
                <li>Batam</li>
                <li>Jakarta</li>
                <li>Surabaya</li>
                <li>Singapore Equinix</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Contact</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>abby@rackh.com</li>
                <li>+62 896 733 0092</li>
                <li>Medan, Indonesia</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium uppercase tracking-widest">
            <p>© 2026 PT Rackh Lintas Asia. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}
