// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DigitalVault is Ownable {
    uint256 private value;

    event ValueChanged(uint newValue);

    function store(uint _v) public onlyOwner {
        value = _v;
        emit ValueChanged(_v);
    }

    function retrive() public view returns (uint) {
        return value;
    }
}
