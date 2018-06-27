pragma solidity ^0.4.23;

import "./field.sol";


/**
 * @title The Handler contract for the vineyards        
 */
contract FieldHandler {
     
    address[] internal allFields;
    address[] internal activeFieldsArray;
    
    /**
    * @dev Event that fires when a new field gets created
    * @param field the address of the newly created field
    * @param creator the address of the creator of the field
    */
    event NewField(address field, address creator);
    
    /**
    * @dev Event that fires when a field gets added or removed from the active array
    * @param field the address of the field that got updated
    * @param sender the address of the account that made the update
    */
    event StatusChanged(address field, address sender); 

    // Mapping of a field address to a boolean status
    mapping(address => bool) internal activeFields;
    
    // Mapping of an address to an index
    mapping(address => uint) internal activeIndex;
       
    /**
    * @dev Checks if a field is active
    * @param _fieldAddress the address to check
    */
    modifier fieldActive(address _fieldAddress) {
        require(Field(_fieldAddress).getStatus());
        _;
    }

    /**
    * @dev Checks if a field contract is deactivated
    * @param _fieldAddress the address to check
    */
    modifier fieldNotActive(address _fieldAddress) {
        require(!Field(_fieldAddress).getStatus());
        _;
    }
    
    /**
    * @dev Checks if an address is a field contract
    * @param _fieldAddress the address to check
    */
    modifier isfield(address _fieldAddress) {
        require(Field(_fieldAddress).isField());
        _;
    }

    /**
    * @dev Checks if an address is a field contract
    * @param _fieldAddress the address to check
    */
    modifier isFieldOwner(address _fieldAddress) {
        require(Field(_fieldAddress).isAllowed(msg.sender));
        _;
    }
    
    /**
    * @dev Gets the number of total fields created
    * @return uint number of fields
    */
    function getFieldCount() public view returns (uint) {
        return allFields.length;
    }
    
    /**
    * @dev Adds a field to the active fields array
    * @param _fieldAddress address of the field
    */
    function activate(address _fieldAddress) 
    public 
    isfield(_fieldAddress) 
    isFieldOwner(_fieldAddress) 
    fieldActive(_fieldAddress)
    {
        Field f = Field(_fieldAddress);
        f.switchStatus();
        activeFields[_fieldAddress] = true;
        uint id = activeFieldsArray.length;
        activeIndex[_fieldAddress] = id;
        activeFieldsArray.push(_fieldAddress);
        emit StatusChanged(f, msg.sender); 
    }
    
    /**
    * @dev Removes a field from the active fields array
    * @param _fieldAddress address of the field
    */
    function deactivate(address _fieldAddress) 
    public 
    isfield(_fieldAddress) 
    isFieldOwner(_fieldAddress) 
    fieldNotActive(_fieldAddress)
    {
        Field f = Field(_fieldAddress);
        f.switchStatus();
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

    /**
    * @dev Gets all fields
    * @return address array of all fields
    */
    function getAllFields() public view returns(address[]) {
        return allFields;
    }

    /**
    * @dev Gets all active fields
    * @return address array of all active fields
    */
    function getActiveFields() 
    public view 
    returns(address[]) {
        return activeFieldsArray;
    }
 
    /**
    * @dev Gets a field from the fields array with an index
    * @param _index the index
    * @return address
    */
    function getFieldAddressAtIndex(uint _index) public view returns(address) {
        return allFields[_index];
    }
    
    /**
    * @dev Creates a new field contract
    * @param _name the name of the vineyard
    * @param _longitude  longitude of the location
    * @param _latitude latitude of the location
    * @return address of the new field
    */
    function newField( 
        string _name,
        string _longitude,
        string _latitude,
        string _grapeType 
        ) public returns(address) {
        Field f = new Field(msg.sender, _name, _longitude, _latitude,_grapeType);
        allFields.push(f);
        activeFieldsArray.push(f);
        emit NewField(f, msg.sender);
        return f;
    }
    
    /**
    * @dev Gets the latest field from the active fields array
    * @return address of the field
    */
    function currentField() public view returns(address){
        return activeFieldsArray[activeFieldsArray.length-1];
    }
}



