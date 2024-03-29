// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

const provider = ethers.provider;

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  console.log("locked amount", lockedAmount);


  const LockV2 = await ethers.getContractFactory("LockV2");

  await upgrades.upgradeBeacon("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", LockV2);
  console.log(`beacon contract updated`)

  const instance = await LockV2.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");

  console.log('unlock time', await instance.unlockTime());
    // console.log('owner of the contract', await instance.owner());
    // console.log('owner of the contract Bal', await instance.balance());
    // console.log('balance of the contract -->', await provider.getBalance(instance.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
