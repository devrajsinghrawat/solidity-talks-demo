pragma solidity ^0.4.22;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract CustomToken is StandardToken {

    string public constant name = "DEVD Network Token"; // solium-disable-line uppercase
    string public constant symbol = "DEVD"; // solium-disable-line uppercase
    uint8 public constant decimals = 18; // solium-disable-line uppercase
    uint256 public constant INITIAL_SUPPLY = 100 * (10 ** uint256(decimals));
    address owner_address;
  
    constructor() public {
        owner_address = msg.sender;
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(0x0, msg.sender, INITIAL_SUPPLY);    
    }


/// @notice Transfers the collected ETH to the contract owner.
    function transferFunds() public {
        require(msg.sender == owner_address);
        require(address(this).balance > 0);

        owner_address.transfer(address(this).balance);
        assert(address(this).balance == 0);
    }  

    function removeFunds() public onlyOwner {
        owner_address.transfer(address(this).balance);
    }
    // fallback function that allows contract to accept ETH 
    function () payable {}

    // modifiers
    modifier onlyOwner() {
        assert(owner_address == msg.sender);
        _;
    }
}
