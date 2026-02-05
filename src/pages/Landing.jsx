import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Mail, Loader2 } from 'lucide-react';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Note: No 'http://localhost:3001' - Vercel handles the routing
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 bg-[#fcfcfc] overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-4 py-1.5 border border-slate-200 rounded-full bg-white shadow-sm mb-6">
        <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Available in BS21 & BS22</span>
      </motion.div>

      <div className="text-center max-w-4xl mb-6">
        <h1 className="hero-text text-6xl md:text-8xl lg:text-[7.5rem]">BRING THE <br /><span className="text-[#10b981]">CLEAN.</span></h1>
        <p className="mt-4 text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto leading-tight italic">Premium domestic and garden maintenance for North Somerset.</p>
      </div>

      <div className="max-w-2xl w-full bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm mb-8 flex flex-col items-center space-y-3">
          <div className="flex items-center gap-2 text-[#10b981] font-black text-[9px] uppercase tracking-widest">
            <ShieldCheck size={16} /><span>Fair Pricing, Fair Pay</span>
          </div>
          <p className="text-slate-500 text-xs md:text-sm text-center">We guarantee <span className="text-slate-900 font-bold">£15/hr</span> minimum for our staff, ensuring the best service for your home.</p>
      </div>

      <div className="w-full max-w-lg space-y-4 text-center">
        <h2 className="text-xl font-black italic uppercase tracking-tight">Join the waiting list</h2>
        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row gap-2">
            <input type="email" required placeholder="Email address" className="flex-1 bg-white border-2 border-slate-100 px-6 py-4 rounded-full outline-none focus:border-[#10b981] font-bold text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className="bg-[#0a0e1a] text-white px-8 py-4 rounded-full font-black uppercase text-[10px] hover:bg-[#10b981] transition-all flex items-center justify-center gap-2">
              {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : <>Notify Me <ArrowRight size={14} /></>}
            </button>
          </form>
        ) : (
          <div className="text-[#10b981] font-black italic">✓ YOU'RE ON THE LIST!</div>
        )}
      </div>
      <p className="mt-12 text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">CleanerPro 2026</p>
    </div>
  );
}


