pragma solidity ^0.4.23;

import "./MintableToken.sol";

/**
 * @title The Grape Token contract
*/
contract GrapeToken is MintableToken {
    string public name = "Grapes";
    string public symbol = "kg";
    uint8 public decimals = 2;
}