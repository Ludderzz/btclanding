import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Sparkles className="text-emerald-400" size={16} />
            </div>
            <span className="text-xl font-black italic tracking-tighter text-slate-900">
              CLEANER<span className="text-emerald-500">PRO</span>
            </span>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}