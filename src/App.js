import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);
  const [signature, setSignature] = useState(null);
  const [message, setMessage] = useState("Sign in to my dApp");

  // Updated function: Uses Web3Provider (Ethers.js v5)
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum); // Updated from BrowserProvider
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Connected to:", address);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };

  // Function to sign a message
  const signMessage = async () => {
    if (!account) {
      alert("Connect your wallet first!");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // Updated from BrowserProvider
      const signer = provider.getSigner();
      const signedMessage = await signer.signMessage(message);
      setSignature(signedMessage);
      console.log("Message signed:", signedMessage);
    } catch (error) {
      console.error("Signing error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Sign In with Ethereum</h2>
      {account ? (
        <>
          <p><b>Connected:</b> {account}</p>
          <button onClick={signMessage}>Sign Message</button>
          {signature && (
            <p><b>Signature:</b> {signature}</p>
          )}
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
