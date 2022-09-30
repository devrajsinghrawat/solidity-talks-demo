// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);
}

/** This contract or similar implementation can handle any ERC20 token sent to such contracts
    and capable of transfering back to any other address */
contract HandleERCGeneric {
  function handleTransfer(address _erc20Address, address _to, uint amount) external {
      IERC20 tokenContract = IERC20(_erc20Address);
      bool success = tokenContract.transfer(_to, amount);
      require(success, "transfer failed");
  }
}