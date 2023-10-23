import { Grid } from "@mui/material";
import CurrentPrice from "./CurrentPrice.js";
import TotalMinted from "./TotalMinted.js";

const MintGrid = () => {
	return (
		<Grid
			container
			spacing={8}
			direction="row"
			justifyContent="center"
			alignItems="center"
		>
			<Grid item>
				<TotalMinted />
			</Grid>
			<Grid item>
				<CurrentPrice />
			</Grid>
		</Grid>
	);
};

export default MintGrid;
