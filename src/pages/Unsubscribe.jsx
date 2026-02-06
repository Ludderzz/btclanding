import React, { useState } from 'react';
import { CheckCircle2, XCircle, Loader2, ArrowLeft, Trash2 } from 'lucide-react';

export default function Unsubscribe({ onHome }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Unsubscribe Error:", err);
      setStatus('error');
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 bg-[#fcfcfc]">
      <div className="max-w-md w-full bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm text-center">
        
        {/* INPUT STATE */}
        {(status === 'idle' || status === 'loading') && (
          <div className="space-y-6">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="text-slate-400" size={28} />
            </div>
            <div>
                <h1 className="text-2xl font-black uppercase italic text-slate-900">Remove Email</h1>
                <p className="text-slate-500 text-sm mt-2 leading-tight">
                    Enter your email to be removed from the list.
                </p>
            </div>

            <form onSubmit={handleUnsubscribe} className="space-y-3">
              <input 
                type="email" 
                required 
                placeholder="email@example.com" 
                className="w-full bg-white border-2 border-slate-100 px-6 py-4 rounded-full outline-none focus:border-red-400 font-bold text-sm text-center" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-[#0a0e1a] hover:bg-red-500 text-white py-4 rounded-full font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : "Unsubscribe"}
              </button>
            </form>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === 'success' && (
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="bg-emerald-50 p-4 rounded-full">
                <CheckCircle2 className="text-[#10b981]" size={40} />
            </div>
            <h1 className="text-2xl font-black uppercase italic text-slate-900">REMOVED.</h1>
            <p className="text-slate-500 text-sm">You've been taken off the list.</p>
          </div>
        )}

        {/* ERROR STATE */}
        {status === 'error' && (
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="bg-red-50 p-4 rounded-full">
                <XCircle className="text-red-500" size={40} />
            </div>
            <h1 className="text-2xl font-black uppercase italic text-slate-900">NOT FOUND.</h1>
            <p className="text-slate-500 text-sm">We couldn't find that email on our list.</p>
            <button onClick={() => setStatus('idle')} className="text-[10px] font-black uppercase text-[#10b981] underline">
                Try again
            </button>
          </div>
        )}

        <button 
          onClick={onHome}
          className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#10b981] w-full transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
      </div>
    </div>
  );
}