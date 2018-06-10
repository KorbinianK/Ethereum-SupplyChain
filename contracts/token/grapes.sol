pragma solidity 0.4.24;

import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


contract GrapeToken is MintableToken {
    string public name = "Grapes";
    string public symbol = "kg";
    uint8 public decimals = 2;
}