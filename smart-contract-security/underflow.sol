pragma solidity ^0.6.10;

contract underflow {
   uint8 public balance;

  event NumberSetted(uint8, address);
  constructor (uint8 _n) public {
      balance = _n;
   }

   function attackUnderflow() external {
       balance = balance - 1;
       emit NumberSetted(balance, msg.sender);
   }

}