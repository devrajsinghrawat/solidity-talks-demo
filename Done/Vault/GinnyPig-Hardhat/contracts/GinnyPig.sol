// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GinnyPig {
    address owner;
    
    constructor() payable {
        owner = msg.sender;
    }

    receive() external payable { }
    
    /** Example of how selfdestruct works */
    function withdraw() external {
       require(msg.sender == owner, "only owner can withdraw it");
       selfdestruct(payable(owner));
    }

    function getBalance() view external returns (uint) {
        return address(this).balance;
    }

    function getOwner() view external returns (address) {
       require(msg.sender == owner, "only owner can run it");
       return owner;
    }
}