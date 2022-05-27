const { ethers, upgrades } = require("hardhat");

async function main() {
  const DevD = await ethers.getContractFactory("DevD");
  const proxy = await upgrades.deployProxy(DevD, [10]);
  await proxy.deployed();

  console.log(proxy.address);
}

main();