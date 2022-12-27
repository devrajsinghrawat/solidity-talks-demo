const {ethers} = require("hardhat");

async function main() {

  const Box = await ethers.getContractFactory("Box");
  const box = await upgrades.deployProxy(Box, [100], {
    initilizer : "store"
  });
  await box.deployed();

  console.log(`Contract Box V1 isdeployed to ${box.address}`);


  console.log("Contract ToBeCalled State before call");

  let instance = await Box.attach(box.address);
  let value = (await instance.retrive()).toString();
  console.log("State Variable value - ", value);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
