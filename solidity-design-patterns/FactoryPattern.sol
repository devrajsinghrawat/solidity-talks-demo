// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

// import "./1_Storage.sol";

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Storage { 

    uint256 number;

    constructor() payable {}

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    fallback() external payable{}

    receive() external payable {}
}

contract StorageFactory {

    Storage[] public myStorage;   // This array tracks all the contracts deployed by this Factory

    function deploy() external {
        Storage mystorage = new Storage();
        myStorage.push(mystorage);
    }

    function deployandpay() external payable {
        Storage mystorage = new Storage{value: msg.value}();
        myStorage.push(mystorage);
    }

    function getLength() external view returns(uint){
        return myStorage.length;
    }

    fallback() external payable{}

    receive() external payable {}
}