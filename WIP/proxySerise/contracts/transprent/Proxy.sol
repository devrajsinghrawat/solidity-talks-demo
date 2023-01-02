// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./StorageSlot.sol";

contract Proxy {
    // address public implementation;
    // address public admin;
    bytes32 public constant ADMIN_SLOT = bytes32(
        uint(keccak256("eip1967.proxy.admin")) - 1
    );

    bytes32 public constant IMPLEMENTATION_SLOT = bytes32(
        uint(keccak256("eip1967.proxy.implementation")) - 1
    );        

    constructor() {
        _setAdmin(msg.sender);
    }

    function _delegate(address _implementation) internal virtual {
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }        

    fallback() external payable {
        _delegate(getImplementationAddress());
    }

    receive() external payable {
        _delegate(getImplementationAddress());
    }

    function upgradeTo(address _impl) external {
        require(msg.sender == getAdminAddress(), "not a owner");
        _setImplementation(_impl);
    }

    function _setAdmin(address _admin) private {
        StorageSlot.getAddressSlot(ADMIN_SLOT).value = _admin;
    }

    function _setImplementation(address _implementation) private {
        StorageSlot.getAddressSlot(IMPLEMENTATION_SLOT).value = _implementation;
    }

    function getImplementationAddress() public view returns (address) {
        return StorageSlot.getAddressSlot(IMPLEMENTATION_SLOT).value;
    }

    function getAdminAddress() public view returns (address) {
        return StorageSlot.getAddressSlot(ADMIN_SLOT).value;
    }

    function helper(string memory _func) external pure returns(bytes4 selector) {
        selector = bytes4(abi.encodeWithSignature(_func));
        return selector;
    }
}
