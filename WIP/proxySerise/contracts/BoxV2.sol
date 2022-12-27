/** Transparent proxy pattern example */

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract BoxV2 {
    uint256 private _value;
    address public owner;

    // Emitted when the stored value changes
    event ValueChanged(uint256 value);

    // Stores a new value in the contract
    // function store(uint256 value) public {
    //     _value = value;
    //     emit ValueChanged(value);
    // }

    function setOwner() external {
       owner = msg.sender;
    }

    function inc() external {
       _value += 1;
    }
    
    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return _value;
    }


}