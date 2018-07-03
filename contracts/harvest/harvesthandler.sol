pragma solidity ^0.4.23;

import "./harvest.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title The Handler contract for the harvests
 */
contract HarvestHandler is Ownable {
    
    uint private totalHarvests;
    address[] private harvestAddresses;
    address public fieldHandler;
    address public grapeToken;
    
    // Mapping of an index to a harvest contract
    mapping(uint => address) private harvests;


    /** 
     * @dev Low level call function to retrieve the current active field from the fieldHandler
     * @return address the field
     * Based on code from https://medium.com/[at]blockchain101/calling-the-function-of-another-contract-in-solidity-f9edfa921f4c
    */
    function currentField() public view returns (address current){
        bytes4 sig = bytes4(keccak256("currentField()"));
        assembly {
            // move pointer to free memory spot
            let ptr := mload(0x40)
            // put function sig at memory spot
            mstore(ptr,sig)
            // append argument after function sig
            // mstore(add(ptr,0x04), _val)

            let result := call(
              15000, // gas limit
              sload(fieldHandler_slot),  // to addr. append var to _slot to access storage variable
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
     * @dev Updates the token address
     * @param _tokenAddress the address of the token
    */
    function setTokenAddress(address _tokenAddress) public onlyOwner {
        grapeToken = _tokenAddress;
    }

    /** 
     * @dev Gets the latest harvest
     * @return address the lastest harvest
    */
    function currentHarvest() public view returns(address){
        return harvestAddresses[harvestAddresses.length-1];
    }

    /** 
     * @dev Creates a new harvest contract
     * @param _year Year of the harvest
     * @return bool
    */
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

    /** 
     * @dev Gets all harvests
     * @return address[] array of all harvests
    */
    function getHarvests() public view returns(address[]) {
        return harvestAddresses;
    }
    
    /** 
     * @dev Gets a specific harvest
     * @param _year the Year to retrieve
     * @return address the harvest
    */
    function getHarvest(uint _year) public view returns(address) {
        return harvests[_year];
    }
    
    /** 
     * @dev Updates the fieldhandler address
     * @param _fieldHandler address of the handler
    */
    function setFieldHandler(address _fieldHandler) public onlyOwner {
        fieldHandler = _fieldHandler;
    }
    
    /** 
     * @dev The constructor function
     * @param _fieldHandler address of the handler
     * @param _token address of the token
    */
    constructor(address _token, address _fieldHandler) public {
        setFieldHandler(_fieldHandler);
        setTokenAddress(_token);
    }
}