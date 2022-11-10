const CustomToken = artifacts.require('CustomToken');
const ChannelManager = artifacts.require("ChannelManager");
const ChannelManager = artifacts.require("NameRegistry");

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();
/*
1- Token contract will be deployed and we can get the address of Token contract
2- Use that address and initiate the Channel Contract 
3- Create Channel using receiver address and deposit amount

*/

var owner1 = web3.personal.listAccounts[0];
var recipient1 = web3.personal.listAccounts[1];
var anotherAccount1 = web3.personal.listAccounts[2];

contract('ChannelManager', function (accounts) {

  var owner = accounts[0];
  var bob = accounts[1];
  var alice = accounts[2];
  var escrow = accounts[3];

  beforeEach('setup contract for each test', async () => {
    instance = await CustomToken.new();
    const _tokenAddress = await instance.address;
    channelInstance = await ChannelManager.new(_tokenAddress);

  });

  it("Get the Channel Instance ", async () => {
    //console.log("Channel Instance -->", channelInstance);
    await channelInstance.createChannel(escrow, 50);

  });
  /* Passed 
  it("should put 100 CustomToken in the first account", async function () {
    let balance = await instance.balanceOf.call(owner);

    console.log(balance.toNumber()); // ERC20 Balance
    assert.equal(balance.valueOf(), 100, "100 wasn't in the first account");

    // check the smart contract eth balance 
    const customTokenAddress = await instance.address;
    console.log("Contract Ether Balance Before : ", web3.eth.getBalance(customTokenAddress).toNumber());

    // Lets trasfer some ethers into contract
    await instance.sendTransaction({
      value: 1e+18,
      from: recipient
    });

    // console.log("Contract Ether Balance after trasnfer: ", web3.eth.getBalance(customTokenAddress).toNumber());

    // take the funds out from the contract to owner account

    // 1. Check the owner funds before withdrawal
    console.log("Owner Ether Balance Before Transfer : ", web3.eth.getBalance(owner).toNumber());

    // 2. Check Smart Contract Balance
    console.log("Smart Contract Ether Balance Before Transfer : ", web3.eth.getBalance(customTokenAddress).toNumber());

    // 3. Take the Ether out of Contract 
    await instance.removeFunds();

    // 4. Check the owner funds after withdrawal
    console.log("Owner Ether Balance Before Transfer : ", web3.eth.getBalance(owner).toNumber());

    // 5. Check the Smart Contract fund balance 
    console.log("Smart Contract Ether Balance After Transfer : ", web3.eth.getBalance(customTokenAddress).toNumber());

  });  */

  /* Working - Transfer of Tokens */
  /* it("should trasfer 10 tokens to recipient account", async function () {

     let txHash = await instance.transfer.sendTransaction(recipient, 10);
     let receipt = web3.eth.getTransactionReceipt(txHash);
     console.log(receipt);
     // if (status == true) {
     let balanceRecipient = await instance.balanceOf.call(recipient);
     console.log("Balance after Transfer : ", balanceRecipient.valueOf());
     assert.equal(balanceRecipient.valueOf(), 10, "10 wasn't in the 2nd account Balance");

     
     // }
   }); */



  /* Test Approve, Allowance and Transfer From - working 
  describe("Test Approve, Allowance and Transfer From ", function () {
    it('should approve the token to recipent', async function () {

      // 1. Balance of each users 
      let ownerBal = await instance.balanceOf.call(owner);
      let bobBal = await instance.balanceOf.call(bob);
      let aliceBal = await instance.balanceOf.call(alice);

      // assert.equal(ownerBal.valueOf(), 100, "Owner Token Balance NOT equal to 100!!!");
      // assert.equal(bobBal.valueOf(), 0, "Bob Token Balance NOT equal to 0!!!");
      // assert.equal(aliceBal.valueOf(), 0, "Alice Token Balance NOT equal to 0!!!");
      //console.log("Balance of Owner, Bob and Alice respectivily", ownerBal.toNumber(), bobBal.toNumber(), aliceBal.toNumber());

      // 2. Owner Approve 50 tokens to Bob, Check Owner's Balance and Allowance for Bob
      await instance.approve.sendTransaction(bob, 50);
      ownerBal = await instance.balanceOf.call(owner);
      bobBal = await instance.balanceOf.call(bob);
      //console.log("Balance of Owner and Bob after allowance : ", ownerBal.toNumber(), bobBal.toNumber());

      // let approved = await instance.allowance(owner, bob);
      //assert.equal(await instance.allowance.call(owner, bob), 50, "Allowance Token Balance NOT equal to 50!!!");

      await instance.transferFrom.sendTransaction(owner, alice, 10, {
        from: bob
      });
      ownerBal = await instance.balanceOf.call(owner);
      aliceBal = await instance.balanceOf.call(alice);
      let allowance = await instance.allowance.call(owner, bob);

      console.log("owner Balance, Alice Balance, Bob's Allowance : ", ownerBal.toNumber(), aliceBal.toNumber(), allowance.toNumber());
    });
  }) */

});