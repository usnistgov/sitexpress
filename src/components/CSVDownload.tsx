import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import { Cost, Project, Result, altNames } from "../data/Formats";

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

	const costRevHeaders = (alts: number): string[] => {
		const defaultCol = [""];

		for (let i = 0; i <= alts; i++) {
			defaultCol.push("Cost");
			defaultCol.push("Revenue");
		}
		return defaultCol;
	};

	const inputHeaders = (alts: number): string[] => {
		const defaultCol = ["Year"];
		const altHeaders = Array.from({ length: alts + 1 }, (_, i) => {
			const altName = project?.altNames?.[`alt${i}` as keyof altNames] || `Alternative ${i}`;
			return i === 0 ? [altName, ""] : [altName, ""];
		}).flatMap((header) => header);
		const emptyCols = Array.from({ length: alts }, () => "");

		return [...defaultCol, ...altHeaders, ...emptyCols];
	};

	const inputData = (data: Cost[]): any[][] => {
		return data[0]?.cost?.map((_, i) => {
			const row = [i === 0 ? "Initial Investment" : i];
			return row.concat(data.flatMap((item) => [item.cost[i], item.revenue[i]]));
		});
	};

	const resultsData = (res: Result[]) => {
		let results: (string | number | String)[][] = [];
		res.forEach((data) => results.push(Array.from(Object.values(data))));
		return results;
	};

	let csvData = [
		[new Date().toLocaleDateString()],
		[new Date().toLocaleTimeString()],
		[],
		["Project Information"],
		[],
		...stepOneData,
		[],
		[],
		["Annual Cost/Revenue Data By Alternative"],
		[],
		inputHeaders(project?.alts),
		costRevHeaders(project?.alts),
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
