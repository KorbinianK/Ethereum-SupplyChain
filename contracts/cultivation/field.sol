pragma solidity ^0.4.23;

import "../general/transactionowner.sol"; 

/** 
 * @title Vineyard Contract 
 * @dev The vineyard contract, inheriting TransactionOwner
 */
contract Field is TransactionOwner {
    
    address internal creator;
    string internal name;
    bytes internal picture;
    Location internal location;
    address[] public permissionedAccounts;
    Stages public stage;
    address public lastHarvest;
    
    /**
    * @dev Enum for the stages of the vineyard
    */
    enum Stages {
        Uncultivated,
        Cultivated,
        Harvested
    }
    
    // Mapping from a harvest to the amount of transactions at the time of the harvest
    mapping(address=>uint) public harvestPointer;
    
    // Mapping of the current harvest to the previous one
    mapping(address=>address) public previousHarvest;
    
    // Mapping of an address to verfiy if an address is permissioned
    mapping(address=>bool) public isAllowed;

    // Event to notify a change in the stage
    event NewStage(Stages stage);

    /**
    * @dev Checks if the contract is at a certain stage
    * @param _stage Stage of the contract it has to be at
    */
    modifier atStage(Stages _stage) {
        require(stage == _stage, "Function cannot be called at this time.");
        _;
    }
    
    /**
    * @dev Moves the contract to the next stage after a function ran
    */
    modifier transitionNext() {
        _;
        nextStage();
    }
  
    /**
    * @dev Checks if the msg.sender is the creator of the contract
    */
    modifier onlyCreator {
        require(msg.sender == creator, "Only the creator can call this function");
        _;
    }
    
    
    /**
    * @dev Simply struct for the Location of the vineyard
    */
    struct Location {
        string latitude;
        string longitude;
    }

    /**
    * @dev Harvests the current vineyard and moves it to the harvested stage
    * @param _harvest Address of the harvest contract that called this function
    */
    function harvest(address _harvest) public atStage(Stages.Cultivated) transitionNext {
        harvestPointer[_harvest] = totalTransactions;
        previousHarvest[_harvest] = lastHarvest;
        lastHarvest = _harvest;
        // switchStatus();
    }
    
    /**
    * @dev Gets the transaction count at the time of harvest
    * @param _harvest Address of a harvest contract
    * @return uint transaction count
    */
    function getHarvestPointer(address _harvest) public view returns(uint) {
        return harvestPointer[_harvest];
    } 


    /**
    * @dev Overloading the transaction function from TransactionOwner to check if a field can accept data
    * @param _sender Address of the sender
    * @param _data data attached to the transaction
    */
    function addTransaction(address _sender, bytes _data) public isActive {
        if(stage == Stages.Cultivated){
            super.addTransaction(_sender, _data); 
        }
    }
    
    /**
    * @dev Function to check if an address is allowed to interact
    * @param _sender Address of the address to check
    * @return bool
    */
    function isAllowed(address _sender) public view returns(bool) {
        require(isAllowed[_sender], "Not allowed");
        return true;
    }

    /**
    * @dev Gets a permissioned account with an index from the array
    * @param _index Index to retrieve from the array
    * @return address of the account
    */
    function getPermissionedAccounts(uint _index) public view returns(address){
        return permissionedAccounts[_index];
    }
    
    /**
    * @dev Gets the name of the vineyard
    * @return bytes of the name
    */
    function getName() public view returns(string) {
        return name;
    }
    
    /**
    * @dev Gets the latitude of the vineyard
    * @return bytes of the latitude
    */
    function getLatitude() public view returns(string) {
        return location.latitude;
    }

    /**
    * @dev Gets the longitude of the vineyard
    * @return bytes of the longitude
    */
    function getLongitude() public view returns(string) {
        return location.longitude;
    }

    /**
    * @dev Gets the location of the vineyard
    * @return bytes, string of the longitude and latitude
    */
    function getLocation() public view returns(string, string) {
        return (location.longitude, location.latitude);
    }

    /**
    * @dev Gets all information from the contract
    * @return Stages stage of the vineyard, address of the creator, address[] of permissioned accounts
    * bytes name of the vineyard, bytes picture, bytes latitude, bytes longitude, 
    * uint transaction counter since last harvest, address[] of all transaction sender
    */ 
    function getAllDetails() public view 
    returns(
        Stages,
        address,
        address[],
        string,
        bytes,
        string,
        string,
        uint,
        address[]) {
        uint txCounter = transactionsSinceLastHarvest();
        return (
            stage,
            creator,
            permissionedAccounts,
            name,
            picture,
            location.latitude,
            location.longitude,
            txCounter,
            sender
        );
    }
    
    /**
    * @dev Gets the number of transactions since last harvest
    * @return uint number of transactions
    */
    function transactionsSinceLastHarvest() public view returns (uint) {
        uint current = totalTransactions;
        uint last = harvestPointer[lastHarvest];
        return (current - last);
    }

    /**
    * @dev Check if the current contract is a field contract
    * @return bool
    */
    function isField() public pure returns(bool) {
        return true;
    }

    /**
    * @dev Check if the current field is harvestable
    * @return bool
    */
    function isHarvestable() public view returns(bool) {
        require(stage == Stages.Cultivated);
        return true;
    }

    /**
    * @dev Constructor of the contract
    * @param _creator the account creating the contract
    * @param _name the name of the vineyard
    * @param _longitude the longitude
    * @param _latitude the latitude
    */
    constructor(
        address _creator,
        string _name,
        string _longitude,
        string _latitude      
      ) public  {  
        creator = _creator;
        permissionedAccounts.push(creator);
        isAllowed[creator] = true;
        name = _name;
        location.longitude = _longitude;
        location.latitude = _latitude;
        stage = Stages.Cultivated;
    }

    /**
    * @dev Updates the name of the vineyard
    * @param _name the new name 
    * @return bool
    */
    function setName(string _name) public onlyCreator returns(bool) {
        name = _name;
        return true;
    }

    /**
    * @dev Updates the location of the vineyard
    * @param _lat the new latitude
    * @param _long the new longitude
    * @return bool
    */
    function setLocation(string _lat, string _long) public onlyCreator returns(bool) {
        location.latitude = _lat;
        location.longitude = _long;
        return true;
    }

    /**
    * @dev Updates the picture of the vineyard
    * @param _picture the new picture 
    * @return bool
    */
    function setPicture(bytes _picture) public onlyCreator returns(bool){
        picture = _picture;
        return true;
    }

    /**
    * @dev Adds an address to the permissioend accounts array
    * @param _sender the address to add
    * @return bool
    */
    function addPermissionedAccount(address _sender) public onlyCreator returns(bool){
        permissionedAccounts.push(_sender);
        isAllowed[_sender] = true;
    }
  
    /**
    * @dev Moves the contract to the next stage
    */
    function nextStage() public {
        if(stage == Stages.Harvested){
            stage = Stages(0);
        }else{
            stage = Stages(uint(stage) + 1);
        }
        
        emit NewStage(stage);
    }

}