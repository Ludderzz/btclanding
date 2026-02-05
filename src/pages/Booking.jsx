import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Notification from '../components/Notification';

export default function Booking({ onBack, onComplete }) {
  const [showNotif, setShowNotif] = useState(false);

  const triggerSubmit = () => {
    setShowNotif(true);
    setTimeout(() => { onComplete(); }, 3500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <Notification show={showNotif} />
      
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mb-12 hover:text-emerald-500 transition-colors">
          <ArrowLeft size={14} /> Escape to Home
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-12">Configure <br/> <span className="text-emerald-500 text-7xl">Your Clean.</span></h2>
            
            <div className="glass-panel p-8 md:p-12 rounded-[4rem] space-y-10">
              {/* Input Group */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 ml-2">Postcode Area</label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-emerald-500 text-slate-950 p-6 rounded-[2rem] font-black italic text-xl">BS21</button>
                  <button className="bg-slate-800/50 border border-slate-700 text-white p-6 rounded-[2rem] font-black italic text-xl hover:bg-slate-800">BS22</button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 ml-2">Property Size</label>
                <input type="range" className="w-full accent-emerald-500" />
                <div className="flex justify-between text-xs font-black text-slate-500">
                  <span>1 BED</span>
                  <span>5+ BEDS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Total Side */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 glass-panel p-10 rounded-[4rem] border-emerald-500/30 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
               <h3 className="text-2xl font-black italic uppercase mb-8">Booking Summary</h3>
               
               <div className="space-y-4 mb-12">
                 <div className="flex justify-between items-center text-sm font-bold text-slate-400 italic">
                   <span>Standard Clean (3 hrs)</span>
                   <span>£72.00</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-bold text-emerald-500 italic">
                   <span>Zonal Transport (BS21)</span>
                   <span>FREE</span>
                 </div>
               </div>

               <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Grand Total</span>
                  <span className="text-5xl font-black tracking-tighter italic">£72.00</span>
               </div>

               <button 
                onClick={triggerSubmit}
                className="w-full bg-white text-slate-950 py-8 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-2xl"
               >
                 Authorize with Stripe
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}