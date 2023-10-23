import { loadFixture, ethers, SignerWithAddress, expect } from "./setup";
import type { MyToken, Proxy } from "../typechain-types";
import { int } from "hardhat/internal/core/params/argumentTypes";

interface ERC2612PermitMessage {
	owner: string;
	spender: string;
	value: number | string;
	nonce: number | string;
	deadline: number | string;
}

interface RSV {
	r: string;
	s: string;
	v: number;
}

interface Domain {
	name: string;
	version: string;
	chainId: number;
	verifyingContract: string;
}

function createTypedERC2612Data(message: ERC2612PermitMessage, domain: Domain) {
	return {
		types: {
			Permit: [
				{ name: "owner", type: "address" },
				{ name: "spender", type: "address" },
				{ name: "value", type: "uint256" },
				{ name: "nonce", type: "uint256" },
				{ name: "deadline", type: "uint256" },
			],
		},
		primaryType: "Permit",
		domain,
		message,
	};
}

function splitSignatureToRSV(signature: string): RSV {
	const r = "0x" + signature.substring(2).substring(0, 64);
	const s = "0x" + signature.substring(2).substring(64, 128);
	const v = parseInt(signature.substring(2).substring(128, 130), 16);

	return { r, s, v };
}

async function signERC2612Permit(
	token: string,
	owner: string,
	spender: string,
	value: string | number,
	deadline: number,
	nonce: number,
	signer: SignerWithAddress
): Promise<ERC2612PermitMessage & RSV> {
	const message: ERC2612PermitMessage = {
		owner,
		spender,
		value,
		nonce,
		deadline,
	};

	const domain: Domain = {
		name: "MyToken",
		version: "1",
		chainId: 1337,
		verifyingContract: token,
	};

	const typedData = createTypedERC2612Data(message, domain);

	const rawSignature = await signer.signTypedData(
		typedData.domain,
		typedData.types,
		typedData.message
	);

	const sig = splitSignatureToRSV(rawSignature);

	return { ...sig, ...message };
}

describe("MyToken", function () {
	async function deploy() {
		const [initialOwner, user, relayer] = await ethers.getSigners();

		const FactoryERC20 = await ethers.getContractFactory("MyToken");
		const tokenERC20: MyToken = await FactoryERC20.deploy();
		const price = 10;

		const FactoryNFT = await ethers.getContractFactory("ERC721Context");
		const tokenERC721 = await FactoryNFT.deploy(
			relayer.address,
			tokenERC20.target,
			initialOwner.address,
			price
		);

		return { tokenERC20, tokenERC721, initialOwner, user, relayer };
	}

	it("should permit", async function () {
		const { tokenERC20, tokenERC721, initialOwner, user, relayer } =
			await loadFixture(deploy);

		await tokenERC20.connect(initialOwner).mint(user.address, 1000);

		const tokenAddr = await tokenERC20.getAddress();
		const owner = user.address;
		const spender = await tokenERC721.getAddress();
		const amount = 10;
		const deadline = Math.floor(Date.now() / 1000) + 1000;
		const nonce = await tokenERC20.nonces(user);

		const result = await signERC2612Permit(
			tokenAddr,
			owner,
			spender,
			amount,
			deadline,
			Number(nonce),
			user
		);

		const tx = await tokenERC721
			.connect(relayer)
			.safeMint(
				owner,
				spender,
				amount,
				deadline,
				result.v,
				result.r,
				result.s
			);
		await tx.wait();

		const withdrawTx = await tokenERC721.connect(initialOwner).withdraw();

		const changePrice = await tokenERC721
			.connect(initialOwner)
			.changePrice(100);
		await changePrice.wait();
		const priceCurrent = await tokenERC721.currentPrice();
		expect(priceCurrent).to.eq(100);
		await expect(tx).to.changeTokenBalance(tokenERC20, spender, 10);
		await expect(tx).to.changeTokenBalance(tokenERC721, owner, 1);
		await expect(withdrawTx).to.changeTokenBalance(
			tokenERC20,
			initialOwner,
			10
		);
		await expect(withdrawTx).to.changeTokenBalance(
			tokenERC20,
			spender,
			-10
		);
	});
});
