import { Grid } from "@mui/material";
import MetaMaskButton from "@/components/MetaMaskButton";
import WalletAddress from "@/components/WalletAddress";

const ConnectWalletGrid = () => {
	return (
		<Grid
			container
			justifyContent={"center"}
			rowSpacing={1}
			columnSpacing={{ xs: 1, sm: 2, md: 3 }}
		>
			<Grid item>
				<MetaMaskButton />
			</Grid>
			<Grid item>
				<WalletAddress />
			</Grid>
		</Grid>
	);
};

export default ConnectWalletGrid;
