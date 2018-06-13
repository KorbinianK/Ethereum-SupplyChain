pragma solidity ^0.4.23;

import "./production.sol";

contract ProcessHandler is Ownable {
    
    uint private totalProductions;
    address[] private productionAddresses;
    mapping(uint => address) private productions;
    address private currTrans;
    address public grapeToken;
    address public transportHandler;

    function setTokenAddress(address _tokenAddress) public onlyOwner {
        grapeToken = _tokenAddress;
    }
    
    function setTransportHandler(address _transportHandler) public onlyOwner {
        transportHandler = _transportHandler;
    }

    function currentProduction() public view returns(address){
        return productionAddresses[productionAddresses.length-1];
    }
    
    
    function currentTransport() public view returns (address current){
        bytes4 sig = bytes4(keccak256("currentTransport()"));
        assembly {
            // move pointer to free memory spot
            let ptr := mload(0x40)
            // put function sig at memory spot
            mstore(ptr,sig)
            // append argument after function sig
            // mstore(add(ptr,0x04), _val)

            let result := call(
              15000, // gas limit
              sload(transportHandler_slot),  // to addr. append var to _slot to access storage variable
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
    
    function transportBalance(address transportAddress) public view returns (uint256 _balance) {
        
        currTrans = transportAddress;
        
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
              sload(currTrans_slot),  // to addr. append var to _slot to access storage variable
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
    
 
    function newProduction() public returns(bool success) {
        uint id = totalProductions;
        address transport = currentTransport();
        uint256 totalBalance = transportBalance(transport);
        if (productions[id] == 0x0 && totalBalance > 0) {
            Production p = new Production(id,grapeToken);
            require(transport.call(bytes4(keccak256("transferTo(address,uint256)")), p, totalBalance));
            productions[id] = p;
            productionAddresses.push(p);
            totalProductions++;
            return true;
        }
        return false;
    }

    function getProductions() public view returns(address[]) {
        return productionAddresses;
    }
    
    function getProduction(uint _year) public view returns(address) {
        return productions[_year];
    }
    
    constructor(address _tokenAddress, address _transportHandler) public {
        setTokenAddress(_tokenAddress);
        setTransportHandler(_transportHandler);
    }
}