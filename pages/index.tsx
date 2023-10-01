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

  const [formData, setFormData] = useState<FormData>({
    sourceChain: chain ? getRouterConfig(String(chain.id)).chainSelector : "",
    destinationChain: "",
    destinationAddress: "",
    tokenAddress: "", // optioning
    amount: 0,
    feeTokenAddress: "", // there's a different address for tokens and for gas fees paid on token transactions
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // what do we do with the args now?...
    console.log("Form data submitted:", formData);
  };

  // add token address (for different chains) here:
  const [LINKOptionValue, setLINKOption] = useState({
    chainId: "",
    tokenAddress: "",
  });

  // others for other token addresses
  const LINKOptions = [
    {
      chainId: "11155111",
      chainName: "Ethereum Sepolia",
      tokenAddress: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    },
    {
      chainId: "80001",
      chainName: "Polygon Mumbai",
      tokenAddress: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },
    {
      chainId: "420",
      chainName: "Optimism Goerli",
      tokenAddress: "0xdc2CC710e42857672E7907CF474a69B63B93089f",
    },
    {
      chainId: "412163",
      chainName: "Arbitrum Goerli",
      tokenAddress: "0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28",
    },
    {
      chainId: "43113",
      tokenAddress: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
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

  const setTokenAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    console.log(event.target.value);
    // setFormData({
    //   ...formData,
    //   tokenAddress: event.target.value,
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
            {/* Destination chain */}
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

            {/* Destination address */}
            <div>
              <label htmlFor="destinationAddress">destination address:</label>
              <input
                onChange={handleInputChange}
                type="text"
                id="destinationAddress"
                name="destinationAddress"
              />
            </div>

            {/* Token address */}
            <div>
              <label htmlFor="token">token: </label>
              <select onChange={(e) => setTokenAddress(e)} name="token">
                <option value="">Select</option>
                <option value="link">LINK</option>
                <option value="uni">UNI</option>
                <option value="mkr">MKR</option>
                <option value="usdc">USDC</option>
                <option value="aave">AAVE</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount">amount:</label>
              <input
                onChange={handleInputChange}
                type="text"
                id="amount"
                name="amount"
              />
            </div>

            {/* Fee token address */}
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
