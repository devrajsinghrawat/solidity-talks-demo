

const { ethers, upgrades } = require("hardhat");
const provider = ethers.provider;

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  console.log("locked amount", lockedAmount);

  const Lock = await ethers.getContractFactory("Lock");

  const impl = await upgrades.deployImplementation(Lock, {value: lockedAmount });
  console.log("Impl contract deployed at", impl.address);
  
  const beacon = await upgrades.deployBeacon(Lock);
  await beacon.deployed();

  console.log("beacon contract deployed at", beacon.address)


  console.log("implementation deployed to:", await upgrades.beacon.getImplementationAddress(beacon.address));  

  const instance = await upgrades.deployBeaconProxy(beacon, Lock, [unlockTime],{ value: lockedAmount }); // beaconProxy
  // console.log("instance ---> ", instance.deployTransaction);

  await instance.deployed();

  console.log(
    `instance with 1 ETH and unlock timestamp ${unlockTime} deployed to ${instance.address}`
  );

  console.log('unlock time', await instance.unlockTime());
  // console.log('unlock time', await instance.getUnlockTime());
  console.log('owner of the contratc', await instance.owner());


  console.log('balance of the contract -->', await provider.getBalance(instance.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
