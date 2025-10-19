import { useFarcasterSDK } from '@farcaster/sdk';
import { useEffect } from 'react';

export default function Home() {
  // Farcaster SDK nesnesi
  const sdk = useFarcasterSDK();

  // Mini-app yüklendiğinde Farcaster'a hazır olduğunu bildir
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Vega Daily Check-In</h1>
      <p>Mini-app’iniz Farcaster üzerinde çalışıyor!</p>
    </div>
  );
}
