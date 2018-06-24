pragma solidity ^0.4.24;
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Holder.sol";
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract ERC721Handler is ERC721Holder{
    
    address erc721;
    
    function getBalance() public view returns (uint256 ) {
        return ERC721Token(erc721).balanceOf(this);
    }
    
    function getToken(uint256 _tokenId) external view returns (address mintedBy, uint64 mintedAt, address fromHarvest) {
        return ERC721Token(erc721).getToken(_tokenId);
    }
    
    function tokensOwned() external view returns (uint256[]) {
        return ERC721Token(erc721).tokensOfOwner(this);
    }
    
    function transfer(address _to, uint _id) public {
        require(erc721.call(bytes4(keccak256("transferFrom(address,address,uint256)")), this, _to, _id));
    }
}