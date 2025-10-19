import { useFarcasterSDK } from '@farcaster/sdk';
import { useEffect } from 'react';

const sdk = useFarcasterSDK();

useEffect(() => {
  sdk.actions.ready(); // Farcaster'e mini-app hazır olduğunu bildir
}, []);

