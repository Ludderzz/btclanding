import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Booking from './pages/Booking';
import Success from './pages/Success';
import Unsubscribe from './pages/Unsubscribe';

export default function App() {
  const [view, setView] = useState('landing');

  // Check if the URL has ?email= in it when the page loads
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (window.location.pathname === '/unsubscribe' || params.has('email')) {
      setView('unsubscribe');
    }
  }, []);

  return (
    <Layout>
      {view === 'landing' && <Landing onStartBooking={() => setView('booking')} />}
      {view === 'booking' && (
        <Booking 
          onBack={() => setView('landing')} 
          onComplete={() => setView('success')} 
        />
      )}
      {view === 'success' && <Success onHome={() => setView('landing')} />}
      {view === 'unsubscribe' && <Unsubscribe onHome={() => setView('landing')} />}
    </Layout>
  );
}