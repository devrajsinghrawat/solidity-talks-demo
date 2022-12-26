// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./ToBeCalled.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Callee is Ownable{
  uint public counter;
  string public greeting;

  function callAndUpdateContractState(address _contractToBeCalledRef) external payable {
      console.log("inside call function of contract", msg.sender);
      (bool success, ) = _contractToBeCalledRef.call{value: msg.value}(
          abi.encodeWithSignature("updateState(string,uint256)","Hello World", 10));
      console.log(success);  
      require(success, "function call failed");
  }

  function delegateCallAndUpdateContractState(address _contractToBeCalledRef) external payable {
      console.log("inside delegate Call funciton of contract", msg.sender);
      (bool success, ) = _contractToBeCalledRef.delegatecall(
          abi.encodeWithSignature("updateState(string,uint256)","Hello World", 10));
      // {value: msg.value} is directly passed as function is being called in the same context
      console.log(success);  
      require(success, "function call failed");
  }

}   