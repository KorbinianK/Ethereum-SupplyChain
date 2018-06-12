pragma solidity 0.4.24;

import "../general/transactionowner.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../general/erc20handler.sol";

contract Transport is TransactionOwner, Ownable, ERC20Handler{
    uint private id;
    address[] private owners;
    
    constructor(uint _id, address _token) public {
        id = _id;
        erc20 = _token;
        owners.push(msg.sender);
    }
    
    
}