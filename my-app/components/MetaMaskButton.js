import { Button, Container } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NotificationContainer } from "react-notifications";
import { showErrorMessage } from "./Notification";
import { ethers } from "ethers";
const crypto = require("crypto");

const injected = new InjectedConnector({ supportedChainIds: [11155111] });

const MetaMaskButton = () => {
	const { active, activate, deactivate, library, account } = useWeb3React();

	const activateInjectedProvider = () => {
		const init = async () => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			if (active) {
				deactivate(injected);
			} else {
				const signer = provider.getSigner(account);
				try {
					const buf = crypto.randomBytes(32);
					const signature = await signer.signMessage(
						`Random message to connect: 0x${buf.toString("hex")}`
					);
					activate(injected);
				} catch (err) {
					showErrorMessage("Connection Rejected");
				}
			}
		};
		init();
	};
	return (
		<Container>
			<Button
				variant="contained"
				color={active ? "error" : "primary"}
				onClick={activateInjectedProvider}
			>
				{active ? "Disconnect" : "Connect"}
			</Button>
			<NotificationContainer />
		</Container>
	);
};

export default MetaMaskButton;
