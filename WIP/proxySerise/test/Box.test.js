const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const { ethers, upgrades } = require("hardhat");

let boxV1Address;
describe("Testing Call function of solidity", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractsFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Box = await ethers.getContractFactory("Box");
    const box = await upgrades.deployProxy(Box, [100], { initializer : "store" });
    await box.deployed();  
    boxV1Address = box.address;
    console.log(`Contract Box V1 is deployed to ${box.address}`);

    return { box, owner, otherAccount };
  }

  async function deployV2ContractsFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BoxV2 = await ethers.getContractFactory("BoxV2");
    const boxv2 = await upgrades.upgradeProxy(boxV1Address, BoxV2);
    await boxv2.deployed();  
    console.log(`Contract Box V2 is updated to ${boxv2.address}`);

    return { boxv2, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the initial state for Variables", async function () {
      const { box } = await loadFixture(deployContractsFixture);

      expect(await box.retrieve()).to.equal(100);
    });

    it("Should increament the variable aftr update", async function () {
      const { boxv2 } = await loadFixture(deployV2ContractsFixture);

      // Call inc function and check the state 
      await boxv2.inc();
      expect(await boxv2.retrieve()).to.equal(101);
    });

    it("Should contain the newly added owner", async function () {
      const { boxv2, owner } = await loadFixture(deployV2ContractsFixture);

      await boxv2.setOwner();
      expect(await boxv2.owner()).to.equal(owner.address);
    });
   
  });     
});
