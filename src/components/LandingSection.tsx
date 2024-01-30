import { Grid, Typography } from "@mui/material";

export default function LandingSection() {
	return (
		<Grid container style={{ border: "1px solid black" }}>
			<Grid xs={4} style={{ border: "1px solid red" }}>
				<Typography variant="h2" gutterBottom>
					SITExpress
				</Typography>
				<Typography variant="h3" gutterBottom>
					For Project Investment Analysis
				</Typography>
				<Typography variant="h3" gutterBottom>
					Powered by E3 https://e3.nist.gov/
				</Typography>
			</Grid>
			<Grid xs={8} style={{ border: "1px solid yellow" }}>
				<Typography variant="h4" className="rectangleText">
					Smart Investment Tool Express (SITExpress) completes investment analysis based on NIST Advanced Manufacturing
					Series 200-5 to identify economical projects/investments.
				</Typography>
				<br />
				<Typography variant="h4" className="rectangleText2">
					Calculated metrics include: <br />
					Net Present Value (NPV) <br />
					Internal Rate of Return (IRR) <br />
					Payback Period (PBP)
				</Typography>
			</Grid>
		</Grid>
	);
}
