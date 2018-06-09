pragma solidity 0.4.24;

import "../general/transactionowner.sol"; 
// import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Field
 * @dev Field object that can recieve transactions
 */
/**
 * @title Field
 * @dev Field object that can recieve transactions
 * 
 * "0x25a8f1c2e1befc4e8adfe7610551f871cf547eb8","0x123","0x123","0x123"
 */
contract Field is TransactionOwner {
    
    address internal creator;
    bytes internal name;
    bytes internal picture;
    bool internal status;
    Location internal location;
    address[] public owners;
    Stages public stage;

    enum Stages {
        Uncultivated,
        Cultivated,
        Harvested
    }

    mapping(address=>uint) public harvestPointer;
    mapping(address=>bool) public isOwner;

    event StatusChanged(bool oldStatus, bool newStatus); 
    event NewStage(Stages stage);

    modifier atStage(Stages _stage) {
        require(stage == _stage, "Function cannot be called at this time.");
        _;
    }

    modifier transitionNext() {
        _;
        nextStage();
    }
  
    modifier onlyCreator {
        require(msg.sender == creator, "Only the creator can call this function");
        _;
    }

    modifier isActive {
        require(status == true);
        _;
    }
    
    struct Location {
        bytes latitude;
        bytes longitude;
    }

    function harvest(address _harvest) public isActive atStage(Stages.Cultivated) transitionNext {
        harvestPointer[_harvest] = totalTransactions;
    }

    function addTransaction(address _sender, bytes _data) public {
        if (stage == Stages.Cultivated)
            super.addTransaction(_sender, _data); 
    }

    function isOwner(address sender) public view returns(bool) {
        require(isOwner[sender], "Not allowed");
        return true;
    }

    function getOwner(uint _index) public view returns(address){
        return owners[_index];
    }
    
    function changeStatus(bool _status) public onlyCreator returns(bool) {
        emit StatusChanged(status, _status); 
        if (!status) {
            stage = Stages.Uncultivated;
        }else {
            stage = Stages.Cultivated;
        }
        status = _status;
        return status;
    }
    
    function getStatus() public view returns(bool) {
        return status;
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
            status,
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
        stage = Stages.Uncultivated;
        
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
  
    function nextStage() public {
        stage = Stages(uint(stage) + 1);
        emit NewStage(stage);
    }

}