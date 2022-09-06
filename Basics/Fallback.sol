// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


// Send ETH
/**
* calldata (msg.data) is empty --> receive exist --> call recieve()
* calldata (msg.data) is not empty --> call fallback
*
*
*/
contract Fallback {
    event Log(uint gas);
    event ReceiveLogged(uint value, uint gasLeft);
    event FallbackLogged(bytes msgData, uint value, uint gasLeft);

    receive() external payable {
        // bytes memory data = msg.data; // msg.data does not exist inside recieve funcition
        emit  ReceiveLogged(msg.value, gasleft());             
    }

    fallback() external payable {
        emit FallbackLogged(msg.data, msg.value, gasleft());
    }

}
