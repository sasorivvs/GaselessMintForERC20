function createTypedERC2612Data(message, domain) {
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
function splitSignatureToRSV(signature) {
	const r = "0x" + signature.substring(2).substring(0, 64);
	const s = "0x" + signature.substring(2).substring(64, 128);
	const v = parseInt(signature.substring(2).substring(128, 130), 16);

	return { r, s, v };
}

export { splitSignatureToRSV, createTypedERC2612Data };
