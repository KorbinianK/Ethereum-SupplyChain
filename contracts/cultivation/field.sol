pragma solidity 0.4.23; 

import "../general/transactionowner.sol"; 
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Field
 * @dev Field object that can recieve transactions
 */
contract Field is TransactionOwner {
    
    address internal creator;
    bytes internal name;
    bytes internal picture;
    bool internal active;
    Location internal location;
    address[] public owners;

    mapping(address=>bool) public isOwner;

    event StatusChanged(bool oldStatus, bool newStatus); 

    modifier onlyCreator{
        require(msg.sender == creator);
        _;
    }
    
    struct Location {
        bytes latitude;
        bytes longitude;
    }

    function isOwner(address sender) public view returns(bool) {
        require(isOwner[sender]);
        return true;
    }

    function getOwner(uint _index) public returns(address){
        return owners[_index];
    }
    
    function changeActive(bool _status) public onlyCreator returns(bool) {
        emit StatusChanged(active, _status); 
        active = _status;
        return active;
    }
    
    function getName() public view returns(bytes) {
        return name;
    }
    
    function getLatitude() public view returns(bytes) {
        return location.latitude;
    }

    function getLongitude() public view returns(bytes) {
        return location.longitude;
    }

    function getLocation() public view returns(bytes, bytes) {
        return (location.longitude, location.latitude);
    }

    function getAllDetails() public view 
    returns(
        bool,
        address,
        address[],
        bytes,
        bytes,
        bytes,
        bytes,
        uint,
        address[]) {

        return (
            active,
            creator,
            owners,
            name,
            picture,
            location.latitude,
            location.longitude,
            totalTransactions,
            sender
        );
    }

    function isField() public pure returns(bool) {
        return true;
    }

   /** @dev Constructor of the object.
    */
    // constructor(address _creator) public  {  
    //     creator = _creator;
    //     owners.push(creator);
    //     isOwner[creator] = true;
    // }

    constructor(
        address _creator,
        bytes _name,
        bytes _longitude,
        bytes _latitude      
      ) public  {  
        creator = _creator;
        owners.push(creator);
        isOwner[creator] = true;
        name = _name;
        location.longitude = _longitude;
        location.latitude = _latitude;
    }

    function setName(bytes _name) public onlyCreator returns(bool) {
        name = _name;
        return true;
    }

    function setLocation(bytes _lat, bytes _long) public onlyCreator returns(bool) {

        location.latitude = _lat;
        location.longitude = _long;
        return true;
    }

    function setPicture(bytes _picture) public onlyCreator returns(bool){
        picture = _picture;
        return true;
    }

    function addOwner(address _owner) public onlyCreator returns(bool){
        owners.push(_owner);
        isOwner[_owner] = true;
    }


}