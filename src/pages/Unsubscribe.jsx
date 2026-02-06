import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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

        if (response.ok) setStatus('success');
        else setStatus('error');
      } catch (err) {
        setStatus('error');
      }
    };

    processUnsubscribe();
  }, [email]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="hero-text text-4xl mb-4">Unsubscribe</h1>
      {status === 'processing' && <p>Removing {email} from our list...</p>}
      {status === 'success' && <p className="text-[#10b981] font-bold">You have been removed from the list.</p>}
      {status === 'error' && <p className="text-red-500">Something went wrong. Please try again later.</p>}
      {status === 'no-email' && <p>Invalid unsubscribe link.</p>}
    </div>
  );
}