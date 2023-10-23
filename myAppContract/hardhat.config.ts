import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
	solidity: "0.8.20",
	etherscan: {
		apiKey: "etherscan API",
	},
	networks: {
		sepolia: {
			url: process.env.SEPOLIA_URL,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
		hardhat: {
			chainId: 1337,
		},
	},
};

export default config;
