import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { Typography } from "@mui/material";
import MintGrid from "@/components/MintGrid";
import SignButton from "@/components/Sign";
import ResponsiveAppBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<div className={`${styles.container} ${inter.className}`}>
			<ResponsiveAppBar />
			<main className={`${styles.main}`}>
				<h1 className={`${styles.title} `}>
					<Typography
						variant="poster"
						sx={{
							mr: 2,

							fontFamily: "monospace",
							fontWeight: 800,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Gaseless Mint
					</Typography>
				</h1>
				<MintGrid />
				<SignButton />
			</main>
		</div>
	);
}
