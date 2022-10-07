require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    rinkeby: {
      url: API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
    goerli: {
      url: API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};