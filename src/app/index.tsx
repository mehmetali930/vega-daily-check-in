import { useFarcasterSDK } from '@farcaster/sdk';
import { useEffect } from 'react';

export default function Home() {  // Component fonksiyonu açıldı
  const sdk = useFarcasterSDK();  // SDK nesnesi fonksiyon içinde olmalı

  useEffect(() => {
    sdk.actions.ready(); // Farcaster'a mini-app hazır olduğunu bildir
  }, []);

  return (
    <div>
      <h1>Vega Daily Check-In</h1>
    </div>
  );
}

