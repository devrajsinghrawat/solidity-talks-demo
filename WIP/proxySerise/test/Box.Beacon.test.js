// const {
//   loadFixture,
// } = require("@nomicfoundation/hardhat-network-helpers");

const helpers = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

const address = "0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6";
let boxBeaconProxyAddress = '0x477Bb1BED26a90A440570C14C0A86B4b7C27F2A0';

describe("Testing Call function of solidity", function () {
  async function getDeployedContractsFixture() {

    await helpers.impersonateAccount(address);
    const impersonatedSigner = await ethers.getSigner(address);
    const BoxV2 = await ethers.getContractFactory("BoxV2");
    const boxV2BeaconProxy = BoxV2.attach(boxBeaconProxyAddress);
    console.log(boxV2BeaconProxy);
    return { boxV2BeaconProxy, impersonatedSigner };
  }

  describe("Deployment", function () {
    it("Should get the initial state for Variables", async function () {
      const { boxV2BeaconProxy, impersonatedSigner } = await helpers.loadFixture(getDeployedContractsFixture);

      expect(await boxV2BeaconProxy.retrieve({from: impersonatedSigner})).to.equal(101);
    });

    // it("Should increament the variable aftr update", async function () {
    //   const { boxV2BeaconProxy } = await loadFixture(getDeployedContractsFixture);

    //   // Call inc function and check the state 
    //   await boxV2BeaconProxy.inc();
    //   expect(await boxV2BeaconProxy.retrieve()).to.equal(102);
    // });

    // it("Should contain the newly added owner", async function () {
    //   const { boxV2BeaconProxy, owner } = await loadFixture(getDeployedContractsFixture);
    //   expect(await boxV2BeaconProxy.owner()).to.equal(owner.address);
    // });
   
  });     
});
