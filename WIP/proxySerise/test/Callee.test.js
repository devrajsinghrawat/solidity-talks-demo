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

    const ToBeCalledFactory = await ethers.getContractFactory("ToBeCalled");
    const toBeCalled = await ToBeCalledFactory.deploy();
    await toBeCalled.deployed();
    console.log(`Contract ToBeCalled deployed to ${toBeCalled.address}`);
  
    const CalleeFactory = await ethers.getContractFactory("Callee");
    const callee = await CalleeFactory.deploy();
    await callee.deployed();
    console.log(`Contract Callee deployed to ${callee.address}`);

    return { toBeCalled, callee, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the initial state for Counter and Greeting", async function () {
      const { toBeCalled } = await loadFixture(deployContractsFixture);

      expect(await toBeCalled.greeting()).to.equal("One");
      expect(await toBeCalled.counter()).to.equal(1);
    });
   
    it("Should set the right owner", async function () {
      const { toBeCalled, callee, owner } = await loadFixture(deployContractsFixture);

      expect(await toBeCalled.owner()).to.equal(owner.address);
      expect(await callee.owner()).to.equal(owner.address);
    });

    it("Should update the state using Call", async function () {
      const ONE_GWEI = 1_000_000_000;
      const { toBeCalled, callee } = await loadFixture(deployContractsFixture);
      callee.callAndUpdateContractState(toBeCalled.address, {value : ONE_GWEI});
      expect(await toBeCalled.greeting()).to.equal("Hello World");
      expect(await toBeCalled.counter()).to.equal(10);

      expect(await ethers.provider.getBalance(toBeCalled.address)).to.equal(
        ONE_GWEI
      );
    });     
  });

  describe("delegate Call", function () {
    it("Should update the state of callee contract", async function () { 
      const ONE_GWEI = 1_000_000_000;
      const { toBeCalled, callee } = await loadFixture(deployContractsFixture);
      callee.delegateCallAndUpdateContractState(toBeCalled.address, {value : ONE_GWEI});
      expect(await callee.greeting()).to.equal("Hello World");
      expect(await callee.counter()).to.equal(10);

      expect(await ethers.provider.getBalance(callee.address)).to.equal(
        ONE_GWEI
      );
    }); 

    it("Should not update the state of toBeCalled contract", async function () { 
      const ONE_GWEI = 1_000_000_000;
      const { toBeCalled, callee } = await loadFixture(deployContractsFixture);
      callee.delegateCallAndUpdateContractState(toBeCalled.address, {value : ONE_GWEI});
      expect(await toBeCalled.greeting()).to.equal("One");
      expect(await toBeCalled.counter()).to.equal(1);

      expect(await ethers.provider.getBalance(toBeCalled.address)).to.equal(
        0
      );
    });
      /*
      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).not.to.be.reverted;
      }); */
    });
  /*
    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    }); 
  }); */
});
