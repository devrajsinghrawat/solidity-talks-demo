const ethUtil = require('ethereumjs-util') //for verfication https://github.com/ethereumjs/ethereumjs-tx/blob/07b7b1a75168db1778d00fffd98324e8188036a1/index.js#L204-L222
const Ethereumjs = require('ethereumjs-tx')
const Web3 = require('web3')

// const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/cf3d4241a0494f7a9bb9eb4cfeed0c72'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
//var sender = '0xb51ff63e054275b8c9589ed7bd2aa9d2bbb7afb8';
//var receiver = '0x68f0b7ba563c4ca94357f3be01d86f7d64113626';

//var sender = web3.eth.accounts[0];
// console.log(sender);

const privateKey = Buffer.from("201E7B61217DE1FBE3E9E3320FC7FFBA7B669EAAC86081AE05876E9609D17818", 'hex');

async function startApp() {


  try {
    let accounts = await web3.eth.getAccounts();
    const sender = accounts[0];
    const receiver = accounts[2];
    const message = web3.utils.toHex("Hello world!"); // "0x48656c6c6f20776f726c6421"

    await web3.eth.personal.unlockAccount(sender, "Learn2018", 600)
    let signature = await web3.eth.sign(message, sender);

    //await tx.sign(privateKey);

    signature = signature.substr(2); //remove 0x
    // 0x4afcd715eec88e0786aca3b1bff50db636e12fcff9ef553c368d7cae556e26ac161ee33a28033d1b78e502d8c802cead233272dd1de2633d0d3e3cf4f2c028671b"
    const r = '0x' + signature.slice(0, 64)
    // 0x4afcd715eec88e0786aca3b1bff50db636e12fcff9ef553c368d7cae556e26ac"
    const s = '0x' + signature.slice(64, 128)
    // 0x161ee33a28033d1b78e502d8c802cead233272dd1de2633d0d3e3cf4f2c02867"
    const v = '0x' + signature.slice(128, 130)
    // 0x1b"
    const v_decimal = web3.utils.toDecimal(v)

    console.log(v_decimal);

  } catch (error) {
    console.log(error);
  }
}

startApp();
