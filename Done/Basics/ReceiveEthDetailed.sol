// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract ReceiveEther {
    /*
    Which function is called, fallback() or receive()?

           send Ether
               |
         msg.data is empty?
              / \
            yes  no
            /     \
receive() exists?  fallback()
         /   \
        yes   no
        /      \
    receive()   fallback()
    */

    // address public owner;
    mapping (address => uint) public userBalance;
    event log(string, uint);
    event depositDone(address originator,address sender, uint value);

    function depositFunds() public payable {
        userBalance[tx.origin] += msg.value; 
        emit depositDone(tx.origin, msg.sender, userBalance[tx.origin]);
    } 

    // Function to receive Ether. msg.data must be empty
    receive() external payable {
       depositFunds(); 
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {
        string memory data = string(msg.data);
        emit log(data, msg.value);  // check is the data is being properly captured
        depositFunds();
    }

    function totalVaultBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract SendEther {
    function sendViaTransfer(address payable _to) public payable {
        // This function is no longer recommended for sending Ether.
        _to.transfer(msg.value);
    }

    function sendViaSend(address payable _to) public payable {
        // Send returns a boolean value indicating success or failure.
        // This function is not recommended for sending Ether.
        bool sent = _to.send(msg.value);
        require(sent, "Failed to send Ether");
    }

    function sendViaCall(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        // We can modify gas allowance in this call if gas is pass 2300 then this ll also fail in  this example
        // (bool sent, bytes memory data) = _to.call{value: msg.value}(""); //abi.encodePacked("Hello, world!")
        (bool sent, bytes memory data) = _to.call{value: msg.value}(""); //abi.encodePacked("Hello, world!")

        require(sent, "Failed to send Ether");
    }
}
