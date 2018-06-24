pragma solidity ^0.4.24;

import "../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721BasicToken.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership//Ownable.sol";

/**
 * @title Full ERC721 Token
 * This implementation includes all the required and some optional functionality of the ERC721 standard
 * Moreover, it includes approve all functionality using operator terminology
 * @dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
contract ERC721Token is ERC721BasicToken, ERC721, Ownable {


    // Token name
    string internal name_;

    // Token symbol
    string internal symbol_;

    // Mapping from owner to list of owned token IDs
    mapping(address => uint256[]) internal ownedTokens;

    // Mapping from token ID to index of the owner tokens list
    mapping(uint256 => uint256) internal ownedTokensIndex;

    // Array with all token ids, used for enumeration
    uint256[] internal allTokens;

    // Mapping from token id to position in the allTokens array
    mapping(uint256 => uint256) internal allTokensIndex;

    // Optional mapping for token URIs
    mapping(uint256 => string) internal tokenURIs;

    /**
    * @dev Constructor function
    */
    constructor(string _name, string _symbol) public {
        name_ = _name;
        symbol_ = _symbol;
    }

    /**
    * @dev Gets the token name
    * @return string representing the token name
    */
    function name() external view returns (string) {
        return name_;
    }

    /**
    * @dev Gets the token symbol
    * @return string representing the token symbol
    */
    function symbol() external view returns (string) {
        return symbol_;
    }

    /**
    * @dev Returns an URI for a given token ID
    * Throws if the token ID does not exist. May return an empty string.
    * @param _tokenId uint256 ID of the token to query
    */
    function tokenURI(uint256 _tokenId) public view returns (string) {
        require(exists(_tokenId));
        return tokenURIs[_tokenId];
    }

    /**
    * @dev Gets the token ID at a given index of the tokens list of the requested owner
    * @param _owner address owning the tokens list to be accessed
    * @param _index uint256 representing the index to be accessed of the requested tokens list
    * @return uint256 token ID at the given index of the tokens list owned by the requested address
    */
    function tokenOfOwnerByIndex(
        address _owner,
        uint256 _index
    )
        public
        view
        returns (uint256)
    {
        require(_index < balanceOf(_owner));
        return ownedTokens[_owner][_index];
    }

    /**
    * @dev Gets the total amount of tokens stored by the contract
    * @return uint256 representing the total amount of tokens
    */
    function totalSupply() public view returns (uint256) {
        return allTokens.length;
    }

    /**
    * @dev Gets the token ID at a given index of all the tokens in this contract
    * Reverts if the index is greater or equal to the total number of tokens
    * @param _index uint256 representing the index to be accessed of the tokens list
    * @return uint256 token ID at the given index of the tokens list
    */
    function tokenByIndex(uint256 _index) public view returns (uint256) {
        require(_index < totalSupply());
        return allTokens[_index];
    }

    /**
    * @dev Internal function to set the token URI for a given token
    * Reverts if the token ID does not exist
    * @param _tokenId uint256 ID of the token to set its URI
    * @param _uri string URI to assign
    */
    function _setTokenURI(uint256 _tokenId, string _uri) internal {
        require(exists(_tokenId));
        tokenURIs[_tokenId] = _uri;
    }

    /**
    * @dev Internal function to add a token ID to the list of a given address
    * @param _to address representing the new owner of the given token ID
    * @param _tokenId uint256 ID of the token to be added to the tokens list of the given address
    */
    function addTokenTo(address _to, uint256 _tokenId) internal {
        super.addTokenTo(_to, _tokenId);
        uint256 length = ownedTokens[_to].length;
        ownedTokens[_to].push(_tokenId);
        ownedTokensIndex[_tokenId] = length;
    }

    /**
    * @dev Internal function to remove a token ID from the list of a given address
    * @param _from address representing the previous owner of the given token ID
    * @param _tokenId uint256 ID of the token to be removed from the tokens list of the given address
    */
    function removeTokenFrom(address _from, uint256 _tokenId) internal {
        super.removeTokenFrom(_from, _tokenId);

        uint256 tokenIndex = ownedTokensIndex[_tokenId];
        uint256 lastTokenIndex = ownedTokens[_from].length.sub(1);
        uint256 lastToken = ownedTokens[_from][lastTokenIndex];

        ownedTokens[_from][tokenIndex] = lastToken;
        ownedTokens[_from][lastTokenIndex] = 0;
        // Note that this will handle single-element arrays. In that case, both tokenIndex and lastTokenIndex are going to
        // be zero. Then we can make sure that we will remove _tokenId from the ownedTokens list since we are first swapping
        // the lastToken to the first position, and then dropping the element placed in the last position of the list

        ownedTokens[_from].length--;
        ownedTokensIndex[_tokenId] = 0;
        ownedTokensIndex[lastToken] = tokenIndex;
    }

    /**
    * @dev Internal function to mint a new token
    * Reverts if the given token ID already exists
    * @param _to address the beneficiary that will own the minted token
    * @param _tokenId uint256 ID of the token to be minted by the msg.sender
    */
    function _mint(address _to, uint256 _tokenId) internal {
        super._mint(_to, _tokenId);

        allTokensIndex[_tokenId] = allTokens.length;
        allTokens.push(_tokenId);
    }

    /**
    * @dev Internal function to burn a specific token
    * Reverts if the token does not exist
    * @param _owner owner of the token to burn
    * @param _tokenId uint256 ID of the token being burned by the msg.sender
    */
    function _burn(address _owner, uint256 _tokenId) internal {
        super._burn(_owner, _tokenId);

        // Clear metadata (if any)
        if (bytes(tokenURIs[_tokenId]).length != 0) {
            delete tokenURIs[_tokenId];
        }

        // Reorg all tokens array
        uint256 tokenIndex = allTokensIndex[_tokenId];
        uint256 lastTokenIndex = allTokens.length.sub(1);
        uint256 lastToken = allTokens[lastTokenIndex];

        allTokens[tokenIndex] = lastToken;
        allTokens[lastTokenIndex] = 0;

        allTokens.length--;
        allTokensIndex[_tokenId] = 0;
        allTokensIndex[lastToken] = tokenIndex;
    }
    //
    // ADDONS
    //
    event MintFinished();
    bool public mintingFinished = false;
    mapping (address => Token[]) public harvestToken;
    mapping (address => uint256) public harvestTokenIndex;
    Token[] tokens;
    
    struct Token {
        address mintedBy;
        uint64 mintedAt;
        address harvest;
    }
    
    modifier canMint() {
        require(!mintingFinished);
        _;
    }

    /**
    * @dev Function to mint tokens
    * @param _to The address that will receive the minted tokens.
    
    * @return A boolean that indicates if the operation was successful.
    */
    function mint(address _to) canMint public returns (bool) {
        uint256 tokenId = allTokens.length;
        _mint(_to, tokenId);
        Token memory token = Token({
            mintedBy: msg.sender,
            mintedAt: uint64(now),
            harvest: _to
        });
        
        tokenId = tokens.push(token) - 1;
        harvestToken[_to].push(token);
        // harvestTokenIndex[_to] += 1;
        
        
        return true;
    }
    
    function mintMany(address _to, uint _amount) canMint public returns (bool){
        
        for(uint i; i < _amount; i++){
            uint256 tokenId = allTokens.length;
            _mint(_to, tokenId);
            Token memory token = Token({
                mintedBy: msg.sender,
                mintedAt: uint64(now),
                harvest: _to
            });
            
            tokenId = tokens.push(token) - 1;
            harvestToken[_to].push(token);
           
        }
        return true;
    }

    /**
    * @dev Function to stop minting new tokens.
    * @return True if the operation was successful.
    */
    function finishMinting() onlyOwner canMint public returns (bool) {
        mintingFinished = true;
        emit MintFinished();
        return true;
    }
    
    function getToken(uint256 _tokenId) external view returns (address mintedBy, uint64 mintedAt, address fromHarvest) {
        Token memory token = tokens[_tokenId];
    
        mintedBy = token.mintedBy;
        mintedAt = token.mintedAt;
        fromHarvest = token.harvest;
    }
    
    function tokensOfOwner(address _owner) external view returns (uint256[]) {
        uint256 balance = balanceOf(_owner);
    
        if (balance == 0) {
            return new uint256[](0);
        } else {
            return ownedTokens[_owner];
        }
    }
}
