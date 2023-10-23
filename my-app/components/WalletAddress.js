const { Typography } = require("@mui/material");
const { useWeb3React } = require("@web3-react/core");

const WalletAddress = () => {
	const { account, active } = useWeb3React();
	console.log(typeof { account });
	let output = account;
	if (active) {
		output = account.substring(0, 5) + "..." + account.substring(38, 42);
	}

	return <Typography>{output}</Typography>;
};

export default WalletAddress;
