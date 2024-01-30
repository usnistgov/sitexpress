import { Link, List, ListItem, ListItemText, ListSubheader, Stack, Typography } from "@mui/material";

export default function LandingSection() {
	return (
		<Stack direction="row">
			<Stack className="text-center p-2">
				<Typography className="italic" variant="h2" gutterBottom>
					SITExpress
				</Typography>
				<Typography variant="h4" gutterBottom>
					For Project Investment Analysis
				</Typography>

				<Typography variant="h5" gutterBottom>
					Powered by E3
					<Link href="https://e3.nist.gov/" underline="none" color="inherit" target="_blank" rel="noopener">
						https://e3.nist.gov/
					</Link>
				</Typography>
			</Stack>
			<Stack className="p-2 bg-sky-500 flex justify-center">
				<Typography variant="h5" className="text-center">
					Smart Investment Tool Express (SITExpress) completes investment analysis based on NIST Advanced Manufacturing
					Series 200-5 to identify economical projects/investments.
				</Typography>
				<br />

				<Typography variant="h5">Calculated metrics include:</Typography>
				<List dense>
					<ListSubheader></ListSubheader>
					<ListItem>
						<ListItemText primary="Net Present Value (NPV)" />
					</ListItem>
					<ListItem>
						<ListItemText primary="Internal Rate of Return (IRR)" />
					</ListItem>
					<ListItem>
						<ListItemText primary="Payback Period (PBP)" />
					</ListItem>
				</List>
			</Stack>
		</Stack>
	);
}
