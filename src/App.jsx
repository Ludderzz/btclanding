import React, { useState } from 'react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Booking from './pages/Booking';
import Success from './pages/Success';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'booking', 'success'

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
    </Layout>
  );
}