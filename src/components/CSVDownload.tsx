import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import { Cost, Project, Result } from "../data/Formats";

function CSVDownload(props: { project: Project; tableData: Result[] }) {
	const { project, tableData } = props;

	let stepOneData = [
		["Project Name", project?.projectName],
		["Project Description", project?.projectDesc],
		["Number of Alternatives", project?.alts],
		["Study Period", project?.studyPeriod],
		["Dollar Value", project?.dollarValue],
	];

	if (project?.dollarValue === "constant") stepOneData.push(["Real Discount Rate", project?.realDR]);
	else stepOneData.push(["Inflation Rate", project?.realDR], ["Nominal Discount Rate", project?.nominalDR]);

	const inputHeaders = (alts: number): string[] => {
		const defaultCol = ["Year"];

		for (let i = 0; i <= alts; i++) {
			if (i === 0) {
				defaultCol.push(project?.altNames?.["alt0"] || "Base Case");
				defaultCol.push("");
			} else {
				// @ts-ignore
				defaultCol.push(project?.altNames?.[`alt${i}`] || `Alternative ${i}`);
				defaultCol.push("");
			}
		}

		return defaultCol;
	};

	let inputData = (data: Cost[]) => {
		let result = [];
		for (let i = 0; i < data[0].cost.length; i++) {
			const row = [];
			i === 0 ? row.push("Initial Investment") : row.push(i);
			for (let j = 0; j < data.length; j++) {
				row.push(data[j].cost[i]);
				row.push(data[j].revenue[i]);
			}
			result.push(row);
		}
		return result;
	};

	const resultsData = (res: Result[]) => {
		let results: (string | number | String)[][] = [];
		res.forEach((data) => results.push(Array.from(Object.values(data))));
		return results;
	};

	let csvData = [
		["Project Information"],
		[],
		...stepOneData,
		[],
		[],
		["Annual Cost/Revenue Data By Alternative"],
		[],
		inputHeaders(3),
		...inputData(project?.costs),
		[],
		[],
		["Results"],
		[],
		[
			"",
			"Present Value ($)",
			"Net Present Value ($)",
			"IRR (%)",
			"Payback Period (Years)",
			"Discounted Payback (Years)",
			"BCR",
		],
		...resultsData(tableData),
	];

	return (
		<CSVLink data={csvData} filename={"sitexpress.csv"} target="_blank">
			<Button
				startIcon={<FileDownloadIcon className="cursor-pointer text-white rounded" fontSize="large" />}
				variant="contained"
			>
				CSV
			</Button>
		</CSVLink>
	);
}

export default CSVDownload;
