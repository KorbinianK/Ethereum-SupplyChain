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
    
    mapping(address => bool) internal activeFields;
    mapping(address => uint) internal activeIndex;
       
    modifier fieldActive(address _fieldAddress) {
        require(Field(_fieldAddress).getStatus());
        _;
    }

    modifier fieldNotActive(address _fieldAddress) {
        require(!Field(_fieldAddress).getStatus());
        _;
    }
    
    modifier isfield(address _fieldAddress) {
        require(Field(_fieldAddress).isField());
        _;
    }

    modifier isFieldOwner(address _fieldAddress) {
        require(Field(_fieldAddress).isOwner(msg.sender));
        _;
    }
    
    function getFieldCount() public view returns (uint) {
        return allFields.length;
    }
    
    function activate(address _fieldAddress) 
    public 
    isfield(_fieldAddress) 
    isFieldOwner(_fieldAddress) 
    fieldActive(_fieldAddress)
    {
        Field f = Field(_fieldAddress);
        f.changeStatus(true);
        activeFields[_fieldAddress] = true;
        uint id = activeFieldsArray.length;
        activeIndex[_fieldAddress] = id;
        activeFieldsArray.push(_fieldAddress);
        emit StatusChanged(f, msg.sender); 
    }
    
    function deactivate(address _fieldAddress) 
    public 
    isfield(_fieldAddress) 
    isFieldOwner(_fieldAddress) 
    fieldNotActive(_fieldAddress)
    {
        Field f = Field(_fieldAddress);
        f.changeStatus(false);
        activeFields[_fieldAddress] = false;
        uint id = activeIndex[_fieldAddress];
        if (id >= activeFieldsArray.length) revert();
        for (uint i = id; i < activeFieldsArray.length-1; i++) {
            activeFieldsArray[i] = activeFieldsArray[i+1];
        }
        delete activeFieldsArray[activeFieldsArray.length-1];
        activeFieldsArray.length--;
        emit StatusChanged(f, msg.sender); 
    }

    function getAllFields() public view returns(address[]) {
        return allFields;
    }

    function getActiveFields() 
    public view 
    returns(address[]) {
        return activeFieldsArray;
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
    
}

