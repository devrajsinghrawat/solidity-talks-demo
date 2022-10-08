// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title State Variables
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract StateVariables {
    address public constant myAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    struct MetaLand {
        string name;
        string zone;
        uint x;
        uint y;
    }

    MetaLand[] public metaLands;

    function setLandRecord(string calldata _n, uint _x, uint _y) external {
       metaLands.push(MetaLand(_n, "" ,_x, _y));
       uint index = metaLands.length - 1;
       _updateLand(metaLands, index);
    }


    // function setLandRecord2(string memory _n, uint _x, uint _y) public {
    //    metaLand.push(MetaLand(_n, _x, _y));
    // }
   
    function _updateLand(MetaLand[] storage _ml, uint i) internal {
       if(_ml[i].x % 2 == 0){
           _ml[i].zone = "EvenZone";
       }
    }

    function getLand() public view returns (MetaLand[] memory) {
        return metaLands;
    } 

    function getValue() public pure returns (address) {
        return myAddress;
    }

}    