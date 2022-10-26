import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

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
  
  etherscan: {
    apiKey: process.env.EtherScanApiKey
  }
};

export default config;



