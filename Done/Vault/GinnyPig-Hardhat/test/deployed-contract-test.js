// const { beforeEach } = require("mocha");
const { expect } = require("chai");
const truffleAssert = require("truffle-assertions");
const { ethers } = require("hardhat");

// let ginnyPigContractAddress;
let ginnyPigContract;
describe("GinnyPig Contract", function () {
  before(async () => {
    const GinnyPig = await ethers.getContractFactory("GinnyPig");

    const ginnyPig = await GinnyPig.deploy({
      value: ethers.utils.parseEther("1.0"),
    });
    await ginnyPig.deployed();
    // ginnyPigContractAddress = await ginnyPig.address;
    ginnyPigContract = await GinnyPig.attach(ginnyPig.address);

    console.log("GinnyPig deployed to:", ginnyPig.address);
    console.log("Deployed Contract Balance", await ginnyPig.getBalance());
  });

  it("should fetch the balance of ginnyPig Contract", async function () {
    expect(await ginnyPigContract.getBalance()).to.equal(
      ethers.utils.parseEther("1.0")
    );
    console.log(
      `----> GinnyPig Account Balance: ${ethers.utils.formatEther(
        await ginnyPigContract.getBalance()
      )}`
    );
  });

  it("deposit 10 Wei into GinnyPig from Owner account", async function () {
    const accounts = await ethers.getSigners();
    const owner = accounts[0];

    console.log(
      `Before Tx: owner account:
      ${owner.address}, Balance:
      ${await owner.getBalance()}`
    );
    // send 10 Wei from Owner account to GinnyPig
    await owner.sendTransaction({
      to: ginnyPigContract.address,
      value: ethers.utils.parseEther("1.0"),
    });
    console.log(
      `After Tx: owner account:
      ${owner.address}, Balance:
      ${await owner.getBalance()}`
    );

    console.log(
      `----> GinnyPig Account Balance: ${ethers.utils.formatEther(
        await ginnyPigContract.getBalance()
      )}`
    );

    expect(await ginnyPigContract.getBalance()).to.equal(
      ethers.utils.parseEther("2.0")
    );
  });

  it("deposit 10 Wei into GinnyPig from non owner account", async function () {
    const accounts = await ethers.getSigners();
    const nonOwner = accounts[1];

    console.log(
      `Before Tx: non-Owner account:
      ${nonOwner.address}, Balance:
      ${await nonOwner.getBalance()}`
    );
    // send 10 Wei from Owner account to GinnyPig
    await nonOwner.sendTransaction({
      to: ginnyPigContract.address,
      value: ethers.utils.parseEther("1.0"),
    });
    console.log(
      `After Tx: non-Owner account:
      ${nonOwner.address}, Balance:
      ${await nonOwner.getBalance()}`
    );
    console.log(
      `----> GinnyPig Account Balance: ${ethers.utils.formatEther(
        await ginnyPigContract.getBalance()
      )}`
    );
    expect(await ginnyPigContract.getBalance()).to.equal(
      ethers.utils.parseEther("3.0")
    );
  });

  it("should not allow to withdraw any amount for non-owner account", async function () {
    const accounts = await ethers.getSigners();
    const nonOwner = accounts[1];

    console.log("Non-Owner account", nonOwner.address);

    // const ginnyPigContractInstance1 = ginnyPigContract.connect(nonOwner);
    // console.log("Contract Signer ", ginnyPigContractInstance1.signer);
    // await ginnyPigContractInstance1.withdraw();
    const result = await ginnyPigContract.connect(nonOwner.address).withdraw();

    console.log("------> ", result);
    truffleAssert.reverts(result, "only owner can withdraw it");
  });

  it("should allow to withdraw any amount for owner account", async function () {
    truffleAssert.passes(await ginnyPigContract.withdraw());
  });
});
