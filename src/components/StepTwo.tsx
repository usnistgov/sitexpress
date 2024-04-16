import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { E3Request, toE3Object } from "../data/E3Request";
import { Project } from "../data/Formats";
import Alerts from "./Alert";
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

export default function StepTwo(props: { project: Project; getResults: any }) {
	const { project, getResults } = props;
	const [gridData, setGridData] = useState([]);
	const [open, setOpen] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [errorTypes, setErrorTypes] = useState([]);
	const alertRef = useRef();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const validateInput = (project: Project) => {
		let errorTypes = new Set();
		let flag = true;
		if (project.projectName.length === 0) {
			errorTypes.add("name");
			flag = false;
		}
		if (project.alts < 1) {
			errorTypes.add("alts");
			flag = false;
		}
		if (project.studyPeriod < 1) {
			errorTypes.add("studyPeriod");
			flag = false;
		}
		if (project.dollarValue === "constant") {
			if (project.realDR < 0 || typeof project.realDR === "string") {
				errorTypes.add("realDR");
				flag = false;
			}
		} else {
			if (typeof project.realDR === "string") {
				errorTypes.add("nominalDR");
				flag = false;
			}
			if (typeof project.inflationRate === "string") {
				errorTypes.add("inflationRate");
				flag = false;
			}
		}

		let costArray = project.costs;
		for (let cost of costArray) {
			if (cost.cost.includes("") || cost.revenue.includes("")) {
				flag = false;
				errorTypes.add("costs");
			}
		}
		return [errorTypes, flag];
	};
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

	const displayAlert = (bool: boolean) => {
		setShowAlert(bool);
	};
	// @ts-ignore
	const executeScroll = () => alertRef?.current.scrollIntoView({ behavior: "smooth", inline: "nearest" });

	useEffect(() => {
		if (errorTypes.length > 0) displayAlert(true);
		executeScroll();
	}, [errorTypes]);

	return (
		<Stack direction="column">
			{/* @ts-ignore */}
			<Stack ref={alertRef} className="flex justify-center text-center p-2 bg-sit-orange">
				<Typography variant="h6">Step Two</Typography>
				<Typography variant="h6">Annual Cost/Revenue Data By Alternative</Typography>
				<Typography variant="body1">Provide the annual value costs and revenues for each alternative.</Typography>
			</Stack>
			{/*Data table */}
			{/* @ts-ignore */}
			{showAlert ? <Alerts errorTypes={errorTypes} showAlert={displayAlert} /> : ""}
			<Stack className="flex justify-center text-center p-10 ">
				<Stack direction="column" className="ml-auto">
					<Stack direction="row">
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
									Are you sure you want to clear the table?
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									You will lose all your entered data.
								</Typography>
								<br />
								<Stack direction="row" className="flex justify-around">
									<Button variant="contained" className="" onClick={handleReset} color="error">
										Clear
									</Button>
									<Button variant="contained" className="" onClick={handleClose}>
										Keep
									</Button>
								</Stack>
							</Box>
						</Modal>
						<BasicTooltip title="Resets the table" />
					</Stack>
					<br />
				</Stack>
				<DataGrid
					noOfAlts={project?.alts}
					years={project?.studyPeriod}
					names={project?.altNames}
					handleDataChange={handleDataChange}
					ref={gridRef}
				/>
				<br />
				<Stack direction="column" className="ml-auto">
					<Stack direction="row">
						<Button
							variant="contained"
							className=""
							onClick={async () => {
								try {
									const [errorTypes, validity] = validateInput(project);
									// @ts-ignore
									setErrorTypes(Array.from(errorTypes));
									if (validity) {
										setShowAlert(false);
										const obj = toE3Object(project);
										const res = await E3Request(obj);
										getResults(res);
									}
								} catch (err) {
									console.log("error", err);
								}
							}}
						>
							Run Results
						</Button>
						<BasicTooltip title="Calculates Net Present Value, Internal Rate of Return, and payback period." />
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
}
