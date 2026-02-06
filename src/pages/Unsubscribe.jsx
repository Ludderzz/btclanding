import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');
  const email = searchParams.get('email');

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

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    processUnsubscribe();
  }, [email]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 bg-[#fcfcfc]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm text-center"
      >
        {status === 'processing' && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="animate-spin text-[#10b981]" size={40} />
            <h1 className="text-xl font-black uppercase italic italic">Processing...</h1>
            <p className="text-slate-500 text-sm">Removing {email} from our list.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-emerald-50 p-4 rounded-full">
                <CheckCircle2 className="text-[#10b981]" size={40} />
            </div>
            <h1 className="text-2xl font-black uppercase italic italic text-slate-900">REMOVED.</h1>
            <p className="text-slate-500 text-sm leading-tight">
                You've been successfully unsubscribed. We're sorry to see you go!
            </p>
          </div>
        )}

        {(status === 'error' || status === 'no-email') && (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-red-50 p-4 rounded-full">
                <XCircle className="text-red-500" size={40} />
            </div>
            <h1 className="text-2xl font-black uppercase italic italic text-slate-900">HMMM...</h1>
            <p className="text-slate-500 text-sm leading-tight">
                {status === 'no-email' 
                  ? "We couldn't find an email address in this link." 
                  : "We couldn't find that email on our list or something went wrong."}
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-50">
            <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#10b981] transition-colors"
            >
                <ArrowLeft size={14} /> Back to CleanerPro
            </Link>
        </div>
      </motion.div>
      <p className="mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">CleanerPro 2026</p>
    </div>
  );
}