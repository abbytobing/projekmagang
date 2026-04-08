import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Menggunakan framer-motion yang lebih stabil
import { db } from '../services/firebase'; // Mengambil koneksi database
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const LeadForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'vps',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // PERBAIKAN: Langsung kirim ke Firebase Firestore
      await addDoc(collection(db, 'leads'), {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        status: 'new', // Status awal untuk Admin Dashboard
        createdAt: serverTimestamp() // Menggunakan waktu server Firebase
      });

      // Tampilkan layar sukses (centang hijau)
      setSubmitted(true);
      
      // Reset form setelah sukses
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'vps',
        message: ''
      });
    } catch (err: any) {
      console.error('Failed to submit lead:', err);
      setError('Connection error: Gagal terhubung ke database. Pastikan internet stabil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="lead-form" className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-3xl rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 blur-3xl rounded-full -ml-32 -mb-32" />
      
      <div className="p-10 relative z-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-8 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">Ready to Scale?</h2>
                <p className="text-slate-400">Fill out the form below and our experts will contact you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        required
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        required
                        type="email"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        required
                        type="tel"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        placeholder="+62 812..."
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interested Service</label>
                    <select
                      className="w-full bg-white/10 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all appearance-none cursor-pointer"
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="vps" className="bg-slate-900">Cloud VPS</option>
                      <option value="colocation" className="bg-slate-900">Colocation Server</option>
                      <option value="dedicated" className="bg-slate-900">Dedicated Server</option>
                      <option value="other" className="bg-slate-900">Other Services</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message (Optional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                    <textarea
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm mb-6">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Thank You!</h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Your inquiry has been received. Our sales team will get in touch with you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-red-500 font-semibold hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};