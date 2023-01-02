// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract TransprentProxyImpl {
    uint public counter;

    constructor(uint _c) {
        counter = _c;
    }

    function inc() public {
        counter += 1;
    }
}