pragma solidity ^0.4.23; 
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol";

contract ERC20Handler is ERC20Basic{
    address erc20;
    
    function tokenAddress() public view returns(address){
        return erc20;
    }
    function getBalance() public view returns (uint256) {
        return balanceOf(address(this));
    }
    function transferTo(address _to, uint256 _value) public isActive returns(bool) {
        require(erc20.call(bytes4(keccak256("transfer(address,uint256)")), _to, _value));
        return true;
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

