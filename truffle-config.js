// require("env").config();
// var HDWalletProvider = require("@truffle/hdwallet-provider");
// var mnemonic = process.env.MNEMONIC;
// var Infura_ropsten = process.env.INFURA_KEY_ROPSTEN;
// var Infura_mainnet = process.env.INFURA_KEY_MAINNET;
// console.log("MNEMONIC", mnemonic, "ROPSTEN", Infura_ropsten);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    // ropsten: {
    //   provider: function () {
    //     return new HDWalletProvider(mnemonic, Infura_ropsten);
    //   },
    //   network_id: 3,
    // },
    // mainnet: {
    //   provider: function () {
    //     return new HDWalletProvider(mnemonic, Infura_mainnet);
    //   },
    //   network_id: 1,
    // },
    // kovan: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       mnemonic,
    //       "https://kovan.infura.io/v3/5024e5118d7948688ea9397ce7671e00"
    //     );
    //   },
    //   network_id: 42,
    // },
  },
  compilers: {
    solc: {
      version: "0.4.24", // ex:  "0.4.20". (Default: Truffle's installed solc)
    },
  },
};
