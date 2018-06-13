pragma solidity ^0.4.23;

import "../general/transactionowner.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../general/erc20handler.sol";

contract Transport is TransactionOwner, Ownable, ERC20Handler{
    uint private id;
    address[] private owners;
    string latitude;
    string longitude;

    constructor(uint _id, address _token, string _longitude, string _latitude) public {
        id = _id;
        erc20 = _token;
        owners.push(msg.sender);
        setStartCoordinates(_longitude, _latitude);
    }

    function setStartCoordinates(string _latitude, string _longitude) public {
        latitude = _latitude;
        longitude = _longitude;
    }

   
}