const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Testing Call function of solidity", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractsFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Box = await ethers.getContractFactory("Box");
    const box = await upgrades.deployProxy(Box, [100], {
      initializer : "store"
    });

    await box.deployed();  
    console.log(`Contract Box V1 isdeployed to ${box.address}`);

    return { box, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the initial state for Variables", async function () {
      const { box } = await loadFixture(deployContractsFixture);

      expect(await box.retrieve()).to.equal(100);
    });
   
  });     
});
