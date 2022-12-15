// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract merkleProofVerify {

    bytes32 public rootHash;

    mapping(address => bool) public whiteListClaimed;

    constructor(bytes32 _hash) {
        rootHash = _hash;
    }

    function verifyWhitelist(bytes32[] calldata _proofs) external view returns (bool) {

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        
        return MerkleProof.verify(_proofs, rootHash, leaf);
    }
}