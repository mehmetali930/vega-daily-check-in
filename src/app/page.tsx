"use client";

import { useEffect } from 'react';
import { sdk } from '@neynar/react';

export default function Page() {
  useEffect(() => {
    const markReady = async () => {
      await sdk.actions.ready();
    };
    markReady();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Vega Daily Check-In</h1>
      <p>Mini-app’iniz Farcaster üzerinde çalışıyor!</p>
    </div>
  );
}

