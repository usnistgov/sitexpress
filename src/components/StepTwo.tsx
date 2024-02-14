import { Button, Stack, Typography } from "@mui/material";
import DataGrid from "./DataGrid";
import BasicTooltip from "./Tooltip";

export default function StepTwo() {
	return (
		<div>
			{/*Section Header Rectangle */}
			<Stack direction="column">
				<Stack className="flex justify-center text-center p-2" style={{ backgroundColor: "#ef860a" }}>
					<Typography variant="h6">Step Two</Typography>
					<Typography variant="h6">Annual Cost/Revenue Data By Alternative</Typography>
					<Typography variant="body1">Provide the annual value costs and revenues for each alternative.</Typography>
				</Stack>

				{/*Data table */}

				<Stack className="flex p-10 text-center">
					<DataGrid noOfAlts={2} />
					<br />
					<Stack direction="column" className="ml-auto">
						<span>
							<Button
								variant="contained"
								className=""
								onClick={() => {
									console.log("Running results");
								}}
							>
								Run Results
							</Button>
							<BasicTooltip title="text" />
						</span>
					</Stack>
				</Stack>
			</Stack>
		</div>
	);
}
