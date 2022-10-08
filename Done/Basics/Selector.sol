// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Selector {
   event Transferred(bytes data);

   function transfer(address _to, uint _v) external {
      emit Transferred(msg.data); // with these input para "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 100
   }

 // 0xa9059cbb
 // 0000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4
 // 0000000000000000000000000000000000000000000000000000000000000064
   function getSelector(string calldata _s) external pure returns(bytes4){
        bytes4 selector = bytes4(abi.encodeWithSignature(_s));
       return selector;
   }
}