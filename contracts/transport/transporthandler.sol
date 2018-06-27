pragma solidity ^0.4.23;

import "./transport.sol";
// import "../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title The Handler contract for the transports
 */
contract TransportHandler is Ownable {
    // using SafeMath for uint256;

    uint private totalTransports;
    address[] private transportAddresses;
    address private currHarv;
    address public grapeToken;
    address public harvestHandler;
    string public company;

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
     * @dev Creates a new transport contract and retieves the entire balance from the current harvest
     * @return bool
    */
    function newTransport(string _lat, string _long) public returns(bool success) {
        uint id = totalTransports;
        string memory latitude = _lat;
        string memory longitude = _long;
        if (transports[id] == 0x0) {
            Transport t = new Transport(id,company,grapeToken,latitude,longitude);
            transports[id] = t;
            transportAddresses.push(t);
            totalTransports++;
            return true;
        }
        return false;
    }

    function addAllFromHarvest(address _transport) public {
        address harvest = currentHarvest();
        transportToHarvest[_transport] = harvest;
        uint256 totalBalance = harvestBalance(harvest);
        require(totalBalance > 0);
        require(harvest.call(bytes4(keccak256("switchStatus()"))));
        require(harvest.call(bytes4(keccak256("transfer(address,uint256)")), _transport, totalBalance));
        require(harvest.call(bytes4(keccak256("harvestFields()"))));
    }


    function addFromHarvest(address _harvest, address _transport, uint256 _value) public {
        address harvest = currentHarvest();
        if(transportToHarvest[_harvest] == address(0)){
            transportToHarvest[_transport] = _harvest;
        }   
        uint256 totalBalance = harvestBalance(_harvest);
        require(totalBalance > 0);
        require(_value <= totalBalance);
        require(harvest.call(bytes4(keccak256("transfer(address,uint256)")), _transport, _value));
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
    constructor(string _company, address _tokenAddress, address _harvestHandler) public {
        company = _company;
        setTokenAddress(_tokenAddress);
        setHarvestHandler(_harvestHandler);
    }
}