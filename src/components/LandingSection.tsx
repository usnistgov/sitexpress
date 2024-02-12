import { Link, List, ListItem, ListItemText, ListSubheader, Stack, Typography } from "@mui/material";
import logo from "../logo.png";

export default function LandingSection() {
	return (
		<Stack direction="column" className="bg-sky-500">
			<Stack className="text-center p-2">
				{/* <Typography className="italic" variant="h2" gutterBottom>
					SITExpress
				</Typography> */}
				<img src={logo} className="m-auto w-1/2" />
				<br />
				<Typography variant="h4" gutterBottom>
					For Project Investment Analysis
				</Typography>

				<Typography variant="h5" gutterBottom>
					Powered by E3 <br />
					<Link href="https://e3.nist.gov/" underline="none" color="inherit" target="_blank" rel="noopener">
						https://e3.nist.gov/
					</Link>
				</Typography>
			</Stack>
			<Stack className="p-2 flex text-center">
				<Typography variant="h5" className="text-center">
					Smart Investment Tool Express (SITExpress) completes investment analysis based on NIST Advanced Manufacturing
					Series 200-5 to identify economical projects/investments.
				</Typography>
				<br />
				<div className="text-center">
					<Typography variant="h5">Calculated metrics include:</Typography>
					<List dense className="">
						<ListItem className="flex flex-col justify-center">
							<ListItemText primary="Net Present Value (NPV)" />
						</ListItem>
						<ListItem className="flex flex-col justify-center">
							<ListItemText primary="Internal Rate of Return (IRR)" />
						</ListItem>
						<ListItem className="flex flex-col justify-center">
							<ListItemText primary="Payback Period (PBP)" />
						</ListItem>
					</List>
				</div>
			</Stack>
		</Stack>
	);
}
