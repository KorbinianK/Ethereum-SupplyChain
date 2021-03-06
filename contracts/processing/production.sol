pragma solidity ^0.4.23;

import "../general/transactionowner.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../general/erc20handler.sol";

contract Production is TransactionOwner, Ownable, ERC20Handler{
    uint private id;
    address[] private owners;
    address public creator;
    address[] private permissionedAccounts;
    uint256 public createdAt;
    
    constructor(uint _id, address _token) public {
        id = _id;
        erc20 = _token;
        permissionedAccounts.push(msg.sender);
        owners.push(msg.sender);
        creator = msg.sender;
        createdAt = now;
    }

     /** 
     * @dev Gets the ID of the production
     * @return uint the ID
    */
    function getID() public view returns (uint) {
        return id;
    }
    
    /**
    * @dev Finished the production and disables it
    */
    function finish() public {
        switchStatus();
    }


    /** 
     * @dev Gets the creator of the transport
     * @return address Address of the creator
    */
    function getCreator() public view returns (address) {
        return creator;
    }

    
}