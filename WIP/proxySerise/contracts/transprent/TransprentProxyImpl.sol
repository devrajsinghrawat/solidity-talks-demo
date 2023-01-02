// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract TransprentProxyImpl {
    uint public counter;

    constructor() {
        counter = 1;
    }
    
    function inc() public {
        counter += 1;
        console.log("inc called ", counter);
    }

    function getContractAddress() external view returns (address) {
        console.log("Impl.: Calling getContractAddress");
        return address(1);
    }
}