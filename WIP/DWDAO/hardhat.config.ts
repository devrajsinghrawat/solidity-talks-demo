import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv";

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
  defaultNetwork: "hardhat",
  networks: {
    // hardhat:{
    //   chainId: 31337
    // },
    localhost:{
      url: "localhost:8545",
      chainId: 31337
    },

    // mumbai: {
    //   url: process.env.API_KEY_URL_MUMBAI,
    //   accounts: [process.env.PRIVATE_KEY],
    // }, 
  },

  namedAccounts:{
    deployer: {
      default: 0,
      },
    },

  etherscan: {
    apiKey: process.env.EtherScanApiKey
  }
};

export default config;



