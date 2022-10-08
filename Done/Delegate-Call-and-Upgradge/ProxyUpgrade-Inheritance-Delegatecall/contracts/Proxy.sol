// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract ImplV1 {
    address public owner;
    uint public value;
    uint public number;

    function setVars(uint _num) external payable virtual {
       console.log("V1 - Inputs parameter %s num", _num);
       owner = msg.sender;
       value = msg.value;
       number = _num;
    }

    function getVars() external view returns(address, uint, uint) {
        return (owner, value, number);
    } 
}

contract ImplV2 is ImplV1 {
    /**
    * veriable version is not for any use in the contaxt of Proxy as 
    * this can not update the state of Proxy contract.
    */
    bytes public version;    
    function setVars(uint _num) external virtual override payable{
       console.log("V2 - Inputs parameter %s num", _num);

       owner = msg.sender;
       value = msg.value;
       number = _num * 2;
       version = "V2";
    }
}

contract Proxy {
    address public owner;
    uint public value;
    uint public number;
    
    constructor() payable {}

    function setVars(address _impl, uint _num) external payable {
       console.log("Proxy - Inputs parameter %s Impl Address and %s Number value", _impl, _num);

       (bool success, ) = _impl.delegatecall(abi.encodeWithSignature("setVars(uint256)", _num));
       require(success, "can't set the variables");
    }

    function getVars() external view returns(address, uint, uint) {
        return (owner, value, number);
    } 
    function getBalance() view external returns (uint) {
        return address(this).balance;
    }
}