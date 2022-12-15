const ethUtil = require('ethereumjs-util') //for verfication https://github.com/ethereumjs/ethereumjs-tx/blob/07b7b1a75168db1778d00fffd98324e8188036a1/index.js#L204-L222
const Ethereumjs = require('ethereumjs-tx')
const Web3 = require('web3')

// const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/cf3d4241a0494f7a9bb9eb4cfeed0c72'));
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));   // Geth

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'));  // Ganache

const privateKey = Buffer.from('201E7B61217DE1FBE3E9E3320FC7FFBA7B669EAAC86081AE05876E9609D17818', 'hex');
//const privateKey = '0x' + '201E7B61217DE1FBE3E9E3320FC7FFBA7B669EAAC86081AE05876E9609D17818';
// smart contract address 0x3502e5f78b7ff5a60566620d8e95f410af65852c

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

        callContract();
    } catch (error) {
        console.error(error);
    }

}

async function callContract() {

    try {
        web3.eth.defaultAccount = web3.eth.accounts[0];

        var abi = [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "msgHash",
                        "type": "bytes32"
                    },
                    {
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "name": "recoverAddr",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_addr",
                        "type": "address"
                    },
                    {
                        "name": "msgHash",
                        "type": "bytes32"
                    },
                    {
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "name": "isSigned",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            }
        ];

        var verifyContract = new web3.eth.Contract(abi);
        verifyContract._address = '0x3502e5f78b7ff5a60566620d8e95f410af65852c';
        console.log(verifyContract);
    } catch (error) {
        console.error(error);
    }
}

startApp();
