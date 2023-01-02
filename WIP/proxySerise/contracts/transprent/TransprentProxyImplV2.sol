// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract TransprentProxyImplV2 {
    uint public counter;

    function inc() public {
        counter += 1;
    }

    function dec() public {
        counter -= 1;
    }
}
