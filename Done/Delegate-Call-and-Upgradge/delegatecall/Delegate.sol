// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/**
Contract Base will make a delegate call to Contract delegate, 
Delegate call in Contract delegate will be executed with the context of Contract Base 
as a result State veriable in Base will be update 

    EOA calls ----->  Base.testDelegate -----> Delegate
    (tx.sender as EOA, 
     tx.value as the value sent by EoA)   
*/
contract Base {
    uint public num;
    uint public value;
    address public sender;

    function testDelegate(address _d, uint _num ) external payable {
       (bool success, ) = _d.delegatecall(abi.encodeWithSignature('setVars(uint256)', _num));
       require(success, 'Delegate call failed');
    }
}

contract Delegate {
    uint public num;
    uint public value;
    address public sender;

    function setVars(uint _n) external payable {
        num = _n;
        value = msg.value;
        sender = msg.sender;
    }

}