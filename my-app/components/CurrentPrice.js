import { Grid } from "@mui/material";
import { ethers } from "ethers";
import { abi } from "../contractData/abi.ts";
import { abiToken } from "@/contractData/abiToken.ts";
import { urlSepolia } from "../contractData/url.ts";
import { addressERC20, addressERC721 } from "@/contractData/addresses.ts";

import { useEffect, useState } from "react";

const CurrentPrice = () => {
	const [val, setVal] = useState();
	const provider = new ethers.providers.JsonRpcProvider(urlSepolia);
	useEffect(() => {
		const init = async () => {
			const contractERC721 = new ethers.Contract(
				addressERC721,
				abi,
				provider
			);
			const contractERC20 = new ethers.Contract(
				addressERC20,
				abiToken,
				provider
			);

			const currentPrice = await contractERC721.currentPrice();
			const symbol = await contractERC20.symbol();
			const str = `${currentPrice} ${symbol}`;
			setVal(str);
		};
		init();
	});
	return <Grid>Price: {val}</Grid>;
};
export default CurrentPrice;
