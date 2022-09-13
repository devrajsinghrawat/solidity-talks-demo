// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
/**
This example highlights that in Delegate call the msg context is preserved as compared to normal call.
i.e. tx.origin and msg.sender context will remaintain same when callMe is called from Caller

 */
contract Called {
  event callEvent(address sender, address origin, address from);
  function callMe() public {
    emit callEvent(msg.sender, tx.origin, address(this));
  }
}

contract Caller {
    event DataResult(bytes);
      function makeCall(address _contractAddress) public {   
        (bool success, bytes memory data) = address(_contractAddress).call(abi.encodeWithSignature("callMe()"));
        require(success);
        emit DataResult(data);
  }
  function makeDelegateCall(address _contractAddress) public {   
        (bool success, bytes memory data) = address(_contractAddress).delegatecall(abi.encodeWithSignature("callMe()"));
        require(success);
        emit DataResult(data);
  }
}