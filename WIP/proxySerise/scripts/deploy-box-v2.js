const { ethers, upgrades } = require("hardhat");


const proxyContract = '0x7A7185DDe6Cf3738D4144655e9ed3562653e6c03';
async function main() {

  const BoxV2 = await ethers.getContractFactory("BoxV2");
  const boxv2 = await upgrades.upgradeProxy(proxyContract, BoxV2);
  await boxv2.deployed();  
  console.log(`Contract boxProxy V2 is updated to ${boxv2.address}`); 

  // let instance = await BoxV2.attach(boxv2.address);
  // await instance.setOwner();
  // console.log("newly added State Variable value - ", await boxv2.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
