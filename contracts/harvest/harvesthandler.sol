pragma solidity ^0.4.24;

import "./harvest.sol";

contract HarvestHandler{
    
    uint totalHarvests;
    address[] harvestAddresses;

    mapping(uint => address) harvests;

    
    function newHarvest(uint _year) public returns(bool success) {
        if(harvests[_year] == 0x0){
            Harvest h = new Harvest(_year);
            harvests[_year] = h;
            harvestAddresses.push(h);
            return true;
        }
        return false;
    }
    
    function getHarvests() public view returns(address[]){
        return harvestAddresses;
    }
    
    function getHarvest(uint _year) public view returns(address){
        return harvests[_year];
    }
    
}