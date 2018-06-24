pragma solidity ^0.4.23;

import "../cultivation/field.sol";
import "../general/transactionowner.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../general/erc721handler.sol";


/**
 * @title The Harvest contract
 */
contract Harvest is TransactionOwner, Ownable, ERC721Handler {
    
    address[] private fieldArray;
    uint private year;
    address[] private permissionedAccounts;
  
    
     // Mapping of a field address to a boolean value to track if it has been added already
    mapping(address => bool) private fields;
    
    // Mapping of a field address to the amount of grapes it brought in 
    mapping(address => uint) private fieldBalance;
    
    // Event that fires when a new field has been added
    event FieldAdded(address field);
    
    /**
    * @dev Checks if a field can be harvested
    * @param _fieldAddress the address to check
    */
    modifier harvestable(address _fieldAddress) {
        require(Field(_fieldAddress).isHarvestable(), "Field is currently not harvestable");
        _;
    }
    
    /**
    * @dev Harvests all fields added to this contract
    */
    function harvestFields() public {
        for(uint i = 0; i < fieldArray.length; i++) {
            Field(fieldArray[i]).harvest(address(this));
        }
    }

    /**
    * @dev Function that mints tokens based on the input weightInput
    * @param _fieldAddress address of the field
    * @param _value the amount of grapes to mint
    */
    function weightInput(address _fieldAddress, uint _value) public harvestable(_fieldAddress) {
        require(erc721.call(bytes4(keccak256("mintMany(address,uint256)")), this, _value));
        addField(_fieldAddress);
        fieldBalance[_fieldAddress] += _value;
    }

   /**
    * @dev Gets the balance of grapes a field contributed
    * @param _fieldAddress address of the field
    * @return uint the amount of grapes 
    */
    function balanceFromField(address _fieldAddress) public view returns(uint) {
        return fieldBalance[_fieldAddress];
    }

   /**
    * @dev Gets all details of the harvest
    * @return address[] all fields, uint the year, address[] permissioned accounts, 
    * uint transaction counter, address[] all transaction sender, uint256 the amount of grapes  
    */
    function getAllDetails() 
    public view 
    returns (address[], uint, address[], uint, address[]
    // , uint256
    ) {
        // uint256 amountGrapes = getBalance();
        return (
            fieldArray,
            year,
            permissionedAccounts,
            totalTransactions,
            sender
            
            // ,amountGrapes
            );
    }
   
   /**
    * @dev Adds a single field to the harvest
    * @param _fieldAddress address of the field
    * @return bool 
    */
    function addField(address _fieldAddress) public harvestable(_fieldAddress) returns (bool success) {
        if (fields[_fieldAddress] == false) {
            fields[_fieldAddress] = true;
            fieldArray.push(_fieldAddress);
            emit FieldAdded(_fieldAddress);
            return true;
        }
        return false;
    }

    /**
    * @dev Adds a multiple fields to the harvest
    * @param _fieldAddresses address array of the fields
    */
    function addMultipleFields(address[] _fieldAddresses) public {
        for (uint i; i < _fieldAddresses.length; i++) {
            address _fieldAddress = _fieldAddresses[i];
            require(Field(_fieldAddress).isField());       
            require(Field(_fieldAddress).isHarvestable());
            addField(_fieldAddress);
        }
    }
    
   /**
    * @dev Gets all fields of the harvest
    * @return address[] array of all fields 
    */
    function getFields() public view returns (address[]) {
        return fieldArray; 
    }
    
    /**
    * @dev Gets the transaction pointer of the current harvest on a field
    * @param _fieldAddress the address of the field
    * @return uint the pointer 
    */
    function getTransactionPointer(address _fieldAddress) public view returns (uint) {
        return Field(_fieldAddress).getHarvestPointer(this);
    }
    
    /**
    * @dev Gets the year of the harvest contract
    * @return uint the year 
    */
    function getYear() public view returns(uint) {
        return year;
    }

    /**
    * @dev Constructor function
    * @param _year of the harvest
    * @param _token the tokenaddress
    */
    constructor(uint  _year, address _token) public {
        year = _year;
        erc721 = _token;
        permissionedAccounts.push(msg.sender);
    
    }
}