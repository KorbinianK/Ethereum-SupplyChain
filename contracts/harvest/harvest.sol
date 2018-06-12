pragma solidity ^0.4.23;

import "../cultivation/field.sol";
import "../general/transactionowner.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../general/erc20handler.sol";


contract Harvest is TransactionOwner, Ownable, ERC20Handler {

    mapping(address => bool) private fields;
    mapping(address => uint) private fieldBalance;
    address[] private fieldArray;
    uint private year;
    address[] private owners;
    event FieldAdded(address field); 

    modifier harvestable(address _fieldAddress) {
        require(Field(_fieldAddress).isHarvestable(),"Field is currently not harvestable");
        _;
    }
 

    function weightInput(address _fieldAddress, uint _amount) public harvestable(_fieldAddress) {
        mintToken(_amount);
        fieldBalance[_fieldAddress] += _amount;
    }

    function balanceFromField(address _fieldAddress) public view returns(uint) {
        return fieldBalance[_fieldAddress];
    }

    function mintToken(uint256 _value) public returns (bool) {
        require(erc20.call(bytes4(keccak256("mint(address,uint256)")), this, _value));
        return true;
    }

    function transferTo(address _to, uint256 _value) public returns(bool) {
        require(erc20.call(bytes4(keccak256("transfer(address,uint256)")), _to, _value));
        return true;
    }
    
    function getBalance() public view returns (uint256) {
        return balanceOf(address(this));
    }

    function getAllDetails() public view returns (address[], uint, address[], uint, address[]) {
        return (
            fieldArray,
            year,
            owners,
            totalTransactions,
            sender);
    }
   
    function addField(address _fieldAddress) public harvestable(_fieldAddress) returns (bool success) {
        if (fields[_fieldAddress] == false) {
            Field f = Field(_fieldAddress);
            f.harvest(this);
            // uint _txcount = f.getTotalTransactionCount();
            fields[_fieldAddress] = true;
            // fieldIndex[_fieldAddress] =
            fieldArray.push(_fieldAddress);
            emit FieldAdded(_fieldAddress);
            return true;
        }
        return false;
    }

    function addMultipleFields(address[] _fieldAddresses) public {
        for (uint i; i < _fieldAddresses.length; i++) {
            address _fieldAddress = _fieldAddresses[i];
            require(Field(_fieldAddress).isField());       
            require(Field(_fieldAddress).isHarvestable());
            addField(_fieldAddress);
        }
    }
    
    function getFields() public view returns (address[]) {
        return fieldArray; 
    }
    
    function getTransactionPointer(address _fieldAddress) public view returns (uint) {
        return Field(_fieldAddress).getHarvestPointer(this);
    }
    
    function getYear() public view returns(uint) {
        return year;
    }

    constructor(uint _year, address _token) public {
        year = _year;
        erc20 = _token;
        owners.push(msg.sender);
    }