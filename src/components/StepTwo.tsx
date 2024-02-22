import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import DataGrid from "./DataGrid";
import BasicTooltip from "./Tooltip";

export default function StepTwo(props) {
	const { project } = props;
	const [gridData, setGridData] = useState([]);

	const handleDataChange = (data) => {
		setGridData(data);
	};

	// console.log(project);
	return (
		<div>
			<Stack direction="column">
				<Stack className="flex justify-center text-center p-2" style={{ backgroundColor: "#ef860a" }}>
					<Typography variant="h6">Step Two</Typography>
					<Typography variant="h6">Annual Cost/Revenue Data By Alternative</Typography>
					<Typography variant="body1">Provide the annual value costs and revenues for each alternative.</Typography>
				</Stack>

				{/*Data table */}

				<Stack className="flex justify-center text-center p-10 ">
					<Stack direction="column" className="ml-auto">
						<span>
							<Button
								variant="contained"
								className=""
								onClick={() => {
									console.log(gridData);
								}}
							>
								Reset Table
							</Button>
							<BasicTooltip title="text" />
						</span>
						<br />
					</Stack>
					<DataGrid noOfAlts={project?.alts} years={project?.studyPeriod} handleDataChange={handleDataChange} />
					<br />
					<Stack direction="column" className="ml-auto">
						<span>
							<Button
								variant="contained"
								className=""
								onClick={() => {
									console.log(gridData);
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
