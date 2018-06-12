pragma solidity ^0.4.23; 
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol";

contract ERC20Handler is ERC20Basic{
    address erc20;
    
    function tokenAddress() public view returns(address){
        return erc20;
    }

// TOKEN FUNCTIONS
    event Transfer(address indexed from, address indexed to, uint256 value);

    function totalSupply() public view returns (uint256) {
        return ERC20Basic(erc20).totalSupply(); 
    }
    
    function balanceOf(address who) public view returns (uint256){
        require(who == address(this));
        return ERC20Basic(erc20).balanceOf(msg.sender);
    }
  
    function transfer(address to, uint256 value) public returns (bool) {
        ERC20Basic(erc20).transfer(to, value);
        emit Transfer(address(msg.sender), to, value);
        return false;
    }
}
