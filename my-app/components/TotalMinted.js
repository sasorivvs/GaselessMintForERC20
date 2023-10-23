import { Grid } from "@mui/material";
import { ethers } from "ethers";
import { abi } from "../contractData/abi.ts";
import { urlSepolia } from "../contractData/url.ts";
import { addressERC721 } from "@/contractData/addresses.ts";

import { useEffect, useState } from "react";

const TotalMinted = () => {
	const [val, setVal] = useState();
	const provider = new ethers.providers.JsonRpcProvider(urlSepolia);
	useEffect(() => {
		const init = async () => {
			const contract = new ethers.Contract(addressERC721, abi, provider);
			console.log(contract);
			const totalSupplyOut = await contract.totalMinted();
			setVal(totalSupplyOut.toString());
			console.log(totalSupplyOut);
		};
		init();
	});
	return <Grid>Total Minted: {val}</Grid>;
};
export default TotalMinted;
