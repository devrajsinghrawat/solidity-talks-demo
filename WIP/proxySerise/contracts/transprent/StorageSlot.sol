// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

library StorageSlot {
    struct AddressSlot {
        address value;
    }

    function getAddressSlot(bytes32 slot)  returns (AddressSlot storage r) {
      assembly {
        r.slot := slot
      }
    }
}

contract TestSlot {
    bytes32 public constant SLOT = keccak256("TEST_SLOT");

    function getSlot() external view returns (address) {
        return StorageSlot.getAddressSlot(SLOT).value;
    }

    function setSlot(address _addr) external {
        StorageSlot.getAddressSlot(SLOT).value = _addr;
    }
}