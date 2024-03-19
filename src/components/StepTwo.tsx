import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { E3Request, toE3Object } from "../data/E3Request";
import DataGrid from "./DataGrid";
import BasicTooltip from "./Tooltip";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

// @ts-ignore
export default function StepTwo(props) {
	const { project, getResults } = props;
	const [gridData, setGridData] = useState([]);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// @ts-ignore
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

	// @ts-ignore
	const handleDataChange = (data) => {
		setGridData(data);
		const transformedArray = transformTableData(data, project.alts);
		project.costs = transformedArray;
	};

	const gridRef = useRef();
	const handleReset = () => {
		// @ts-ignore
		gridRef?.current.handleReset();
		setGridData([]);
		handleClose();
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
							<Button variant="contained" className="reset-btn" onClick={handleOpen}>
								<RefreshIcon className="" fontSize="small" />
							</Button>

							<Modal
								open={open}
								onClose={handleClose}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description"
							>
								<Box sx={style}>
									<Typography id="modal-modal-title" variant="h6" component="h2">
										Are you sure you want to reset the table?
									</Typography>
									<Typography id="modal-modal-description" sx={{ mt: 2 }}>
										You will lose all your entered data.
									</Typography>
									<br />
									<span className="flex justify-around">
										<Button variant="contained" className="" onClick={handleReset} color="error">
											Yes
										</Button>
										<Button variant="contained" className="" onClick={handleClose}>
											No
										</Button>
									</span>
								</Box>
							</Modal>
							<BasicTooltip title="Resets the table" />
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
								onClick={async () => {
									const obj = toE3Object(project);
									const res = await E3Request(obj);
									getResults(res);
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
