/// <reference types="vite-plugin-svgr/client" />
import { Link, List, ListItem, ListItemText, ListSubheader, Stack, Typography } from "@mui/material";
import Logo from "../SITExpress_logo.svg?react";

export default function LandingSection() {
	return (
		<Stack direction="column" className="bg-gray-50">
			<Stack className="p-2">
				<div className="logo w-2/3 ml-auto mr-auto">
					<Logo />
				</div>

				<br />
				<Typography className="ml-auto text-center" variant="h5" gutterBottom>
					<Link href="https://e3.nist.gov/" underline="none" color="inherit" target="_blank" rel="noopener">
						Powered by E3
					</Link>
				</Typography>
			</Stack>
			<br />
			<Stack direction="row" className="p-2 flex text-center ">
				<div className="w-1/5"></div>
				<div className="w-1/5">
					<Typography variant="h5" gutterBottom>
						For Project Investment Analysis
					</Typography>
					<Typography variant="body1" className="text-center">
						Smart Investment Tool Express (SITExpress) completes investment analysis based on NIST Advanced
						Manufacturing Series <br /> 200-5 to identify economical projects/investments.
					</Typography>
				</div>
				<div className="w-1/5"></div>
				<div className="w-1/5">
					<Typography variant="h5">Calculated metrics include:</Typography>
					<List dense>
						<ListItem className="flex flex-col">
							<ListItemText primary="Net Present Value (NPV)" />
						</ListItem>
						<ListItem className="flex flex-col">
							<ListItemText primary="Internal Rate of Return (IRR)" />
						</ListItem>
						<ListItem className="flex flex-col">
							<ListItemText primary="Payback Period (PBP)" />
						</ListItem>
					</List>
				</div>
			</Stack>
		</Stack>
	);
}
