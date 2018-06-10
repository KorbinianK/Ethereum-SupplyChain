pragma solidity ^0.4.23;

import "../cultivation/field.sol";
import "../general/transactionowner.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Harvest is TransactionOwner, Ownable {

    mapping(address => bool) private fields;
    // mapping(address => uint) private fieldIndex;
    address[] private fieldArray;
    uint private year;
    address[] private owners;
    event FieldAdded(address field); 
    
    address public grapeToken;

    modifier harvestable(address _fieldAddress) {
        require(Field(_fieldAddress).isHarvestable());
        _;
    }

    function setTokenAddress(address _tokenAddress) public onlyOwner {
        grapeToken = _tokenAddress;
    }

    function mintToken(uint256 _value) public returns (bool) {
        require(grapeToken.call(bytes4(keccak256("mint(address,uint256)")), this, _value));
        return true;
    }

    function transferTo(address _to, uint256 _value) public onlyOwner returns(bool) {
        require(grapeToken.call(bytes4(keccak256("transfer(address,uint256)")), _to, _value));
        return true;
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

    constructor(uint _year) public {
        year = _year;
        owners.push(msg.sender);
    }
}
