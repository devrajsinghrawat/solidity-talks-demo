require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const API_KEY_URL = process.env.API_KEY_URL;
const API_KEY_URL_MUMBAI = process.env.API_KEY_URL_MUMBAI;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: API_KEY_URL_MUMBAI,
      accounts: [PRIVATE_KEY1],
    },    
    rinkeby: {
      url: API_KEY_URL,
      accounts: [PRIVATE_KEY1],
    },
    goerli: {
      url: API_KEY_URL,
      accounts: [PRIVATE_KEY1],
    },
  },
};