import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import CustomField from "../components/CustomField";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useNetwork } from "wagmi";

// Define your option type
interface Option {
  label: string;
  value: string;
}

const App: React.FC = () => {
  const [isOpen] = useState(true);
  const [fromChain, setFromChain] = useState<Option | null>(null);
  const [toChain, setToChain] = useState<Option | null>(null);

  const allOptions: Option[] = [
    { label: "Ethereum Mainnet", value: "Ethereum Mainnet" },
    { label: "Polygon", value: "Polygon" },
    { label: "Arbitrum", value: "Arbitrum" },
    { label: "Avalanche", value: "Avalanche" },
    { label: "Optimism", value: "Optimism" },
  ];

  const { chain } = useNetwork();
  interface CcipArguments {
    sourceChain: any;
    destinationChain: any;
    destinationAddress: any;
    tokenAddress: any;
    amount: any;
    feeTokenAddress: any;
  }

  const [formData, setFormData] = useState<CcipArguments>({
    sourceChain: chain?.name,
    destinationChain: "",
    destinationAddress: "",
    tokenAddress: "",
    amount: 0,
    feeTokenAddress: "",
  });

  const fromOptions = allOptions.filter((option) => option !== toChain);
  const toOptions = allOptions.filter((option) => option !== fromChain);

  const handleTransaction = () => {
    console.log("Transaction started");
  };

  const connectWallet = () => {
    console.log("Connecting to wallet");
  };

  // Further down, you'd also need to update the type for the event parameter in your onChange handlers:
  const handleDropdownChange = (
    e: ChangeEvent<HTMLSelectElement>,
    setFunction: React.Dispatch<React.SetStateAction<Option | null>>
  ) => {
    const selectedValue = e.target.value;
    const selectedOption =
      allOptions.find((option) => option.value === selectedValue) || null;
    setFunction(selectedOption);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Here, you can perform actions with the form data, e.g., send it to a server.
    console.log("Form data submitted:", formData);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      {/*  className={styles.container} */}
      <Head>
        <title>CCIP Dapp</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
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
            <ConnectButton />

            <form onSubmit={handleSubmit}>
              <CustomField
                type="dropdown"
                label="From"
                options={fromOptions}
                onChange={() => handleInputChange}
              />

              <CustomField
                type="dropdown"
                label="To"
                options={toOptions}
                onChange={() => handleInputChange}
              />

              <CustomField
                type="dropdown"
                label="Token"
                options={[
                  { label: "MKR", value: "MKR" },
                  // value depends on chain we're on...
                  { label: "LINK", value: "LINK" },
                  // ... other options
                ]}
                onChange={() => handleInputChange}
              />

              <CustomField
                type="text"
                label="Amount"
                placeholder="0"
                onChange={() => handleInputChange}
              />

              <button type="submit">Bridge</button>
            </form>

            {/* <div className="flex justify-between mt-4">
              <button
                className="w-[calc(50%-0.5rem)] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]"
                onClick={connectWallet}
              >
                Connect to Wallet
              </button>

              <button
                onClick={handleTransaction}
                className="w-[calc(50%-0.5rem)] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-[10px]"
              >
                Start Transaction
              </button>
            </div> */}
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default App;
