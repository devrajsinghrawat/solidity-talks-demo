// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    uint256 public s_maxSupply = 1000000000000000000;  // 1 million tokens

    constructor() 
    ERC20("GovernanceToken", "GT") 
    ERC20Permit("GovernanceToken")
    {
        _mint(_msgSender(), s_maxSupply);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(
        address to, 
        uint amount
    ) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(
        address to, 
        uint amount
    ) internal override(ERC20Votes) {
        super._burn(to, amount);
    }

}