import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Unsubscribe from './pages/Unsubscribe'; // Make sure this file exists in src/pages/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        {/* Fallback route: if they go to a broken link, send them home */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;