const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GinnyPig Wallet", function () {
  it("should deploy GinnyPig with a initial balance", async function () {
    const GinnyPig = await ethers.getContractFactory("GinnyPig");
    // Deploy the contract along with 1 ETH balance
    const ginnyPig = await GinnyPig.deploy({ value: 100 });
    await ginnyPig.deployed();
    // 1 ETH = 1000000000000000000 Wei
    expect(await ginnyPig.getBalance()).to.equal(100);
  });
});
