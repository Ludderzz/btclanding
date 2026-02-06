import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function Unsubscribe({ onHome }) {
  const [status, setStatus] = useState('processing');
  
  // Standard JS way to get the email without a Router library
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');

  useEffect(() => {
    if (!email) {
      setStatus('no-email');
      return;
    }

    const processUnsubscribe = async () => {
      try {
        const response = await fetch('/api/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (response.ok) setStatus('success');
        else setStatus('error');
      } catch (err) {
        setStatus('error');
      }
    };

    processUnsubscribe();
  }, [email]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 bg-[#fcfcfc]">
      <div className="max-w-md w-full bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm text-center">
        {status === 'processing' && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="animate-spin text-[#10b981]" size={40} />
            <h1 className="text-xl font-black uppercase italic">Processing...</h1>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle2 className="text-[#10b981]" size={40} />
            <h1 className="text-2xl font-black uppercase italic text-slate-900">REMOVED.</h1>
            <p className="text-slate-500 text-sm">Successfully unsubscribed.</p>
          </div>
        )}

        {(status === 'error' || status === 'no-email') && (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="text-red-500" size={40} />
            <h1 className="text-2xl font-black uppercase italic text-slate-900">HMMM...</h1>
            <p className="text-slate-500 text-sm">Email not found or link is broken.</p>
          </div>
        )}

        <button 
          onClick={onHome}
          className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#10b981] mx-auto"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
      </div>
    </div>
  );
}