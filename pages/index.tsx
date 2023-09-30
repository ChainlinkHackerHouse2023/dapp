import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CCIP Dapp</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <div className={styles.modal}>
          <div>
            <label for="from">from: </label>
            <select name="from">
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
            <label for="to">to: </label>
            <select name="to">
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
            <label for="token">token: </label>
            <select name="token">
              <option value="link">LINK</option>
              <option value="uni">UNI</option>
              <option value="mkr">MKR</option>
              <option value="usdc">USDC</option>
              <option value="aave">AAVE</option>
            </select>
          </div>
          <div>
            <label for="amount">amount:</label>
            <input type="text" id="amount" name="amount"/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
