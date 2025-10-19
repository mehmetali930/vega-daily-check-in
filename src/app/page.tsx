"use client";

import { useEffect, useState } from "react";
import { createNeynarSDK, WalletProvider } from "@neynar/react";

const STORAGE_KEY = "vega_daily_checkin";

type UserData = {
  lastCheckIn: string | null;
  points: number;
};

export default function Page() {
  const sdk = createNeynarSDK();
  const [wallet, setWallet] = useState<{ address: string } | null>(null);
  const [userData, setUserData] = useState<UserData>({ lastCheckIn: null, points: 0 });
  const CHECKIN_FEE_USDC = 0.05;
  const RECEIVER_ADDRESS = "0x033cBc3502FA72c4e4071c8263C3121fA3A84cA8"; // Your Base/Farcaster wallet

  // Get today's date in Turkey timezone
  const getTodayTR = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const trTime = new Date(utc + 3 * 3600000);
    return trTime.toISOString().slice(0, 10);
  };

  useEffect(() => {
    if (sdk.actions?.ready) sdk.actions.ready();
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setUserData(JSON.parse(saved));
  }, []);

  const updateUserData = (newData: UserData) => {
    setUserData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const handleCheckIn = async () => {
    if (!wallet) return alert("Please connect your Farcaster Wallet first!");
    const today = getTodayTR();
    if (userData.lastCheckIn === today) return alert("You have already checked in today!");

    try {
      // Send USDC via Farcaster Wallet on Base mainnet
      await sdk.wallet.sendTransaction({
        to: RECEIVER_ADDRESS,
        value: CHECKIN_FEE_USDC,
        token: "USDC",
        network: "base-mainnet",
      });

      updateUserData({ lastCheckIn: today, points: userData.points + 100 });
      alert("Check-in successful! You earned 100 points and 0.05 USDC has been paid.");
    } catch (err) {
      console.error(err);
      alert("Transaction failed. Please check your wallet.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Vega Daily Check-In</h1>

      {!wallet ? (
        <WalletProvider
          sdk={sdk}
          provider="Farcaster"
          onConnect={(w) => setWallet(w)}
        >
          <button>Connect Farcaster Wallet</button>
        </WalletProvider>
      ) : (
        <div>
          <p>Connected Wallet: {wallet.address}</p>
          <p>Total Points: {userData.points}</p>
          <p>Last Check-In: {userData.lastCheckIn || "Never"}</p>
          <button onClick={handleCheckIn} style={{ marginTop: "20px" }}>
            Daily Check-In (0.05 USDC)
          </button>
        </div>
      )}
    </div>
  );
}
