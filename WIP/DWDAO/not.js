require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });
require("hardhat-deploy");

const LOCAL = process.env.LOCAL;
const API_KEY_URL = process.env.API_KEY_URL;
const API_KEY_URL_MUMBAI = process.env.API_KEY_URL_MUMBAI;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    version: "0.8.17",
    settings : {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  defaultNetwork: "hardhat",
  networks: {
    dev: {
      url: LOCAL,
      accounts: [PRIVATE_KEY],
    },

    mumbai: {
      url: API_KEY_URL_MUMBAI,
      accounts: [PRIVATE_KEY],
    },    
    rinkeby: {
      url: API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
    goerli: {
      url: API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.EtherScanApiKey
  }
};