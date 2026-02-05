<motion.div 
  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
  className="glass-card p-16 rounded-[5rem] text-center max-w-xl mx-auto shadow-2xl border border-white"
>
  <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 rotate-3 shadow-lg shadow-emerald-500/40">
    <CheckCircle2 size={48} />
  </div>
  <h1 className="text-6xl font-black italic tracking-tighter mb-4 text-slate-900">BOOM.</h1>
  <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed">
    Your request is in our system. We are currently analyzing our fleet to find your perfect cleaner.
  </p>
  <button onClick={onHome} className="bg-slate-900 text-white px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all">
    Return to Dashboard
  </button>
</motion.div>