//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// @author: kaanfkennedy 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FPNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    string private BASE_URI;
    
    uint256 constant public MINT_PRICE = 0.005 ether;
    uint256 constant public TOTAL_SUPPLY = 1923;
    uint256 constant public MAX_MINT_COUNT_PER_TX = 5;
    uint256 constant public MAX_MINT_COUNT_PER_ADRESS = 15;

    address constant private developer = 0x73104A982DcF9E22633C9852A5125DAc881DEa22;
    
    mapping(address => uint256) private countOfNFTs;

    constructor(string memory name, string memory symbol, string memory baseURI_) ERC721(name, symbol) {
        BASE_URI = baseURI_;
        _tokenIdCounter.increment();
    }

    function publicSaleMint(uint256 _countOfNFT) public payable {
        require(msg.value >= (_countOfNFT * MINT_PRICE), "Not enough balance");
        require(_countOfNFT <= MAX_MINT_COUNT_PER_TX, "Not allowed count per tx");
        require(balanceOf(msg.sender) <= MAX_MINT_COUNT_PER_ADRESS, "REACHED TO MAX MINT COUNT PER ACCOUNT");
        require((currentSupply() + _countOfNFT) <= TOTAL_SUPPLY, "Reached to total supply");

        for(uint256 x = 0; x<_countOfNFT; x++) {
            mintInternal();
        }
    }   

    function mintInternal() internal {
        uint256 _tokenID = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, _tokenID);
    }
    
    function tokensOfOwner(address _owner, uint startId, uint endId) external view returns(uint256[] memory ) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 index = 0;

            for (uint256 tokenId = startId; tokenId <= endId; tokenId++) {
                if (index == tokenCount) break;

                if (ownerOf(tokenId) == _owner) {
                    result[index] = tokenId;
                    index++;
                }
            }

            return result;
        }
    }
    
    
    function _withdraw(address _address, uint256 _amount) private {
        (bool success, ) = _address.call{value: _amount}("");
        require(success, "Transfer failed.");
    }

    function currentSupply() public view returns(uint256) {
        return _tokenIdCounter.current() - 1;
    }

    function setBaseURI(string memory newBaseURI_) public onlyOwner {
        BASE_URI = newBaseURI_;
    }
    
    function _baseURI() internal view override returns(string memory) {
        return BASE_URI;
    }
}