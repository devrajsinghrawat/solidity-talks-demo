const ethUtil = require('ethereumjs-util')
const Ethereumjs = require('ethereumjs-tx')
//var Buffer = require('buffer/').Buffer
const Web3 = require('web3')

// Geth 
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Ganache
// const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'));

// INFURA
//const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/cf3d4241a0494f7a9bb9eb4cfeed0c72'));

async function startApp() {

    try {
        var accounts = await web3.eth.getAccounts();

        const sender = accounts[0];      // "0xB51fF63E054275B8c9589ed7bD2Aa9D2bbb7afB8";
        const escrow = accounts[2];      // "0x68F0b7BA563c4ca94357f3bE01D86f7D64113626"; 

        // We have added 0x to private key to make things working 
        const privateKey = '0x' + '201E7B61217DE1FBE3E9E3320FC7FFBA7B669EAAC86081AE05876E9609D17818';

        // const verify = await web3.eth.accounts.privateKeyToAccount(privateKey);

        //   const gasPrice = await web3.eth.getGasPrice();
        // for tx = "string" v was 27
        // web3.eth.accounts.sign
        let tx1 = {
            nonce: await web3.utils.toHex(web3.eth.getTransactionCount(sender)),
            chainId: await web3.eth.net.getId(),
            gas: "0x1e8480",
            gasPrice: await web3.utils.toHex(web3.eth.getGasPrice()),
            to: escrow,
            value: "0x989680"
        }
        //const signMsg = await web3.eth.accounts.sign(tx, privateKey);
        const signMsg1 = await web3.eth.accounts.signTransaction(tx1, "Learn2018");

        //console.log("======Start of Log Print for web3.eth.accounts.signTransaction=====")
        //console.log("web3.eth.accounts.signTransaction --> ", signMsg1);
        //console.log(signMsg1.messageHash);

        //console.log("======End of Log Print for web3.eth.accounts.signTransaction======");
        // Part 2 check 
        let tx2 = {
            nonce: await web3.utils.toHex(web3.eth.getTransactionCount(sender)),
            chainId: await web3.eth.net.getId(),
            gas: "0x1e8480",
            gasPrice: await web3.utils.toHex(web3.eth.getGasPrice()),
            from: sender,
            to: escrow,
            value: "0x989680"
        }
        await web3.eth.personal.unlockAccount(sender, "Learn2018", 600);
        const signMsg2 = await web3.eth.signTransaction(tx2, sender);

        console.log("Raw Transaction 1 --> ", signMsg1.rawTransaction);
        console.log("Raw Transaction 2 --> ", signMsg2.raw);
        console.log("---------------------------------------------")

        console.log("R S V Transaction 1 --> ", signMsg1.r, signMsg1.s, signMsg1.v);
        console.log("R S V Transaction 2 --> ", signMsg2.tx.r, signMsg2.tx.s, signMsg2.tx.v);
        console.log("---------------------------------------------")

        console.log("Message Hash Transaction 1 --> ", signMsg1.messageHash);
        console.log("Message Hash Transaction 2 --> ", signMsg2.tx.hash);


        let recover1 = web3.eth.accounts.recoverTransaction(signMsg1);
        console.log("Recover 1 --> ", recover1);

        let recover2 = web3.eth.accounts.recoverTransaction(signMsg2);
        console.log("Recover 1 --> ", recover);

        /*
                let v = web3.utils.toDecimal(signMsg.v);
                const r = Buffer.from(signMsg.r);
                const s = Buffer.from(signMsg.s);
                mhashFixed = Buffer.from(signMsg.messageHash);
        
                const rsv = await ethUtil.ecrecover(mhashFixed, v, r, s);
        
                console.log(rsv);
        */
    } catch (error) {
        console.error(error);
    }

}

startApp();