import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

async function main() {
	const [initialOwner] = await ethers.getSigners();

	const FactoryERC20 = await ethers.getContractFactory("MyToken");
	const tokenERC20 = await FactoryERC20.deploy();

	const FactoryNFT = await ethers.getContractFactory("ERC721Context");
	const tokenERC721 = await FactoryNFT.deploy(
		"RelayerAddress",
		tokenERC20.target,
		initialOwner.address,
		10
	);

	console.log(
		"ERC20 token address:",
		tokenERC20.target,
		"TokenERC721 address: ",
		tokenERC721.target
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
