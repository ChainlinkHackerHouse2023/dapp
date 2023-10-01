import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useNetwork } from "wagmi";
import styles from "../styles/Home.module.css";
import { getRouterConfig } from "./router";

interface CcipArguments {
  sourceChain: any;
  destinationChain: any;
  destinationAddress: any;
  tokenAddress: any;
  amount: any;
  feeTokenAddress: any;
}

const Home: NextPage = () => {
  const { chain } = useNetwork();
  console.log("chain:", chain);

  // useEffect(() => {
  //   // get chain id
  //   // get chainselector from routerConfig
  //   if (chain) {
  //     console.log(chain.id);
  //     console.log(getRouterConfig(chain.id));
  //   }
  // }, [chain]);

  const [formData, setFormData] = useState<FormData>({
    sourceChain: getRouterConfig(chain?.id),
    destinationChain: "",
    destinationAddress: "",
    tokenAddress: "",
    amount: 0,
    feeTokenAddress: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Here, you can perform actions with the form data, e.g., send it to a server.
    console.log("Form data submitted:", formData);
  };

  // add token address (for different chains) here:
  const [linkOptionValue, setLinkOption] = useState({
    label: "LINK",
    value: "",
  });

  const linkTokenAddresses = [
    {
      chain: "Sepolia",
      chainId: 11155111,
      address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    },
    {
      chain: "Polygon Testnet",
      chainId: 80001,
      address: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },
  ];

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CCIP Dapp</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <div className={styles.modal}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="destinationChain">destination chain: </label>
              <select
                name="destinationChain"
                onChange={(e) => handleInputChange(e)}
              >
                <option value="">Select</option>
                <option value="ethereum">Ethereum</option>
                <option value="polygon">Polygon</option>
                <option value="arbitrum">Arbitrum</option>
                <option value="optimism">Optimism</option>
                <option value="avalanche">Avalanche</option>
                <option value="base">Base</option>
                <option value="bnb">BNB</option>
              </select>
            </div>
            <div>
              <label htmlFor="destinationAddress">destination address:</label>
              <input
                onChange={handleInputChange}
                type="text"
                id="destinationAddress"
                name="destinationAddress"
              />
            </div>
            <div>
              <label htmlFor="token">token: </label>
              <select onChange={() => handleInputChange} name="token">
                <option value="">Select</option>
                <option value="link">LINK</option>
                <option value="uni">UNI</option>
                <option value="mkr">MKR</option>
                <option value="usdc">USDC</option>
                <option value="aave">AAVE</option>
              </select>
            </div>
            <div>
              <label htmlFor="amount">amount:</label>
              <input
                onChange={handleInputChange}
                type="text"
                id="amount"
                name="amount"
              />
            </div>
            <div>
              <label htmlFor="feeToken">pay with: </label>
              <select onChange={() => handleInputChange} name="feeToken">
                <option value="">Select</option>
                <option value="link">LINK</option>
                <option value="native">Native</option>
              </select>
            </div>
            <button type="submit">Bridge</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
