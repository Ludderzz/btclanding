import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Mail, Loader2, Briefcase, User, Phone } from 'lucide-react';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle');
  const [mode, setMode] = useState('customer');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          phone: mode === 'staff' ? phone : 'N/A',
          type: mode 
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setPhone('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    /* Change 1: Use min-h-screen instead of h-screen to allow scrolling if needed.
      Change 2: Added py-12 for breathing room on mobile and overflow-y-auto.
    */
    <div className="min-h-screen w-full flex flex-col items-center justify-start md:justify-center px-6 py-12 bg-[#fcfcfc] overflow-y-auto">
      
      {/* 1. Toggle Switch - Now with better mobile spacing */}
      <div className="mt-4 md:mt-0 mb-8 flex p-1 bg-slate-100 rounded-full border border-slate-200 shadow-inner shrink-0">
        <button 
          onClick={() => { setMode('customer'); setStatus('idle'); }}
          className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'customer' ? 'bg-white shadow-sm text-[#0a0e1a]' : 'text-slate-400'}`}
        >
          <User size={14} /> I need a clean
        </button>
        <button 
          onClick={() => { setMode('staff'); setStatus('idle'); }}
          className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'staff' ? 'bg-[#10b981] shadow-sm text-white' : 'text-slate-400'}`}
        >
          <Briefcase size={14} /> Join as staff
        </button>
      </div>

      {/* 2. Hero Text - Scaled down slightly for mobile to prevent clipping */}
      <div className="text-center max-w-4xl mb-6">
        <h1 className="hero-text text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.9] tracking-tighter">
          {mode === 'customer' ? 'BRING THE ' : 'JOIN THE '}
          <br />
          <span className={mode === 'customer' ? 'text-[#10b981]' : 'text-[#0a0e1a]'}>
            {mode === 'customer' ? 'CLEAN.' : 'TEAM.'}
          </span>
        </h1>
        <p className="mt-6 text-slate-500 text-sm md:text-base font-medium max-w-sm md:max-w-xl mx-auto leading-tight italic">
          {mode === 'customer' 
            ? "Premium domestic and garden maintenance for North Somerset." 
            : "Work with the best. We pay a living wage and respect your time."}
        </p>
      </div>

      {/* 3. Info Card - Responsive padding */}
      <motion.div 
        layout
        className="max-w-2xl w-full bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 shadow-sm mb-8 flex flex-col items-center space-y-3"
      >
        <div className={`flex items-center gap-2 font-black text-[9px] uppercase tracking-widest ${mode === 'customer' ? 'text-[#10b981]' : 'text-slate-900'}`}>
          <ShieldCheck size={16} />
          <span>{mode === 'customer' ? 'Fair Pricing, Fair Pay' : 'Industry Leading Pay'}</span>
        </div>
        <p className="text-slate-500 text-xs md:text-sm text-center leading-relaxed">
          {mode === 'customer' 
            ? <>We guarantee <span className="text-slate-900 font-bold">£15/hr</span> minimum for our staff, ensuring the best service for your home.</>
            : <>All our cleaners earn a minimum of <span className="text-slate-900 font-bold">£15 per hour</span> plus travel. Reliable work, local clients.</>}
        </p>
      </motion.div>

      {/* 4. Form Section */}
      <div className="w-full max-w-lg space-y-4 text-center">
        <h2 className="text-lg md:text-xl font-black italic uppercase tracking-tight">
          {mode === 'customer' ? 'Join the waiting list' : 'Apply for early access'}
        </h2>
        
        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative flex flex-col gap-2">
              <input 
                type="email" 
                required 
                placeholder="Email address" 
                className="w-full bg-white border-2 border-slate-100 px-6 py-4 rounded-full outline-none focus:border-[#10b981] font-bold text-sm" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              
              <AnimatePresence mode="wait">
                {mode === 'staff' && (
                  <motion.input
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    type="tel"
                    required
                    placeholder="Phone number"
                    className="w-full bg-white border-2 border-slate-100 px-6 py-4 rounded-full outline-none focus:border-[#10b981] font-bold text-sm overflow-hidden"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                )}
              </AnimatePresence>
            </div>

            <button 
              type="submit" 
              className={`w-full px-12 py-4 rounded-full font-black uppercase text-[10px] transition-all flex items-center justify-center gap-2 text-white shadow-lg ${mode === 'customer' ? 'bg-[#0a0e1a] hover:bg-[#10b981]' : 'bg-[#10b981] hover:bg-[#0a0e1a]'}`}
            >
              {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : <>{mode === 'customer' ? 'Notify Me' : 'Submit Application'} <ArrowRight size={14} /></>}
            </button>
          </form>
        ) : (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-[#10b981] font-black italic p-4">
            {mode === 'customer' ? '✓ YOU\'RE ON THE LIST!' : '✓ APPLICATION RECEIVED!'}
          </motion.div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col items-center mt-auto pt-8">
        <button 
          onClick={() => window.location.search = '?email=true'} 
          className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-red-400 transition-colors"
        >
          Unsubscribe
        </button>
        <p className="mt-4 text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">CleanerPro 2026</p>
      </div>
    </div>
  );
}