const { ethers, upgrades } = require("hardhat");


const BEACON_ADDRESS = '0x8FfF8f244c2c7359174072cf80A6022984E93F24';
const BOX_PROXY_ADDRESS = '0x477Bb1BED26a90A440570C14C0A86B4b7C27F2A0';

async function main() {

  const BoxV2 = await ethers.getContractFactory("BoxV2");
  await upgrades.upgradeBeacon(BEACON_ADDRESS, BoxV2);
  console.log(`Beacon Contract Upgraded`); 

  let instance = await BoxV2.attach(BOX_PROXY_ADDRESS);
  console.log("newly added State Variable value - ", await instance.retrieve());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
