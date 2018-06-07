pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;

import "./field.sol";

/*

"feld1","","","",["0x94f649347c84e195dcc16da18def57053ffc895e"],0,1000000000000000000
*/
contract FieldHandler {
    
    event NewField(address field, address creator);
    event StatusChanged(address field, address sender); 
    address[] internal allFields;
    address[] internal activeFieldsArray;
    
    mapping(address => bool) internal fields;
    mapping(address => bool) internal activeFields;
    mapping(address => uint) internal activeIndex;
       
    modifier fieldActive(address _fieldAddress) {
        require(isActive(_fieldAddress));
        _;
    }
    
    modifier isfield(address _fieldAddress) {
        require(Field(_fieldAddress).isField());
        _;
    }
    
    function getFieldCount() public view returns (uint) {
        return allFields.length;
    }
    
    function activate(address _fieldAddress) public isfield(_fieldAddress) {
        Field f = Field(_fieldAddress);
        require(f.isOwner(msg.sender));
        f.changeActive(true);
        activeFields[_fieldAddress] = true;
        uint id = activeFieldsArray.length;
        activeIndex[_fieldAddress] = id;
        activeFieldsArray.push(_fieldAddress);
        emit StatusChanged(f, msg.sender); 
    }
    
    function deactivate(address _fieldAddress) public isfield(_fieldAddress) {
        Field f = Field(_fieldAddress);
        require(f.isOwner(msg.sender));
   
        activeFields[_fieldAddress] = false;
        uint id = activeIndex[_fieldAddress];
        if (id >= activeFieldsArray.length) return;

        for (uint i = id; i < activeFieldsArray.length-1; i++) {
            activeFieldsArray[i] = activeFieldsArray[i+1];
        }
        delete activeFieldsArray[activeFieldsArray.length-1];
        activeFieldsArray.length--;
        emit StatusChanged(f, msg.sender); 
    }
    
    function getActiveFields() public view returns(address[]) {
        return activeFieldsArray;
    }
 
    function isActive(address _fieldAddress) public view isfield(_fieldAddress) returns(bool) {
        return activeFields[_fieldAddress];
    }
    
    function getFieldAddressAtIndex(uint index) public view returns(address) {
        return allFields[index];
    }
        
    function newField( 
        bytes _name,
        bytes _longitude,
        bytes _latitude  
        ) public returns(address) {
        Field f = new Field(msg.sender, _name, _longitude, _latitude);
        allFields.push(f);
        emit NewField(f, msg.sender);
        return f;
    }
    
    function addField(address _fieldAddress) public isfield(_fieldAddress) {
        allFields.push(Field(_fieldAddress));
    }
    
    //TODO removeField?
    function getFieldOwner(address _fieldAddress, uint _index) public view isfield(_fieldAddress) returns(address) {
        return Field(_fieldAddress).getOwner(_index);
    }
    
    function getTotalTransactionCount(address _fieldAddress) public view isfield(_fieldAddress) returns(uint) {
        return Field(_fieldAddress).getTotalTransactionCount();
    }
    
    function getTransactionCountFromSender(address _fieldAddress, address _sender) public view isfield(_fieldAddress) returns(uint) {
        Field f = Field(_fieldAddress);
        return f.getTransactionCountFromSender(_sender);
    }
    
    function getTransactionSender(address _fieldAddress) public view isfield(_fieldAddress) returns (address[]) {
        Field f = Field(_fieldAddress);
        return f.getAllUniqueTransactionSender();
    }
    
    function getTransactionDataFromSenderAtIndex(address _fieldAddress, address _sender, uint _index) public view isfield(_fieldAddress) returns (bytes) {
        Field f = Field(_fieldAddress);
        return f.getTransactionDataFromSenderAtIndex(_sender, _index);
    }
    
    function getTransactionDataAtIndexFromAddress(address _fieldAddress,address _sender,uint _index) public view isfield(_fieldAddress) returns(string) {
        Field f = Field(_fieldAddress);
        return string(f.getTransactionDataFromSenderAtIndex(_sender, _index));
    }
}

