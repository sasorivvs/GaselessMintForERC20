import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

async function main() {
	const [initialOwner] = await ethers.getSigners();

	const FactoryNFT = await ethers.getContractFactory("ERC721Context");
	const tokenERC721 = await FactoryNFT.deploy(
		"RelayerAddr",
		"ERC20TokenAddr",
		initialOwner.address,
		10
	);

	console.log("TokenERC721 address: ", tokenERC721.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
