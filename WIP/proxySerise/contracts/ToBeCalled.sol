// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract ToBeCalled {
  uint public myInt;
  string public myStr;

  constructor() {
    myInt = 1;
    myStr = "One";
  }

  function updateState(string memory _s, uint _n) external {
      console.log("inside updateState", msg.sender, _n, tx.origin);
      myInt += _n;
      myStr = _s;
  }

  function getState() external view returns (uint) {
    return myInt;
  }

}   