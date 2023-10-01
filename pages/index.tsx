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

  const [formData, setFormData] = useState<FormData>({
    sourceChain: chain ? getRouterConfig(String(chain.id)).chainSelector : "",
    destinationChain: "",
    destinationAddress: "",
    tokenAddress: "", // link optioning
    amount: 0,
    feeTokenAddress: "", // how do we fill this?...
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

  const setDestinationChain = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    console.log(event.target.value);
    console.log(getRouterConfig(event.target.value).chainSelector);
    // setFormData({
    //   ...formData,
    //   destinationChain: event.target.value,
    // });
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
                onChange={(e) => setDestinationChain(e)}
              >
                <option value="">Select</option>
                {/* <option value="ethereum">Ethereum</option> */}
                <option value="11155111">Ethereum</option>
                <option value="80001">Polygon</option>
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
              <select onChange={(e) => handleInputChange(e)} name="token">
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
