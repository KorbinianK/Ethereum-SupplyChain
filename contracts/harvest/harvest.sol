pragma solidity ^0.4.24;

import "../cultivation/field.sol";
import "../general/transactionowner.sol";

contract Harvest is TransactionOwner {
   
    mapping(address => uint) fields;
    mapping(address => uint) fieldIndex;
    address[] fieldArray;
    uint year;
    uint required;
    uint daylimit;
    address[] owner;
    
    
    constructor(uint _year, address[] _owner) public{
        year = _year;
        owner = _owner;
       
    }
   
    function addField(address _fieldAddress) public returns (bool success){
        if(fields[_fieldAddress] == 0){
            Field f = Field(_fieldAddress);
            uint _txcount = f.getTotalTransactionCount();
            fields[_fieldAddress] = _txcount;
            fieldIndex[_fieldAddress] =
            fieldArray.push(_fieldAddress);
            return true;
        }
        return false;
    }
    
    function getFields() public view returns (address[]){
       return fieldArray; 
    }
    
    function getTransactionPointer(address _fieldAddress) public view returns (uint transactions){
       return fields[_fieldAddress];
    }
    
    function getFieldIndex(address _fieldAddress) public view returns(uint) {
        return fieldIndex[_fieldAddress];
    }
    
}
