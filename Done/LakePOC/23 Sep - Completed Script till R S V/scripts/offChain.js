const ethUtil = require('ethereumjs-util')
const Ethereumjs = require('ethereumjs-tx')
const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

async function startApp() {

  try {
    var accounts = await web3.eth.getAccounts();

    var txData;
    var sender = accounts[0];
    var escrow = accounts[2];
    var amount = 10;
    var tx = {
      from: sender,
      to: escrow,
      gasPrice: web3.utils.toHex(20000000),
      gas: web3.utils.toHex(21000),
      value: web3.utils.toHex(amount),
      data: web3.utils.toHex("off-chain transaction"),
      nonce: web3.utils.toHex(10)
    }

    await web3.eth.personal.unlockAccount(sender, "Learn2018", 600)
    //   .then(console.log('Account unlocked!'));
    var signedTx = await web3.eth.signTransaction(tx, sender);
    console.log("signedTx --> ", signedTx);

    //const sig = await ethUtil.fromRpcSig(signedTx);
    let mHash = signedTx.tx.hash;
    let v = ethUtil.bufferToInt(signedTx.tx.v);
    let r = signedTx.tx.r;
    let s = signedTx.tx.s;
    var senderPublicKey = await ethUtil.ecrecover(mHash, v, r, s);
    console.log(senderPublicKey);
  } catch (error) {
    console.log(error);
  }
}

startApp();

/*
var txData;
var sender = web3.eth.accounts[0];
console.log(sender);
var escrow = web3.eth.accounts[2];
//var message = web3.toHex("hello world");
var amount = 10;

var tx = {
  from: sender,
  to: escrow,
  gasPrice: "20000000",
  gas: "21000",
  value: amount,
  data: "off-chain transaction",
  nonce: 10
}

web3.eth.personal.unlockAccount(sender, "Learn2018", 600)
  .then(console.log('Account unlocked!'));

var signedTx = web3.eth.signTransaction(tx, sender);

txData = {
  sender: signedTx
}

web3.personal.lockAccount();

console.log(txData[sender]);
*/
