pragma solidity ^0.4.23;

import "../cultivation/field.sol";
import "../general/transactionowner.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../general/erc20handler.sol";
import "../general/strings.sol";


/**
 * @title The Harvest contract
 */
contract Harvest is TransactionOwner, Ownable, ERC20Handler {
     using strings for *;

    address[] private fieldArray;
    uint private year;
    address[] private permissionedAccounts;
    uint256 public createdAt;
    
     // Mapping of a field address to a boolean value to track if it has been added already
    mapping(address => bool) private fields;
    
    // Mapping of a field address to the amount of grapes it brought in 
    mapping(address => uint) private fieldBalance;
    
    // Event that fires when a new field has been added
    event FieldAdded(address field);

    event WeightInput(uint amount);
    
    /**
    * @dev Checks if a field can be harvested
    * @param _fieldAddress the address to check
    */
    modifier harvestable(address _fieldAddress) {
        require(Field(_fieldAddress).isHarvestable(), "Field is currently not harvestable");
        _;
    }
    
    
    function transfer(address to, uint256 value) public returns(bool){
        if(getBalance() - value == 0){
            harvestFields();
            switchStatus();
        }
        super.transfer(to, value);
        return true;
    }
    
    /**
    * @dev Harvests all fields added to this contract
    */
    function harvestFields() public {
        for(uint i = 0; i < fieldArray.length; i++) {
            Field(fieldArray[i]).harvest(address(this));
            updateTransaction(msg.sender,bytes("Harvested: ".toSlice().concat((this.addressToString()).toSlice())));
        }
    }

    /**
    * @dev Function that mints tokens based on the input weightInput
    * @param _fieldAddress address of the field
    * @param _value the amount of grapes to mint
    */
    function weightInput(address _fieldAddress, uint _value) public harvestable(_fieldAddress) {
        require(erc20.call(bytes4(keccak256("mint(address,uint256)")), this, _value));
        addField(_fieldAddress);
        fieldBalance[_fieldAddress] += _value;
        // updateTransaction(msg.sender,bytes("Weighted: ".toSlice().concat((address(_fieldAddress).addressToString()).toSlice())));
        updateTransaction(msg.sender,bytes((address(_fieldAddress).addressToString())));
        Field(_fieldAddress).harvest(this);
        emit WeightInput(_value);
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
    returns (address[], uint, address[], uint, address[], uint256) {
        uint256 grapes = getBalance();
        return (
            fieldArray,
            year,
            permissionedAccounts,
            totalTransactions,
            sender,
            grapes
            );
    }
   
   /**
    * @dev Adds a single field to the harvest
    * @param _fieldAddress address of the field
    * @return bool 
    */
    function addField(address _fieldAddress) internal returns (bool success) {
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
        erc20 = _token;
        permissionedAccounts.push(msg.sender);
        createdAt = now;
    }
}