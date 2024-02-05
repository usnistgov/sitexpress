// import DataGrid, { SelectCellFormatter, SelectColumn, textEditor } from "react-data-grid";

// //for datatable
// const columns = [
// 	{ key: "year", name: "Year", width: "max-content" },
// 	{ key: "baseCase", name: "Base Case", width: "max-content", editor: textEditor },
// 	{
// 		key: "blankSpace1",
// 		name: "",
// 		width: "max-content",
// 		editor: textEditor,
// 	},
// 	{
// 		key: "alt1",
// 		name: "Alt 1",
// 		width: "max-content",
// 		editor: textEditor,
// 	},
// 	{
// 		key: "blankSpace2",
// 		name: "",
// 		width: "max-content",
// 		editor: textEditor,
// 	},
// 	{
// 		key: "alt2",
// 		name: "Alt 2",
// 		width: "max-content",
// 		editor: textEditor,
// 	},
// 	{
// 		key: "blankSpace3",
// 		name: "",
// 		width: "max-content",
// 		editor: textEditor,
// 	},
// ];

// const rows = [
// 	{
// 		year: "",
// 		baseCase: "Cost",
// 		blankSpace1: "Revenue",
// 		alt1: "Cost",
// 		blankSpace2: "Revenue",
// 		alt2: "Cost",
// 		blankSpace3: "Revenue",
// 	},
// 	{ year: "Initial Investment", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "1", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "2", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "3", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "4", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "5", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "6", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "7", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "8", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "9", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "10", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "11", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "12", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "13", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "14", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "15", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "16", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "17", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "18", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "19", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// 	{ year: "20", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
// ];

// export default function StepTwo() {
// 	return (
// 		<div>
// 			{/*Section Header Rectangle */}
// 			<div className="rectangle3">
// 				<h1 className="section3titleText">
// 					<span>
// 						Step Two:
// 						<br /> Annual Cost/ Revenue Data By Alternative <br />
// 					</span>
// 					<span className="section2SubtitleText">
// 						Provide the annual values costs and revenues for each alternative.
// 					</span>
// 				</h1>
// 			</div>

// 			{/*Data table */}
// 			<DataGrid className="tableDesign" columns={columns} rows={rows} />
// 		</div>
// 	);
// }

import { Button, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DataGrid from "./DataGrid/DataGrid";

function createData(cost: number, revenue: number) {
	return { cost, revenue };
}

const NoOfAlternatives = (n: number) => {
	const alts = [];
	for (let i = 0; i < n; i++) {
		alts.push(<TableCell align="right">Alt {i}</TableCell>);
	}
	return alts;
};

const rows = (years: number) => {
	const row = [];
	for (let i = 0; i < years; i++) {
		row.push(createData(i, 159));
	}
	return row;
};

interface Column {
	id: "cost" | "revenue" | "initial";
	label: string;
	minWidth?: number;
	align?: "center";
	format?: (value: number) => string;
}

const InitialInvestment = [{ id: "initial", label: "Initial Investment", minWidth: 170 }];

const columns: Column[] = [
	{ id: "cost", label: "Cost", minWidth: 170 },
	{ id: "revenue", label: "Revenue", minWidth: 100 },
];

export default function DenseTable() {
	return (
		<Stack direction="row">
			<Stack className="flex justify-center text-center p-2 w-1/3 max-w-1/3 bg-orange-400">
				<Typography variant="h6">Step Two</Typography>
				<Typography variant="h6">Annual Cost/ Revenue Data By Alternative</Typography>
				<Typography variant="body1">Provide the annual values costs and revenues for each alternative</Typography>
			</Stack>
			<Stack className="p-10 w-2/3">
				{/* <TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell>Year</TableCell>
								<TableCell align="right">Base Case</TableCell>
								{NoOfAlternatives(5)}
							</TableRow>
							<TableRow>
								{InitialInvestment.map((inv) => (
									<TableCell key={inv.id} align={inv.align} style={{ top: 57, minWidth: inv.minWidth }}>
										{inv.label}
									</TableCell>
								))}
							</TableRow>
							<TableRow>
								{columns.map((column) => (
									<TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows(10).map((row) => (
								<TableRow key={row.cost} sx={{ "&:last-child td, &:last-child th": { border: "1px" } }}>
									<TableCell component="th" scope="row">
										{row.cost}
									</TableCell>
									<TableCell align="right">{row.revenue}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer> */}
				<Stack>
					<DataGrid />
				</Stack>
				<br />
				<Stack className="flex" style={{ flexDirection: "row-reverse" }}>
					<span className="">
						<Button
							variant="contained"
							className=""
							onClick={() => {
								console.log("Running results");
							}}
						>
							Run Results
						</Button>
						{/* <BasicTooltip title="text" /> */}
					</span>
				</Stack>
			</Stack>
		</Stack>
	);
}
