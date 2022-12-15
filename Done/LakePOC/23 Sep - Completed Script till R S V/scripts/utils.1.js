function setData(params) {

}

function setWeb3Version(params) {

}


function doGetNodeStatus() {

}

function doGetCompilers() {

}


var Ethereumjs = require('ethereumjs-tx')

const Web3 = require('web3')
//const web3 = new Web3('https://ropsten.infura.io/v3/cf3d4241a0494f7a9bb9eb4cfeed0c72')   //Or
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/cf3d4241a0494f7a9bb9eb4cfeed0c72'));
/*if (typeof web3 !== 'undefined') {
  // web3 = new Web3(web3.currentProvider); // window.web3
  web3.setProvider(new Web3(web3.currentProvider));
} else {
  // set the provider
  web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
  //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); // window.web3
} */

//web3.setProvider("http://localhost:8545");

var signedTransaction;
var sender = '0xb51ff63e054275b8c9589ed7bd2aa9d2bbb7afb8';
var receiver = '0x68f0b7ba563c4ca94357f3be01d86f7d64113626';

//function storeSignedTransaction(sender, receiver, amount) {
const privateKey = Buffer.from("201E7B61217DE1FBE3E9E3320FC7FFBA7B669EAAC86081AE05876E9609D17818", 'hex');
// Determine nonce for account
// web3.eth.getTransactionCount(sender, async (error, txCount) => {
//   //   const rawTx = {
//   //     to: receiver,
//   //     gasLimit: 21000,
//   //     gasPrice: web3.utils.toWei('10', 'gwei'),
//   //     value: web3.utils.toWei('1', 'ether'),
//   //     nonce: txCount,
//   //     data: 'Lake off-chain transaction'
//   //   }
//   try {
//     var signedTx = await web3.eth.signTransaction({
//       from: sender,
//       to: receiver,
//       gasLimit: web3.utils.toHex(21000),
//       gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//       value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
//       nonce: web3.utils.toHex(txCount)
//     }, sender);
//     console.log("Result after Sign Transaction --> ", signedTx);
//   } catch (error) {
//     console.log("Error after Sign Transaction --> ", error);
//   }

// });
function signTx() {
  let txObj;

  var txCount = web3.eth.getTransactionCount(sender);

  //, (error, txCount) => {
  txObj = {
    nonce: web3.utils.toHex(txCount),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    gasLimit: web3.utils.toHex(21000),
    to: receiver,
    from: sender,
    value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
    data: '0x00',
    chainId: '0x03'
  };

  console.log(txObj);
  // Sign the transaction
  //   web3.eth.signTransaction(txObj, sender, (error, result) => {
  //     console.log("Result after Sign Transaction --> ", result);
  //   });

  var tx = new Ethereumjs(txObj);
  console.log("Raw --> ", tx);

  var res = tx.sign(privateKey)
  console.log("After Signing -->", tx);

  const serializedTx = tx.serialize();
  console.log("After Serialization -->", tx);
  console.log(serializedTx.toString('hex'));


}

signTx();


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
