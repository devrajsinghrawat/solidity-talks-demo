// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract GinnyPig {
    address owner;
    
    constructor() payable {
        owner = msg.sender;
    }

    receive() external payable { }
    
    /** Example of how selfdestruct works */
    function withdraw() external {
       require(msg.sender == owner);
       selfdestruct(payable(owner));
    }

    function getBalance() view external returns (uint) {
        return address(this).balance;
    }
}