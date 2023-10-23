// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IERC20Permit.sol";

contract ERC721Context is ERC721 {
    IERC20Permit public _token;
    address private _trustedForwarder;
    uint256 private _nextTokenId = 1;
    address private _initialOwner;
    uint256 private _currentPrice;

    constructor(
        address trustedForwarder, // Initialize trusted forwarder
        address token, // Initialize ERC20 token for pay
        address initialOwner,
        uint256 price
    ) ERC721("NFT", "NFT") {
        _trustedForwarder = trustedForwarder;
        _token = IERC20Permit(token);
        _initialOwner = initialOwner;
        _currentPrice = price;
    }

    function currentPrice() public view returns (uint) {
        return _currentPrice;
    }

    function changePrice(uint _newPrice) external {
        require(msg.sender == _initialOwner);
        _currentPrice = _newPrice;
    }

    function totalMinted() public view returns (uint) {
        return _nextTokenId - 1;
    }

    function withdraw() public {
        require(msg.sender == _initialOwner);
        uint value = _token.balanceOf(address(this));
        _token.transfer(_initialOwner, value);
    }

    function safeMint(
        address owner,
        address spender,
        uint value,
        uint deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public {
        require(msg.sender == _trustedForwarder, "Not a Relayer");
        require(spender == address(this), "Invalid spender");
        require(value == currentPrice(), "Invalid value");
        require(deadline >= block.timestamp, "Signature expired");
        _token.permit(owner, spender, value, deadline, v, r, s);
        _token.transferFrom(owner, address(this), value);

        uint256 tokenId = _nextTokenId++;
        _safeMint(owner, tokenId);
    }
}
