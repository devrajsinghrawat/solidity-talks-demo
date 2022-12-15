const { MerkleTree }  = require('merkletreejs');
const keccak256  = require('keccak256');

const whitelistAddresses = [
  "0xF9901CC6bbC8518088B2C8350fCd0635A23b250E",
  "0x23Ed077d5c630cF9b55324Ca3bC706a70ffCb696",
  "0xB2FB886Eb402848B772469a34a7180747C7F7934",
  "0x4Fb0a43C637566f2f18B2eE7034f430A7F95dBcF",
  "0x19b228f57165be621f49D96E26C459Aa115Eb83D",
  "0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6",
  "0x9140a5F347eD608256A4AAF268D8F48Bd630100b",
//   "0xBcE8A747EefB1F115e327698797f99156e905D4D",
//   "",
];

const leaves = whitelistAddresses.map( addr => {
    const hashAddr = keccak256(addr);
    console.log(`Hash of ${addr} is ${hashAddr.toString('hex')}`);
    return hashAddr;
});

const tree = new MerkleTree(leaves, keccak256, {sortPairs: true});

const treeRoot = tree.getHexRoot();
// const treeRoot = tree.getRoot().toString('hex');

console.log('< ------ ---- > ');

console.log('Tree root ----> ', treeRoot);

console.log('< ------ ---- > ');


console.log( 'Tree ', tree.toString() );

console.log('< ------ test proof ---- > ');

const addr = "0xF9901CC6bbC8518088B2C8350fCd0635A23b250E";  // leaf


const hashAddr = keccak256(addr);  // hash of leaf

console.log(`Hash of ${addr} is ${hashAddr.toString('hex')}`);

// const proofs = tree.getProof(hashAddr);  // get all the proofs for the given leaf

// console.log(`Proof for ${addr}  -->`);


// for (let index = 0; index < proofs.length; index++) {
//     const proof = proofs[index];
//     console.log('< ------ Proofs Position---- > ', proof.position);
//     console.log('< ------ Proofs ---- > ', Buffer.from(proof.data).toString('hex'));
// }


const proofs = tree.getHexProof(hashAddr);  // get all the proofs for the given leaf

// const proofs = tree.getLeaf(6).toString('hex');

// const proofs = tree.getLeafIndex(hashAddr);

// const proofs = tree.getLeafCount();

console.log("Proofs");
console.log(proofs);





