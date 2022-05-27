// const { beforeEach } = require("mocha");
const { expect } = require("chai");
const { ethers } = require("hardhat");

/**
 * Make a function call using Proxy and V1 contract along with 1 Ether as msg.value
 * * * It should update the variable in Proxy Contract
 * * * Variables in ImplV1 Contract will be unchanged
 * */

// Deploy ImplV2 Contract
/**
 * Make a function call using Proxy and V2 contract along with 2 Ether as msg.value
 * * * It should update the variable in Proxy Contract
 * * * Variables in ImplV1 Contract will be unchanged
 * */

let proxyContract;

describe("Proxy Contract", function () {
  before(async () => {
    // Deploy Proxy Contract
    const ProxyContract = await ethers.getContractFactory("Proxy");
    const proxy = await ProxyContract.deploy({
      value: ethers.utils.parseEther("1.0"),
    });
    await proxy.deployed();
    proxyContract = await proxy.attach(proxy.address);

    console.log("Proxy Contract deployed to:", proxy.address);
    console.log("Proxy Contract Balance", await proxyContract.getBalance());
    console.log("Proxy Contract Variables", await proxyContract.getVars());
  });

  describe("Proxy Contract with Impl Contract V1", function () {
    let implV1Contract;
    before(async () => {
      // Deploy ImplV1 Contract
      const ImplV1Contract = await ethers.getContractFactory("ImplV1");
      const implV1 = await ImplV1Contract.deploy();
      await implV1.deployed();
      implV1Contract = await implV1.attach(implV1.address);

      console.log("ImplV1 Contract deployed to:", implV1.address);
      console.log("ImplV1 Contract variables", await implV1Contract.getVars());
    });

    it("should fetch the balance of Proxy Contract", async function () {
      // All variables for both the Contracts should be initialized to initial stage
      expect(await proxyContract.getBalance()).to.equal(
        ethers.utils.parseEther("1.0")
      );
      console.log(
        `----> Proxy Account Balance: ${ethers.utils.formatEther(
          await proxyContract.getBalance()
        )}`
      );
    });

    it("should set the variables in Proxy contract only", async function () {
      console.log(
        "Proxy:V1 Call - Inputs parameter %s Impl Address and %s Number value",
        implV1Contract.address,
        123
      );
      await proxyContract.setVars(implV1Contract.address, 123, {
        value: ethers.utils.parseEther("2.0"),
      });

      console.log(
        "Proxy Contract Variables -->",
        await proxyContract.getVars()
      );
      console.log(
        "ImplV1 Contract variables -->",
        await implV1Contract.getVars()
      );

      expect(await proxyContract.getBalance()).to.equal(
        ethers.utils.parseEther("3.0")
      );
      console.log(
        `----> Proxy Account Balance: ${ethers.utils.formatEther(
          await proxyContract.getBalance()
        )}`
      );
    });
  });

  describe("Proxy Contract with Impl Contract V2", function () {
    let implV2Contract;
    before(async () => {
      // Deploy ImplV2 Contract
      const ImplV2Contract = await ethers.getContractFactory("ImplV2");
      const implV2 = await ImplV2Contract.deploy();
      await implV2.deployed();
      implV2Contract = await implV2.attach(implV2.address);

      console.log("ImplV2 Contract deployed to:", implV2.address);
      console.log("ImplV2 Contract variables", await implV2Contract.getVars());
    });

    it("should set the variables in Proxy contract only", async function () {
      console.log(
        "Proxy:V2 Call - Inputs parameter %s Impl Address and %s Number value",
        implV2Contract.address,
        456
      );

      await proxyContract.setVars(implV2Contract.address, 456, {
        value: ethers.utils.parseEther("3.0"),
      });

      console.log(
        "Proxy Contract Variables -->",
        await proxyContract.getVars()
      );
      console.log(
        "ImplV2 Contract variables -->",
        await implV2Contract.getVars()
      );

      expect(await proxyContract.getBalance()).to.equal(
        ethers.utils.parseEther("6.0")
      );
      console.log(
        `----> Proxy Account Balance: ${ethers.utils.formatEther(
          await proxyContract.getBalance()
        )}`
      );
    });
  });
});
