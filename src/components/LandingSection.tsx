/// <reference types="vite-plugin-svgr/client" />
import { Container, Link, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import Logo from "../SITExpress_logo.svg?react";

export default function LandingSection() {
	return (
		<Container>
			<Stack className="p-2">
				<div className="logo w-2/3 ml-auto mr-auto">
					<Logo />
				</div>

				<br />
				<Typography className="e3-heading italic text-right mr-5" variant="h5" gutterBottom>
					<Link href="https://e3.nist.gov/" underline="none" color="inherit" target="_blank" rel="noopener">
						Powered by E3
					</Link>
				</Typography>
			</Stack>
			<Stack direction="row" className="p-2 flex flex-row justify-evenly mb-2">
				<div className="w-2/5 border-2 border-sit-orange p-2">
					<Typography variant="h5" className="text-center" gutterBottom>
						For Project Investment Analysis
					</Typography>
					<Typography variant="body1" className="text-left">
						Smart Investment Tool Express (SITExpress) completes investment analysis based on NIST Advanced
						Manufacturing Series 200-5 to identify economical projects/investments.
					</Typography>
				</div>
				<div className="w-2/5 border-2 border-sit-orange p-2">
					<Typography variant="h5" className="text-center">
						Calculated metrics include:
					</Typography>
					<List dense>
						<ListItem disablePadding>
							<ListItemText primary="Net Present Value (NPV)" />
						</ListItem>
						<ListItem disablePadding>
							<ListItemText primary="Internal Rate of Return (IRR)" />
						</ListItem>
						<ListItem disablePadding>
							<ListItemText primary="Payback Period (PBP)" />
						</ListItem>
					</List>
				</div>
			</Stack>
		</Container>
	);
}
