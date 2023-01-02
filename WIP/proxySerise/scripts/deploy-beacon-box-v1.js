const { ethers, upgrades } = require("hardhat");


async function main() {

  const Box = await ethers.getContractFactory("Box");
  const beacon = await upgrades.deployBeacon(Box);
  await beacon.deployed();
  console.log("Beacon deployed to:", beacon.address);

  const beaconProxy = await upgrades.deployBeaconProxy(beacon, Box, [100], 
  { 
    initializer : "store" 
  });

  await beaconProxy.deployed();  
  console.log("Box V1 Proxy is deployed to:", beaconProxy.address);


  let instance = await Box.attach(beaconProxy.address);
  let value = (await instance.retrieve()).toString();
  console.log("State Variable value - ", value);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
