// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./ToBeCalled.sol";


contract Callee {

  function callAndUpdateContractState(address _contractToBeCalledRef) external {
      console.log("inside call contract", msg.sender);
      (bool success, ) = _contractToBeCalledRef.call(
          abi.encodeWithSignature("updateState(string,uint256)","Hello", 10));
       console.log(success);   
  }

}   