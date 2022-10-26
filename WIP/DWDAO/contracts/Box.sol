// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@Openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 private value;

    event ValueChanged(uint newValue);

    function store(uint _v) public onlyOwner {
        value = _v;
        emit ValueChanged(_v);
    }

    function retrive() returns (uint) {
        return value;
    }
}
