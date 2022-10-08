// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./ERC20TokenContract.sol";

contract HandleERC {
  MTKToken tokenContract;

  constructor(address _erc20Address) {
      tokenContract = MTKToken(_erc20Address);
  } 

  function handleTransfer(address _to, uint amount) external {
      bool success = tokenContract.transfer(_to, amount);
      require(success, "transfer failed");
  }
}