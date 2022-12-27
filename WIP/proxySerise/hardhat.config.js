require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
      goerli: {
        url: process.env.API_KEY_URL,
        accounts: [process.env.PRIVATE_KEY],
      }
  },

  etherscan: {
    apiKey: process.env.EtherScanApiKey
  }
};
