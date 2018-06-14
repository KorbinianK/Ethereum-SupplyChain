pragma solidity ^0.4.23;

import "./production.sol";

/**
 * @title The Handler contract for the productions
 */
contract ProcessHandler is Ownable {
    
    uint private totalProductions;
    address[] private productionAddresses;
    address private currTrans;
    address public grapeToken;
    address public transportHandler;
    
    // Mapping of an index to a production contract
    mapping(uint => address) private productions;

    /** 
     * @dev Updates the token address
     * @param _tokenAddress the address of the token
    */
    function setTokenAddress(address _tokenAddress) public onlyOwner {
        grapeToken = _tokenAddress;
    }
    
     /** 
     * @dev Updates the transportHandler address
     * @param _transportHandler the address of the handler
    */
    function setTransportHandler(address _transportHandler) public onlyOwner {
        transportHandler = _transportHandler;
    }

    /** 
     * @dev Gets the latest production
     * @return address the lastest production
    */
    function currentProduction() public view returns(address){
        return productionAddresses[productionAddresses.length-1];
    }
    
    /** 
     * @dev Low level call function to retrieve the current active harvest from the transport handler
     * @return address of the transport
     * Based on code from https://medium.com/[at]blockchain101/calling-the-function-of-another-contract-in-solidity-f9edfa921f4c
    */
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
    
    /** 
     * @dev Low level call function to retrieve the balance of a harvest from the transport handler
     * @param harvestAddress address of the transport
     * @return uint256 balance of the transport
     * Based on code from https://medium.com/[at]blockchain101/calling-the-function-of-another-contract-in-solidity-f9edfa921f4c
    */
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
    
    /** 
     * @dev Creates a new production contract and retieves the entire balance from the current transport
     * @return bool
    */ 
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

    /** 
     * @dev Gets all productions
     * @return address[] array of all productions
    */
    function getProductions() public view returns(address[]) {
        return productionAddresses;
    }
    
    /** 
     * @dev Gets a specific transport
     * @param _id the id to retrieve
     * @return address the transport
    */
    function getProduction(uint _id) public view returns(address) {
        return productions[_id];
    }
    
    /** 
     * @dev The constructor function
     * @param _transportHandler address of the handler
     * @param _tokenAddress address of the token
    */
    constructor(address _tokenAddress, address _transportHandler) public {
        setTokenAddress(_tokenAddress);
        setTransportHandler(_transportHandler);
    }
}