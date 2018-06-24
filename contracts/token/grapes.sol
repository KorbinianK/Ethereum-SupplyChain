pragma solidity ^0.4.23;

// import "./MintableToken.sol";
import "./ERC721Token.sol";
/**
 * @title The Grape Token contract
*/
contract GrapeToken is ERC721Token {
    string public name = "Grapes";
    string public symbol = "kg";
    // uint8 public decimals = 2;
}