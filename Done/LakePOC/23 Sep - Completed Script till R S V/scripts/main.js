var Web3 = require('web3');
var Tx = require('ethereumjs-tx')


var web3 = new Web3();

/** Listen for load */

window.addEventListener('load', () => {

  // check is web3 has already been injected 
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider); // window.web3
  } else {
    // set the provider
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); // window.web3
  }

});

function stratApp() {

}

var signedTransaction;

function storeSignedTransaction(sender, receiver, amount) {
  const privateKey = '201E7B61217DE1FBE3E9E3320FC7FFBA7B669EAAC86081AE05876E9609D17818';
  // Determine nonce for account
  web3.eth.getTransactionCount(sender, (error, txCount) => {
    const rawTx = {
      to: receiver,
      gasLimit: 21000,
      gasPrice: web3.utils.toWei('10', 'gwei'),
      value: web3.utils.toWei('1', 'ether'),
      nonce: txCount,
      data: 'Lake off-chain transaction'
    }
  });

  // Sign the transaction
  web3.eth.signTransaction(tx, privateKey, (error, result) => {
    console.log("Result after Sign Transaction --> ", result);
  });

  const rawTxHex = {
    to: receiver,
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
    nonce: web3.utils.toHex(txCount),
    data: 'Lake off-chain transaction'
  }

  // Part 2 - to check if there is any difference in output signTransaction or creating Tx and then Signing it
  var eTx = new Tx(rawTxHex);
  eTx.sign(privateKey, (error, result) => {
    console.log("Output after Tx and Sign --> ", result);
  })


  web3.eth.storeSignedTransaction(raw, (error, txHash) => {
    console.log(txHash);
  })
}
