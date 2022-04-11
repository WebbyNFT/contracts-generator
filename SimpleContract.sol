// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestContract is ERC721A, Ownable {

    string public metadataBaseURL;

    uint256 public nftPerAddressLimit = 3;

    uint256 public constant price = 0.120 ether; 
    
    uint256 public constant maxSupply = 3500; 

    constructor() ERC721A("Merk", "mrk") {}

    function getTotalSupply() public view returns (uint256) {
        return totalSupply();
    }

    function setBaseURI(string memory baseURL) external onlyOwner {
        metadataBaseURL = baseURL;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return metadataBaseURL;
    }

    function mint(uint256 numOfTokens) external payable {
        require(
            totalSupply() + numOfTokens > maxSupply,
            "Max supply reached"
        );
        require(numOfTokens > 0, "You must mint at least one token");

        _safeMint(msg.sender, numOfTokens);
    }

    function withdraw() external onlyOwner {
        uint256 _balance = address(this).balance;
        address payable _sender = payable(_msgSender());
        _sender.transfer(_balance);
    }
}