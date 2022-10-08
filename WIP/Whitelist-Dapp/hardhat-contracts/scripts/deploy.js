// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const maxWhitelistedAddresses = 100;
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our Whitelist contract.
  */
  const WhitelistFactory = await ethers.getContractFactory("Whitelist");
  // const WhitelistFactory = await hre.ethers.getContractFactory("Whitelist");
  const whitelist = await WhitelistFactory.deploy(maxWhitelistedAddresses);

  await whitelist.deployed();

  console.log(
    `deployed contract address : ${whitelist.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
