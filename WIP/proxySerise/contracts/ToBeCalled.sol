// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ToBeCalled is Ownable {
  uint public counter;
  string public greeting;

  constructor() {
    counter = 1;
    greeting = "One";
  }

  function updateState(string memory _s, uint _n) external payable {
      console.log("inside updateState - Function called by ", msg.sender);
      console.log("inside updateState - Tx Originated by ", tx.origin);
      console.log("inside updateState - Values passed ", _s, _n);
      counter = _n;
      greeting = _s;
  }
}   