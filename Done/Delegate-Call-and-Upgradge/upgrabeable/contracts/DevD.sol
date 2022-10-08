// SPDX-License-Identifier: IIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract DevD is Initializable {
    uint256 public count;

    /// @custom:oz-upgrades-unsafe-allow constructor
    // constructor() initializer {}

    function initialize(uint256 _val) public initializer  {
        count = _val;
    }
}