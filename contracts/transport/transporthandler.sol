pragma solidity ^0.4.23;

import "./transport.sol";

/**
 * @title The Handler contract for the transports
 */
contract TransportHandler is Ownable {
    
    uint private totalTransports;
    address[] private transportAddresses;
    address private currHarv;
    address public grapeToken;
    address public harvestHandler;

    // Mapping of an index to a transport contract
    mapping(uint => address) private transports;

    // Mapping of a transport address to a harvest
    mapping(address => address) private transportToHarvest;

    /** 
     * @dev Updates the token address
     * @param _tokenAddress the address of the token
    */
    function setTokenAddress(address _tokenAddress) public onlyOwner {
        grapeToken = _tokenAddress;
    }
    
    /** 
     * @dev Updates the harvesthandler address
     * @param _harvestHandler the address of the handler
    */
    function setHarvestHandler(address _harvestHandler) public onlyOwner {
        harvestHandler = _harvestHandler;
    }

    /** 
     * @dev Gets the latest transport
     * @return address the lastest transport
    */
    function currentTransport() public view returns(address){
        return transportAddresses[transportAddresses.length-1];
    }
    
    /** 
     * @dev Low level call function to retrieve the current active harvest from the harvestHandler
     * @return address of the harvest
     * Based on code from https://medium.com/[at]blockchain101/calling-the-function-of-another-contract-in-solidity-f9edfa921f4c
    */
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
    
    /** 
     * @dev Low level call function to retrieve the balance of a harvest from the harvestHandler
     * @param harvestAddress address of the harvest
     * @return uint256 balance of the harvest
     * Based on code from https://medium.com/[at]blockchain101/calling-the-function-of-another-contract-in-solidity-f9edfa921f4c
    */
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
    
    /** 
     * @dev Creates a new transport contract 
     * @return bool
    */
    function newTransport() public returns(bool success) {
        uint id = totalTransports;
        string memory latitude = "49.02091";
        string memory longitude = "12.3047";
        Transport t = new Transport(id,grapeToken,latitude,longitude);
        transports[id] = t;
        transportAddresses.push(t);
        totalTransports++;
        return true;
      
    }

    /** 
     * @dev Adds erc721 to a transport
     * @param _harvest
     * @param _token
     * @param _transport 
    */
    function addToTransport(address _harvest, uint256 _token, address _transport) public {
        uint256[] memory tokens = getTokens(_harvest);
        address harvest = _harvest;
        if (tokens.length > 0) {
            transportToHarvest[_transport] = harvest;
            require(harvest.call(bytes4(keccak256("transfer(address,uint256)")), _transport, _token));
      }
    }

    /** 
     * @dev Returns the harvest added to a transport
     * @return address of the harvest
    */
    function getHarvestFromTransport(address _transportAddress) public view returns (address){
        return transportToHarvest[_transportAddress];
    }

    /** 
     * @dev Gets all transports
     * @return address[] array of all transports
    */
    function getTransports() public view returns(address[]) {
        return transportAddresses;
    }
    
    /** 
     * @dev Gets a specific transport
     * @param _id the id to retrieve
     * @return address the transport
    */
    function getTransport(uint _id) public view returns(address) {
        return transports[_id];
    }
    
    /** 
     * @dev The constructor function
     * @param _harvestHandler address of the handler
     * @param _tokenAddress address of the token
    */
    constructor(address _tokenAddress, address _harvestHandler) public {
        setTokenAddress(_tokenAddress);
        setHarvestHandler(_harvestHandler);
    }
    
    
    
    
    /** 
     * 
     * Based on: https://gist.github.com/wadeAlexC/2574ea97533a9eb7edf0e186ba715a4a 
     */
    
    function getTokens(address _a) public view returns (uint256[] tokens) {
        // Function selector for 'getAddrs()'
        bytes4 addrs_selector = bytes4(keccak256("tokensOwned()"));
        assembly {
            // Get pointer to free memory - we'll construct calldata for getAddrs() here
            let ptr := mload(0x40)
            // Load getAddrs() selector into the pointer
            mstore(ptr, addrs_selector)
            
            // staticcall ensures our call does not change state
            // Specify forwarding all gas, to address _a, and pass in 4 bytes stored at the pointer
            // Return size is dynamic, so we don't specify a return destination or size (hence 0, 0)
            let ret := staticcall(gas, _a, ptr, 0x04, 0, 0)
            // If the call failed, revert
            if iszero(ret) { revert (0, 0) }
            
            // Set the location of our return array to be at the end of any accessed memory (msize returns the largest index of memory accessed so far)
            tokens := msize
            // Copies all of the returned data to addrs, excepting the first 32 (0x20) bytes
            // The first 32 bytes in a dynamic return payload are a data read offset (returned data is ABI-encoded)
            // You can read more about that here: https://solidity.readthedocs.io/en/v0.4.21/abi-spec.html
            // The second 32 bytes will store the length of the returned array, which we want to be stored in addrs
            // Directly after the length comes the actual data in the array
            // [data offset][length][ind0][ind1][ind2]...
            // Taking the above into consideration, we know:
            // returndatasize = 64 + (32 * (array.length))
            returndatacopy(tokens, 0x20, sub(returndatasize, 0x20))
        }
}
    
    