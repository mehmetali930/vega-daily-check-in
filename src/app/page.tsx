import { useFarcasterSDK } from '@farcaster/sdk';
import { useEffect } from 'react';

export default function Page() {
  const sdk = useFarcasterSDK(); // SDK nesnesi component içinde olmalı

  useEffect(() => {
    sdk.actions.ready(); // Farcaster'a mini-app hazır olduğunu bildir
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Vega Daily Check-In</h1>
      <p>Mini-app’iniz Farcaster üzerinde çalışıyor!</p>
    </div>
  );
}
