// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./StorageSlot.sol";

contract Proxy {
    bytes32 public constant ADMIN_SLOT = bytes32(
        uint(keccak256("eip1967.proxy.admin")) - 1
    );

    bytes32 public constant IMPLEMENTATION_SLOT = bytes32(
        uint(keccak256("eip1967.proxy.implementation")) - 1
    );        

    constructor() {
        _setAdmin(msg.sender);
    }

    modifier ifAdmin() {
        if (msg.sender == _getAdmin()) {
            _;
        } else {
            console.log("Proxy: Calling fallback from modifier");
            _fallback();
        }
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

    function _fallback() private {
        console.log("Proxy: Calling fallback in contract");
        _delegate(_getImplementation());
    }

    fallback() external payable {
        _fallback();
    }

    receive() external payable {
        _fallback();
    }

    function upgradeTo(address _impl) external ifAdmin {
        require(_impl.code.length > 0, "not a contract");
        _setImplementation(_impl);
    }

    function _setAdmin(address _admin) private {
        StorageSlot.getAddressSlot(ADMIN_SLOT).value = _admin;
    }

    function _setImplementation(address _implementation) private {
        StorageSlot.getAddressSlot(IMPLEMENTATION_SLOT).value = _implementation;
    }

    function _getImplementation() private view returns (address) {
        return StorageSlot.getAddressSlot(IMPLEMENTATION_SLOT).value;
    }

    function _getAdmin() private view returns (address) {
        return StorageSlot.getAddressSlot(ADMIN_SLOT).value;
    }

    function admin() external ifAdmin returns(address) {
        return _getAdmin();
    }

    function implementation() external ifAdmin returns(address) {
        return _getImplementation();
    }

    function getContractAddress() external ifAdmin returns (address) {
        console.log("Proxy: Calling getContractAddress");
        return address(this);
    }   
}