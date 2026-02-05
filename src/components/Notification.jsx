import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Notification({ show }) {
  if (!show) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      className="fixed top-20 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none"
    >
      <div className="bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-emerald-500/30 pointer-events-auto">
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Request Received</p>
          <p className="font-bold tracking-tight">We are matching you with our best cleaner!</p>
        </div>
      </div>
    </motion.div>
  );
}