import { Stack, Typography } from "@mui/material";
import DataGrid from "./DataGrid";

export default function StepTwo() {
	return (
		<div>
			{/*Section Header Rectangle */}
			<Stack direction="row">
				<Stack className="flex justify-center text-center p-2 w-1/3 max-w-1/3 bg-orange-400">
					<Typography variant="h6">Step Two</Typography>
					<Typography variant="h6">Annual Cost/ Revenue Data By Alternative</Typography>
					<Typography variant="body1">Provide the annual values costs and revenues for each alternative</Typography>
				</Stack>

				{/*Data table */}
				<Stack className="flex justify-center text-center p-10 ">
					<DataGrid noOfAlts={2} />
				</Stack>
			</Stack>
		</div>
	);
}
