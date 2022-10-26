import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const API_KEY_URL = process.env.API_KEY_URL;
const API_KEY_URL_MUMBAI = process.env.API_KEY_URL_MUMBAI;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings : {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  networks: {
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

export default config;



