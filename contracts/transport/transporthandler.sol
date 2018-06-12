pragma solidity 0.4.24;

import "./transport.sol";
// getCurrentTransport

//newTransport 
/*
    return address
    alle trauben von hhandler.getCurrentHarvest
*/

// transfer

/*
    new Manufacturing
    alle trauben von currenttransport 

*/


contract TransportHandler is Ownable {
    
    uint private totalTransports;
    address[] private transportAddresses;
    mapping(uint => address) private transports;

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
    address private check;
    
    function harvestBalance(address harvestAddress) public view returns (uint256 _balance) {
        
        check = harvestAddress;
        
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
              sload(check_slot),  // to addr. append var to _slot to access storage variable
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
    
    function test() public view returns (uint256) {
        address harvest = currentHarvest();
        uint256 balance = harvestBalance(harvest);
        
        return balance;
        
        
    }
    
    function newTransport() public returns(bool success) {
        uint id = totalTransports;
        address harvest = currentHarvest();
        uint256 totalBalance = harvestBalance(harvest);
        if (transports[id] == 0x0) {
            Transport t = new Transport(id,grapeToken);
            require(harvest.call(bytes4(keccak256("transferTo(address,uint256)")), t, totalBalance));
            // transfer(t,totalBalance);
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