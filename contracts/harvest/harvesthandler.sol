pragma solidity ^0.4.23;

import "./harvest.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract HarvestHandler is Ownable {
    
    uint private totalHarvests;
    address[] private harvestAddresses;
    mapping(uint => address) private harvests;

    address public grapeToken;

    function setTokenAddress(address _tokenAddress) public onlyOwner {
        grapeToken = _tokenAddress;
    }

    function currentHarvest() public view returns(address){
        return harvestAddresses[harvestAddresses.length-1];
    }

    function newHarvest(uint _year) public returns(bool success) {
        if (harvests[_year] == 0x0) {
            Harvest h = new Harvest(_year, grapeToken);
            harvests[_year] = h;
            harvestAddresses.push(h);
            totalHarvests++;
            return true;
        }
        return false;
    }

    function getHarvests() public view returns(address[]) {
        return harvestAddresses;
    }
    
    function getHarvest(uint _year) public view returns(address) {
        return harvests[_year];
    }
    
    constructor(address _tokenAddress) public {
        setTokenAddress(_tokenAddress);
    }
}