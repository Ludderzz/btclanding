import React from 'react';

// MAKE SURE "export default" IS HERE
export default function Success({ onHome }) {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-black italic">SUCCESS!</h1>
      <button onClick={onHome} className="mt-4 underline">Go Home</button>
    </div>
  );
}