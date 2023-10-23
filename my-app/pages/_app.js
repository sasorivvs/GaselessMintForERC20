import "@/styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";

import { Web3Provider } from "@ethersproject/providers";
// import your favorite web3 convenience library here

function getLibrary(provider, connector) {
	return new Web3Provider(provider); // this will vary according to whether you use e.g. ethers or web3.js
}

export default function App({ Component, pageProps }) {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Component {...pageProps} />
		</Web3ReactProvider>
	);
}
