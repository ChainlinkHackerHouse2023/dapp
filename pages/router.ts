const supportedNetworks = [
  "ethereumSepolia",
  "optimismGoerli",
  "arbitrumTestnet",
  "avalancheFuji",
  "polygonMumbai",
];

const ethereumSepolia = {
  address: "0xd0daae2231e9cb96b94c8512223533293c3693bf",
  chainSelector: "16015286601757825753",
};

const optimismGoerli = {
  address: "0xeb52e9ae4a9fb37172978642d4c141ef53876f26",
  chainSelector: "2664363617261496610",
};

const avalancheFuji = {
  address: "0x554472a2720e5e7d5d3c817529aba05eed5f82d8",
  chainSelector: "14767482510784806043",
};

const arbitrumTestnet = {
  address: "0x88e492127709447a5abefdab8788a15b4567589e",
  chainSelector: "6101244977088475029",
};

const polygonMumbai = {
  address: "0x70499c328e1e2a3c41108bd3730f6670a44595d1",
  chainSelector: "12532609583862916517",
};

const getRouterConfig = (network: any) => {
  switch (network) {
    case 11155111: // for ethereum sepolia
      return ethereumSepolia;
    case 420: // optimism goerli
      return optimismGoerli;
    case 412163: // arbitrum testnet
      return arbitrumTestnet;
    case 43113: // avalanche fuji
      return avalancheFuji;
    case 80001: //
      return polygonMumbai;
    default:
      throw new Error("Unknown network: " + network);
  }
};

// const getRouterConfig = (network: any) => {
//   switch (network) {
//     case "ethereumSepolia":
//       return ethereumSepolia;
//     case "optimismGoerli":
//       return optimismGoerli;
//     case "arbitrumTestnet":
//       return arbitrumTestnet;
//     case "avalancheFuji":
//       return avalancheFuji;
//     case "polygonMumbai":
//       return polygonMumbai;
//     default:
//       throw new Error("Unknown network: " + network);
//   }
// };

module.exports = {
  getRouterConfig,
  supportedNetworks,
};
