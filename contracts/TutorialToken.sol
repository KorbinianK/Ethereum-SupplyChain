pragma solidity 0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


contract TutorialToken is StandardToken {
    string public name = "TutorialToken";
    string public symbol = "TT";
    uint8 public decimals = 2;
    uint public initialSupply = 12000;

    constructor() public {
        totalSupply_ = initialSupply;
        balances[msg.sender] = initialSupply;
    }

}