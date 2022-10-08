//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract EtherWallet {
    address payable public owner;

    constructor () payable {
        owner = payable(msg.sender);
    }
   
   /** we can also use fallback but we dont want anyone to call a non existnce function
   * this function can receive Ether
   * Just few imp between receive and fallback
   * Receive should be payable mandatory but fallback can be non-payable as well
   * Fallback can accept data as well Ether But Receive can only accept Ether and not the data 
   * Both should be with external visiblity 
   */
    receive() payable external {         
        
    }

    /**
    * Can withdraw the funds
    */
    function withdraw(uint amount) public {         
        require(msg.sender == owner, "not a valid owner");
        owner.transfer(amount);
    }

    function getBalance() view external returns (uint) {
        return address(this).balance;
    }
}    
