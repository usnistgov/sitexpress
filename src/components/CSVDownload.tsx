import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import { Cost, Project, Result } from "../data/Formats";

function CSVDownload(props: { project: Project; tableData: Result[]; headers: { label: string; key: string } }) {
	const { project, tableData, headers } = props;

	let stepOneData = [
		["Project Name", project?.projectName],
		["Project Description", project?.projectDesc],
		["Number of Alternatives", project?.alts],
		["Study Period", project?.studyPeriod],
		["Dollar Value", project?.dollarValue],
	];

	console.log(headers);

	if (project?.dollarValue === "constant") stepOneData.push(["Real Discount Rate", project?.realDR]);
	else stepOneData.push(["Inflation Rate", project?.realDR], ["Nominal Discount Rate", project?.nominalDR]);

	const inputHeaders = (alts: number) => {
		const defaultCol = ["Year", "Base Cost", "", "Alternative 1", ""];

		for (let i = 2; i <= alts; i++) {
			defaultCol.push(`Alternative ${i}`);
			defaultCol.push("");
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

	const resultHeaders = (header: { label: string; key: string }[]) => {
		let headers: string[] = [];
		header.forEach((head) => {
			headers.push(head.label);
		});
		return headers;
	};

	const resultsData = (res: Result[]) => {
		let results: (string | number | String)[] = [];
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
		resultHeaders(headers),
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
