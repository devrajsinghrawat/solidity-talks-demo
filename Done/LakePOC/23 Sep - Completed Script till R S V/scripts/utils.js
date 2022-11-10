const ethUtil = require('ethereumjs-util') //for verfication https://github.com/ethereumjs/ethereumjs-tx/blob/07b7b1a75168db1778d00fffd98324e8188036a1/index.js#L204-L222
const Ethereumjs = require('ethereumjs-tx')
const Web3 = require('web3')

// const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/cf3d4241a0494f7a9bb9eb4cfeed0c72'));
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));   // Geth
const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:9545'));  // Ganache

//var sender = '0xb51ff63e054275b8c9589ed7bd2aa9d2bbb7afb8';
//var receiver = '0x68f0b7ba563c4ca94357f3be01d86f7d64113626';

//var sender = web3.eth.accounts[0];
// console.log(sender);

const privateKey = Buffer.from('201E7B61217DE1FBE3E9E3320FC7FFBA7B669EAAC86081AE05876E9609D17818', 'hex');
//const privateKey = '0x' + '201E7B61217DE1FBE3E9E3320FC7FFBA7B669EAAC86081AE05876E9609D17818';
async function startApp() {

  try {
    var accounts = await web3.eth.getAccounts();
    var sender = accounts[0];
    var receiver = accounts[2];

    let txObj;
    var txCount = await web3.eth.getTransactionCount(sender);

    txObj = {
      nonce: web3.utils.toHex(txCount),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      gasLimit: web3.utils.toHex(21000),
      to: receiver,
      value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
      data: '0x00',
      chainId: '0x03'
    };

    console.log(txObj);

    var tx = new Ethereumjs(txObj);

    await tx.sign(privateKey)
    const serializedTx = await tx.serialize();

    let signature = serializedTx.toString('hex');

    signature = signature.slice(2);
    var r = '0x' + signature.slice(0, 64);
    var s = '0x' + signature.slice(64, 128);
    var tmp = '0x' + signature.slice(128, 130);
    var v = web3.utils.toDecimal(tmp);

    console.log(v);
  } catch (error) {
    console.error(error);
  }


}

startApp();


// const rawTxHex = {
//   to: receiver,
//   gasLimit: web3.utils.toHex(21000),
//   gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//   value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
//   nonce: web3.utils.toHex(txCount),
//   data: 'Lake off-chain transaction'
// }

// Part 2 - to check if there is any difference in output signTransaction or creating Tx and then Signing it
// var eTx = new Tx(rawTxHex);
// eTx.sign(privateKey, (error, result) => {
//   console.log("Output after Tx and Sign --> ", result);
// })


// web3.eth.storeSignedTransaction(raw, (error, txHash) => {
//   console.log(txHash);
// })
//}
