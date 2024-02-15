import { CellChange, Column, ReactGrid, Row, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import * as React from "react";

interface Data {
	year: string;
	base?: string;
	"base-cost"?: string;
	"base-rev"?: string;
	alt0: string;
	alt1?: string;
	alt2?: string;
	alt3?: string;
	alt4?: string;
}

// const getData = () => [
// 	{
// 		year: "",
// 		"base-cost": "Cost",
// 		"base-rev": "Revenue",
// 		"alt0-cost": "Cost",
// 		"alt0-rev": "Revenue",
// 		"alt1-cost": "Cost",
// 		"alt1-rev": "Revenue",
// 	},
// 	{
// 		year: "Initial Investment",
// 		"base-cost": "14",
// 		"base-rev": "17",
// 		"alt0-cost": "12",
// 		"alt0-rev": "21",
// 		"alt1-cost": "26",
// 		"alt1-rev": "25",
// 	},
// 	{
// 		year: "1",
// 		"base-cost": "12",
// 		"base-rev": "12",
// 		"alt0-cost": "12",
// 		"alt0-rev": "0",
// 		"alt1-cost": "0",
// 		"alt1-rev": "0",
// 	},
// 	{
// 		year: "2",
// 		"base-cost": "12",
// 		"base-rev": "12",
// 		"alt0-cost": "23",
// 		"alt0-rev": "32",
// 		"alt1-cost": "26",
// 		"alt1-rev": "21",
// 	},
// 	{
// 		year: "3",
// 		"base-cost": "12",
// 		"base-rev": "12",
// 		"alt0-cost": "34",
// 		"alt0-rev": "43",
// 		"alt1-cost": "26",
// 		"alt1-rev": "21",
// 	},
// 	{
// 		year: "4",
// 		"base-cost": "12",
// 		"base-rev": "12",
// 		"alt0-cost": "45",
// 		"alt0-rev": "54",
// 		"alt1-cost": "26",
// 		"alt1-rev": "21",
// 	},
// 	{
// 		year: "5",
// 		"base-cost": "12",
// 		"base-rev": "12",
// 		"alt0-cost": "56",
// 		"alt0-rev": "65",
// 		"alt1-cost": "26",
// 		"alt1-rev": "21",
// 	},
// 	{
// 		year: "6",
// 		"base-cost": "12",
// 		"base-rev": "12",
// 		"alt0-cost": "67",
// 		"alt0-rev": "76",
// 		"alt1-cost": "26",
// 		"alt1-rev": "21",
// 	},
// 	{
// 		year: "7",
// 		"base-cost": "12",
// 		"base-rev": "12",
// 		"alt0-cost": "78",
// 		"alt0-rev": "87",
// 		"alt1-cost": "26",
// 		"alt1-rev": "21",
// 	},
// 	{
// 		year: "8",
// 		"base-cost": "12",
// 		"base-rev": "12",
// 		"alt0-cost": "89",
// 		"alt0-rev": "98",
// 		"alt1-cost": "26",
// 		"alt1-rev": "21",
// 	},
// ];

const generateData = (alts: number, years: number) => {
	let data = [];

	let header = new Map();
	header.set("year", "Initial Investment");
	header.set("base-cost", "Cost");
	header.set("base-rev", "Revenue");

	for (let i = 0; i < alts; i++) {
		header.set(`alt${i}-cost`, "Cost");
		header.set(`alt${i}-rev`, "Revenue");
	}

	data.push(Object.fromEntries(header));

	for (let y = 1; y <= years; y++) {
		let yearData = new Map();
		yearData.set("year", y.toString());
		yearData.set("base-cost", "");
		yearData.set("base-rev", "");

		for (let i = 1; i <= alts; i++) {
			yearData.set(`alt${i}-cost`, "");
			yearData.set(`alt${i}-rev`, "");
		}

		data.push(Object.fromEntries(yearData));
	}

	return data;
};

const getColumns = (n: number): Column[] => {
	let col = [{ columnId: "year", nonEditable: true }, { columnId: "base-cost" }, { columnId: "base-rev" }];
	for (let i = 0; i < n; i++) {
		col.push({ columnId: `alt${i}-cost` }, { columnId: `alt${i}-rev` });
	}
	return col;
};

const headerRow = (alts: number) => {
	let header = [
		{ type: "header", text: "Year", nonEditable: true },
		{ type: "text", text: "Base Case", colSpan: 2 },
		{ type: "header", text: "" },
	];
	for (let i = 0; i < alts; i++) {
		header.push({ type: "text", text: `Alt ${i}`, colSpan: 2 }, { type: "header", text: "" });
	}
	return {
		rowId: "header",
		cells: header,
	};
};

const getRows = (data, alts: number) => [
	headerRow(alts),
	...data.map((dataPoint, idx: number) => {
		const cells = [];
		for (const [key, value] of Object.entries(dataPoint)) {
			const obj = { type: "text", text: value };
			cells.push(obj);
		}
		return { rowId: idx, cells };
	}),
];

const applyChangesToData = (changes: CellChange<TextCell>[], prevData) => {
	changes.forEach((change) => {
		const dataIndex = change?.rowId;
		const fieldName = change?.columnId;
		prevData[dataIndex][fieldName] = change?.newCell?.text;
	});
	return [...prevData];
};

function DataGrid(props: { noOfAlts: number; years: number }) {
	const { noOfAlts, years } = props;

	const initialData = generateData(noOfAlts, years);
	const [gridData, setGridData] = React.useState(initialData);

	const initialRows = getRows(gridData, noOfAlts);
	const [rows, setRows] = React.useState(initialRows);

	const initialColumns = getColumns(noOfAlts);
	const [columns, setColumns] = React.useState(initialColumns);

	React.useEffect(() => {
		const updatedData = generateData(noOfAlts, years);
		const updatedRows = getRows(updatedData, noOfAlts);
		const updatedColumns = getColumns(noOfAlts);

		setGridData(updatedData);
		setRows(updatedRows);
		setColumns(updatedColumns);
	}, [noOfAlts, years]);

	const handleChanges = (changes: CellChange<TextCell>[]) => {
		setGridData((prevData) => applyChangesToData(changes, prevData));
	};

	return (
		<ReactGrid
			key={`${noOfAlts}+${years}`}
			rows={rows}
			columns={columns}
			enableRangeSelection
			onCellsChanged={handleChanges}
			stickyRightColumns={0}
			stickyTopRows={0}
		/>
	);
}

export default DataGrid;
