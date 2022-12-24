const {ethers} = require("hardhat");

async function main() {

  const ToBeCalledFactory = await ethers.getContractFactory("ToBeCalled");
  const toBeCalled = await ToBeCalledFactory.deploy();
  await toBeCalled.deployed();

  console.log(`Contract ToBeCalled deployed to ${toBeCalled.address}`);

  const CalleeFactory = await ethers.getContractFactory("Callee");
  const callee = await CalleeFactory.deploy();
  await callee.deployed();
  console.log(`Contract Callee deployed to ${callee.address}`);

  console.log("Contract ToBeCalled State before call");

  let res = await toBeCalled.myInt();
  console.log("ToBeCalled State Variable myInt - ", res);

  await callee.callAndUpdateContractState(toBeCalled.address);
  console.log("Contract ToBeCalled State After call");

  res = await toBeCalled.myInt();
  console.log("ToBeCalled State Variable myInt - ", res);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
