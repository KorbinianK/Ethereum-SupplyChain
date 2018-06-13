pragma solidity ^0.4.23;

import "./transport.sol";
// transfer

/*
    new Manufacturing
    alle trauben von currenttransport 

*/


contract TransportHandler is Ownable {
    
    uint private totalTransports;
    address[] private transportAddresses;
    mapping(uint => address) private transports;
    address private currHarv;
    address public grapeToken;
    address public harvestHandler;

    function setTokenAddress(address _tokenAddress) public onlyOwner {
        grapeToken = _tokenAddress;
    }
    
    function setHarvestHandler(address _harvestHandler) public onlyOwner {
        harvestHandler = _harvestHandler;
    }

    function currentTransport() public view returns(address){
        return transportAddresses[transportAddresses.length-1];
    }
    
    
    function currentHarvest() public view returns (address current){
        bytes4 sig = bytes4(keccak256("currentHarvest()"));
        assembly {
            // move pointer to free memory spot
            let ptr := mload(0x40)
            // put function sig at memory spot
            mstore(ptr,sig)
            // append argument after function sig
            // mstore(add(ptr,0x04), _val)

            let result := call(
              15000, // gas limit
              sload(harvestHandler_slot),  // to addr. append var to _slot to access storage variable
              0, // not transfer any ether
              ptr, // Inputs are stored at location ptr
              0x24, // Inputs are 36 bytes long
              ptr,  //Store output over input
              0x20) //Outputs are 32 bytes long
            
            if eq(result, 0) {
                revert(0, 0)
            }
            
            current := mload(ptr) // Assign output to answer var
            mstore(0x40,add(ptr,0x24)) // Set storage pointer to new space
        }
    }
    
    function harvestBalance(address harvestAddress) public view returns (uint256 _balance) {
        
        currHarv = harvestAddress;
        
        bytes4 sig = bytes4(keccak256("getBalance()"));
        assembly {
            // move pointer to free memory spot
            let ptr := mload(0x40)
            // put function sig at memory spot
            mstore(ptr,sig)
            // append argument after function sig
            // mstore(add(ptr,0x04), _val)

            let result := call(
              15000, // gas limit
              sload(currHarv_slot),  // to addr. append var to _slot to access storage variable
              0, // not transfer any ether
              ptr, // Inputs are stored at location ptr
              0x24, // Inputs are 36 bytes long
              ptr,  //Store output over input
              0x20) //Outputs are 32 bytes long
            
            if eq(result, 0) {
                revert(0, 0)
            }
            
            _balance := mload(ptr) // Assign output to answer var
            mstore(0x40,add(ptr,0x24)) // Set storage pointer to new space
        }
    }
    
    function newTransport() public returns(bool success) {
        uint id = totalTransports;
        address harvest = currentHarvest();
        string memory latitude = "49.02091";
        string memory longitude = "12.3047";
        uint256 totalBalance = harvestBalance(harvest);
        if (transports[id] == 0x0 && totalBalance > 0) {
            Transport t = new Transport(id,grapeToken,latitude,longitude);
            require(harvest.call(bytes4(keccak256("transferTo(address,uint256)")), t, totalBalance));
            transports[id] = t;
            transportAddresses.push(t);
            totalTransports++;
            return true;
        }
        return false;
    }

    function getTransports() public view returns(address[]) {
        return transportAddresses;
    }
    
    function getTransport(uint _year) public view returns(address) {
        return transports[_year];
    }
    
    constructor(address _tokenAddress, address _harvestHandler) public {
        setTokenAddress(_tokenAddress);
        setHarvestHandler(_harvestHandler);
    }
}