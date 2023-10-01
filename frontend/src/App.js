import React, { useState } from "react";
import Modal from "react-modal";
import CustomField from "./components/CustomField"; // Import the combined component

Modal.setAppElement("#root"); // for accessibility

const App = () => {
  const [isOpen] = useState(true);

  const [fromChain, setFromChain] = useState(null);
  const [toChain, setToChain] = useState(null);

  const allOptions = [
    { label: "Ethereum Mainnet", value: "Ethereum Mainnet" },
    { label: "Polygon", value: "Polygon" },
    { label: "Arbitrum", value: "Arbitrum" },
    { label: "Avalanche", value: "Avalanche" },
    { label: "Optimism", value: "Optimism" },
  ];

  const fromOptions = allOptions.filter((option) => option !== toChain);
  const toOptions = allOptions.filter((option) => option !== fromChain);

  const handleTransaction = () => {
    console.log("Transaction started");
  };

  const connectWallet = () => {
    console.log("Connecting to wallet");
  };

  return (
    <div className="bg-[#131313] min-h-screen">
      <header className="p-4 z-10">
        <img src="/images/logo.png" alt="Header logo" className="h-16" />
      </header>
      <Modal
        isOpen={isOpen}
        contentLabel="Crypto and Chain Modal"
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#131313",
            borderRadius: "10px",
            height: "450px",
            boxShadow:
              "rgb(170 21 197 / 30%) 0 0 10px 0, rgb(170 21 197 / 30%) 0 40px 120px 0",
          },
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.75)", // This is for testing purposes
          },
        }}
      >
        {/* Chain Switch From */}
        <CustomField
          type="dropdown"
          label="From"
          options={fromOptions}
          value={fromChain}
          onChange={(e) => {
            setFromChain(e.target.value);
            console.log("Switch From:", e.target.value);
          }}
        />

        {/* Chain Switch To */}
        <CustomField
          type="dropdown"
          label="To"
          options={toOptions}
          value={toChain}
          onChange={(e) => {
            setToChain(e.target.value);
            console.log("Switch To:", e.target.value);
          }}
        />

        {/* Token */}
        <CustomField
          type="dropdown"
          label="Token"
          options={[
            { label: "MKR", value: "MKR" },
            { label: "LINK", value: "LINK" },
            { label: "UNI", value: "UNI" },
            { label: "AAVE", value: "AAVE" },
            { label: "USDC", value: "USDC" },
          ]}
          onChange={(e) => console.log("Token:", e.target.value)}
        />

        {/* Amount */}
        <CustomField
          type="text"
          label="Amount"
          placeholder="0"
          onChange={(e) => console.log("Amount:", e.target.value)}
        />

        <div className="flex justify-between mt-4">
          {/* Connect Wallet Button */}
          <button
            className="w-[calc(50%-0.5rem)] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]"
            onClick={connectWallet}
          >
            Connect to Wallet
          </button>

          {/* Transaction Button */}
          <button
            onClick={handleTransaction}
            className="w-[calc(50%-0.5rem)] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-[10px]"
          >
            Start Transaction
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
