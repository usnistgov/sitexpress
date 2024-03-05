import { Button, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { E3Request, toE3Object } from "../data/E3Request";
import DataGrid from "./DataGrid";
import BasicTooltip from "./Tooltip";

export default function StepTwo(props) {
	const { project } = props;
	const [gridData, setGridData] = useState([]);

	const transformTableData = (data, alts = 3) => {
		let inputObject = [...data];
		inputObject.shift(); // remove first row (header)

		const resultArray: { name: string; cost: string[]; revenue: string[] }[] = [];
		for (let i = 0; i <= alts; i++) {
			resultArray.push({
				name: i === 0 ? `base` : `alt${i}`,
				cost: [],
				revenue: [],
			});
		}

		// Loop through each entry in the data
		inputObject.forEach((entry) => {
			resultArray[0].cost.push(entry["base-cost"]);
			resultArray[0].revenue.push(entry["base-rev"]);
		});
		for (let j = 0; j < resultArray.length; j++) {
			inputObject.forEach((entry) => {
				for (const property in entry) {
					if (entry.hasOwnProperty(property)) {
						if (property.startsWith(`alt${j}-cost`)) {
							resultArray[j].cost.push(entry[`alt${j}-cost`]);
						} else if (property.startsWith(`alt${j}-rev`)) {
							resultArray[j].revenue.push(entry[`alt${j}-rev`]);
						}
					}
				}
			});
		}
		return resultArray;
	};

	const handleDataChange = (data) => {
		setGridData(data);
		const transformedArray = transformTableData(data, project.alts);
		project.costs = transformedArray;
	};

	const gridRef = useRef();
	const handleReset = () => {
		gridRef?.current.handleReset();
		setGridData([]);
	};
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
							<Button variant="contained" className="" onClick={handleReset}>
								Reset Table
							</Button>
							<BasicTooltip title="text" />
						</span>
						<br />
					</Stack>
					<DataGrid
						noOfAlts={project?.alts}
						years={project?.studyPeriod}
						handleDataChange={handleDataChange}
						ref={gridRef}
					/>
					<br />
					<Stack direction="column" className="ml-auto">
						<span>
							<Button
								variant="contained"
								className=""
								onClick={() => {
									const obj = toE3Object(project);
									console.log(obj);
									// E3Request();
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
