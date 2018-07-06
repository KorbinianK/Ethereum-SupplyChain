pragma solidity ^0.4.23;

import "../general/transactionowner.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../general/erc20handler.sol";

/**
 * @title The Transport contract
 */
contract Transport is TransactionOwner, Ownable, ERC20Handler{
    uint private id;
    string company;
    address[] private permissionedAccounts;
    string start_latitude;
    string start_longitude;
    string end_latitude;
    string end_longitude;
    address[] harvests;
    uint256 public createdAt;
    
    /** 
     * @dev The constructor function
     * @param _id of the transport
     * @param _token address of the token
     * @param _longitude start Location longitude
     * @param _latitude end Location latitude
    */
    constructor(uint _id, string _company, address _token, string _latitude, string _longitude) public {
        id = _id;
        company = _company;
        erc20 = _token;
        permissionedAccounts.push(msg.sender);
        setStartCoordinates(_latitude, _longitude);
        createdAt = now;
    }

    /**
    * @dev Overloading the default transfer function to check if account is empty 
    * @param to address of the receiver
    * @param value the amount to transfer
    */
    function transfer(address to, uint256 value) public returns(bool){
        if(getBalance() - value == 0){
            finish();
        }
        super.transfer(to, value);
        return true;
    }

    /**
    * @dev Finished the transport and disables transactions to it
    */
    function finish() public {
        switchStatus();
    }

    /** 
     * @dev Adds a harvest to a transport
     * @param _harvest address of a harvest
    */
    function addHarvest(address _harvest) public {
        harvests.push(_harvest);
    }

    /** 
     * @dev Sets the starting coordinates of the transport
     * @param _longitude Location longitude
     * @param _latitude Location latitude
    */
    function setStartCoordinates(string _latitude, string _longitude) public {
        start_latitude = _latitude;
        start_longitude = _longitude;
    }

     /** 
     * @dev Gets the starting coordinates of the transport
     * @return _longitude Location longitude
     * @return _latitude Location latitude
    */
    function getStartCoordinates() public view returns(string,string){
        return(start_latitude, start_longitude);
    }
    
    /** 
     * @dev Sets the end coordinates of the transport
     * @param _longitude Location longitude
     * @param _latitude Location latitude
    */
    function setEndCoordinates(string _latitude, string _longitude) public {
        end_latitude = _latitude;
        end_longitude = _longitude;
    }

    /** 
     * @dev Gets the ID of the transport
     * @return uint the ID
    */
    function getID() public view returns (uint) {
        return id;
    }
    
}