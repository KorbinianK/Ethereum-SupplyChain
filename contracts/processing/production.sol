pragma solidity ^0.4.23;

import "../general/transactionowner.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../general/erc20handler.sol";

contract Production is TransactionOwner, Ownable, ERC20Handler{
    uint private id;
    address[] private owners;
    uint256 public createdAt;
    
    constructor(uint _id, address _token) public {
        id = _id;
        erc20 = _token;
        owners.push(msg.sender);
        createdAt = now;
    }
    
    
}