pragma solidity ^0.4.23; 
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol";


/**
 * @title Handles the interaction with ERC20 tokens
 */
contract ERC20Handler is ERC20Basic{
    
    address erc20;
    
    /**
     * @dev Gets the ERC20 address
     * @return address the token address
     */
    function tokenAddress() public view returns(address){
        return erc20;
    }
    
    /**
     * @dev Gets token balance of the contract
     * @return uint256 the balance
     */
    function getBalance() public view returns (uint256) {
        return balanceOf(address(this));
    }

/**
 *@dev Fulfilling the ERC20 requirments
 */
    event Transfer(address indexed from, address indexed to, uint256 value);

    function totalSupply() public view returns (uint256) {
        return ERC20Basic(erc20).totalSupply(); 
    }
    
    function balanceOf(address who) public view returns (uint256){
        return ERC20Basic(erc20).balanceOf(who);
    }
  
    function transfer(address to, uint256 value) public returns (bool) {
        ERC20Basic(erc20).transfer(to, value);
        emit Transfer(address(msg.sender), to, value);
        return false;
    }
}
