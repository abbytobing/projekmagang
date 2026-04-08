import React, { useEffect, useState } from 'react';
import { Users, CheckCircle, Clock, RefreshCw, ChevronLeft, LogOut } from 'lucide-react';
import { auth, db } from "../services/firebase";
import { signOut } from 'firebase/auth';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  Timestamp 
} from 'firebase/firestore';

// Interface disesuaikan dengan data yang dikirim dari LeadForm
interface Lead {
  id: string; 
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'new' | 'contacted';
  createdAt: Timestamp;
}

export const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onBack();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Mengambil data secara Real-time dari Firestore
  useEffect(() => {
    setLoading(true);
    // Mengambil koleksi 'leads' diurutkan berdasarkan waktu terbaru
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const leadsData: Lead[] = [];
      querySnapshot.forEach((doc) => {
        leadsData.push({ id: doc.id, ...doc.data() } as Lead);
      });
      setLeads(leadsData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fungsi untuk update status (New <-> Contacted)
  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'contacted' ? 'new' : 'contacted';
    try {
      const leadRef = doc(db, 'leads', id);
      await updateDoc(leadRef, {
        status: newStatus
      });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-200 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 transition-all"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Statistik Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Users className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Leads</p>
              <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <CheckCircle className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Contacted</p>
              <p className="text-2xl font-bold text-slate-900">{leads.filter(l => l.status === 'contacted').length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
              <Clock className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">New Leads</p>
              <p className="text-2xl font-bold text-slate-900">{leads.filter(l => l.status === 'new' || !l.status).length}</p>
            </div>
          </div>
        </div>

        {/* Tabel Recent Leads - Full Width */}
        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Recent Leads</h2>
              {loading && <RefreshCw size={16} className="animate-spin text-slate-400" />}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Client</th>
                    <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Service</th>
                    <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-6">
                        <p className="font-bold text-slate-900">{lead.fullName || lead.name || 'No Name'}</p>
                        <p className="text-xs text-slate-500">{lead.email}</p>
                        <p className="text-xs text-slate-500">{lead.phone}</p>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold uppercase text-slate-600">
                          {lead.service}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
                          lead.status === 'contacted' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {lead.status || 'new'}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <button 
                          onClick={() => toggleStatus(lead.id, lead.status || 'new')}
                          className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                            lead.status === 'contacted' 
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                              : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                        >
                          {lead.status === 'contacted' ? 'Mark New' : 'Mark Contacted'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && !loading && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-400 italic">No leads found yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};