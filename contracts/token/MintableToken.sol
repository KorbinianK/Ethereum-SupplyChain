pragma solidity ^ 0.4 .21;

import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20//StandardToken.sol";
// import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title Mintable token
 * @dev Simple ERC20 Token example, with mintable token creation
 * @dev Issue: * https://github.com/OpenZeppelin/openzeppelin-solidity/issues/120
 * Based on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol
 *
 */
contract MintableToken is StandardToken {
    event Mint(address indexed to, uint256 amount);
    event MintFinished();
    bool public mintingFinished = false;

    mapping(address => bool) mintAllowed;
    mapping(address => bool) private owner;
    
    constructor() public {
        owner[msg.sender] = true;
    }

    modifier onlyOwner(){
        require(owner[msg.sender]==true);
        _;
    }

    modifier canMint() {
        require(!mintingFinished);
        _;
    }

    modifier mintingRights() {
        require(mintAllowed[msg.sender]==true);
        _;
    }

    function addMinter(address _toAdd) public onlyOwner {
        mintAllowed[_toAdd] = true;
    }

    function removeMinter(address _toRemove) public onlyOwner {
        mintAllowed[_toRemove] = false;
    }

    /**
     * @dev Function to mint tokens
     * @param _to The address that will receive the minted tokens.
     * @param _amount The amount of tokens to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(address _to, uint256 _amount)  canMint public returns(bool) {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }

    /**
     * @dev Function to stop minting new tokens.
     * @return True if the operation was successful.
     */
    function finishMinting() onlyOwner canMint public returns(bool) {
        mintingFinished = true;
        emit MintFinished();
        return true;
    }
}