import { Button } from "@mui/material";
import { abi } from "../contractData/abi.ts";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { NotificationContainer } from "react-notifications";
import { createTypedERC2612Data, splitSignatureToRSV } from "./SignExport.js";

import { showErrorMessage, showSuccessMessage } from "./Notification.js";
import { abiToken } from "@/contractData/abiToken.ts";

import {
	addressERC20,
	addressERC721,
	RelayerPrivateKey,
} from "@/contractData/addresses.ts";

const SignButton = () => {
	const { library, active, account } = useWeb3React();

	const handleClick = () => {
		if (active) {
			const init = async () => {
				const contract = new ethers.Contract(
					addressERC721,
					abi,
					library
				);

				const contractToken = new ethers.Contract(
					addressERC20,
					abiToken,
					library
				);

				//Relayer
				let signer1 = library.getSigner();
				const wallet = new ethers.Wallet(RelayerPrivateKey, library);

				//Getting sepolia chainID
				const network = await library.getNetwork();
				console.log(network.chainId);

				async function signERC2612Permit(
					token,
					owner,
					spender,
					value,
					deadline,
					nonce,
					signer
				) {
					const message = {
						owner,
						spender,
						value,
						nonce,
						deadline,
					};

					const domain = {
						name: "MyToken",
						version: "1",
						chainId: network.chainId,
						verifyingContract: contractAddress,
					};

					const typedData = createTypedERC2612Data(message, domain);

					console.log(typedData);

					const rawSignature = await signer._signTypedData(
						typedData.domain,
						typedData.types,
						typedData.message
					);

					const sig = splitSignatureToRSV(rawSignature);

					return { ...sig, ...message };
				}

				//huge number
				const deadline = 1762302711;

				//NFT contract address
				const spender = addressERC721;

				//ERC20 Token address in sepolia network
				const contractAddress = addressERC20;

				//
				const nonces = await contractToken.nonces(account);
				const value = await contract.currentPrice();

				try {
					const sign = await signERC2612Permit(
						contractAddress,
						account,
						spender,
						value,
						deadline,
						nonces,
						signer1
					);

					const mintTx = await contract
						.connect(wallet)
						.safeMint(
							sign.owner,
							sign.spender,
							sign.value,
							sign.deadline,
							sign.v,
							sign.r,
							sign.s,
							{ gasLimit: 500000 }
						);
					const submitedTx = await mintTx.wait();
					console.log(submitedTx.status);
					if (submitedTx.status == 1) {
						showSuccessMessage("Success");
					}
				} catch (err) {
					showErrorMessage(err.code);
				}
			};
			init();
		}
	};
	return (
		<section>
			<Button variant="contained" onClick={handleClick}>
				Sign
			</Button>
			<NotificationContainer />
		</section>
	);
};

export default SignButton;
