pragma solidity 0.4.24;

import "./MintableToken.sol";


contract GrapeToken is MintableToken {
    string public name = "Grapes";
    string public symbol = "kg";
    uint8 public decimals = 2;
}