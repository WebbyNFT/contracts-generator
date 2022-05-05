const contract = (data) => {
  return `// SPDX-License-Identifier: MIT
  
  pragma solidity ^0.8.0;
  
  import "@openzeppelin/contracts/access/Ownable.sol";
  import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
  import "erc721a/contracts/ERC721A.sol";
  
  contract ${data?.contractName} is ERC721A, Ownable {
      string public metadataBaseURL = "${data?.metadataUrl}";
  
      uint256 public nftPerAddressLimit = ${data?.nftPerAddress};
  
      uint256 public price = ${data?.price} ether; 
  
      uint256 public maxSupply = ${data?.maxSupply}; 
      
      bool public paused = false;

      bool public isPublicMint = false;

      bytes32 public merkleRoot =
        ${data?.merkleRoot};
  
      mapping(address => uint256) public mintedBalance;
  
      constructor() ERC721A("${data?.collectionName}", "${data?.collectionSymbol}") {}
  
      function setPrice(uint256 _price) external onlyOwner {
          price = _price;
      }
  
      function setBaseURI(string memory _baseURL) external onlyOwner {
          metadataBaseURL = _baseURL;
      }
  
      function setmaxSupply(uint256 _amount) external onlyOwner {
          maxSupply = _amount;
      }
  
      function setMaxPerWallet(uint256 _amount) external onlyOwner {
          nftPerAddressLimit = _amount;
      }
  
      function pause(bool _state) public onlyOwner {
          paused = _state;
      }
  
      function getMaxPerWallet() internal view returns (uint256) {
          return nftPerAddressLimit;
      }

      function whitelistMint(bytes32[] calldata _merkleProof, uint256 numOfTokens)
        external
        payable
      {
        require(!paused, "Minting is paused");
        require(numOfTokens > 0, "You must mint at least one token");
        require(price * numOfTokens <= msg.value, "Not enough funds");
        require(
            mintedBalance[msg.sender] + numOfTokens <= nftPerAddressLimit,
            "Nft per adress limit exceeded"
        );

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Your address is not whitelisted"
        );

        for (uint256 i = 0; i < numOfTokens; i++) {
            mintedBalance[msg.sender]++;
        }

        _safeMint(msg.sender, numOfTokens);
      }
  
      function publicMint(uint256 numOfTokens) external payable {
        require(!paused, "Minting is paused");
        require(isPublicMint, "Public mint is not available now");
        require(totalSupply() + numOfTokens < maxSupply, "Max supply reached");
        require(numOfTokens > 0, "You must mint at least one token");
        require(price * numOfTokens <= msg.value, "Not enough funds");
        require(
            mintedBalance[msg.sender] + numOfTokens <= nftPerAddressLimit,
            "Nft per adress limit exceeded"
        );

        for (uint256 i = 0; i < numOfTokens; i++) {
            mintedBalance[msg.sender]++;
        }

        _safeMint(msg.sender, numOfTokens);
      }
  
      function withdraw() external onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os, "Error when trying to withdraw");
      }
  }`;
};

export default contract;
