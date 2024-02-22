import { CellChange, Column, ReactGrid, Row, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import React, { useEffect, useRef, useState } from "react";

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
// 	}
// ]
// ];

const generateData = (alts: number, years: number, existingData, oldAlts: number, oldYears: number) => {
	let data = [...existingData];
	let yearsOnly = existingData.slice(1);
	let headerOnly = existingData[0];

	if (data.length === 0) {
		let header = new Map();
		header.set("year", "Initial Investment");
		header.set("base-cost", "Cost");
		header.set("base-rev", "Revenue");

		for (let i = 1; i <= alts; i++) {
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
	} else {
		let header = { ...headerOnly };
		if (alts > oldAlts) {
			for (let i = oldAlts + 1; i <= alts; i++) {
				header[`alt${i}-cost`] = "Cost";
				header[`alt${i}-rev`] = "Revenue";
			}
			console.log(yearsOnly);
			let yearData = [];
			yearsOnly.forEach((year) => {
				for (let i = oldAlts + 1; i <= alts; i++) {
					yearData.push({ ...year, [`alt${i}-cost`]: "", [`alt${i}-rev`]: "" });
					// console.log(yearData);
				}
			});
			console.log(yearData);
			headerOnly = { ...header };
			yearsOnly = yearData;
		} else if (alts < oldAlts) {
			const lastKeys = Object.keys(headerOnly).slice(-2);
			lastKeys.forEach((key) => delete headerOnly[key]);
			for (let i = 0; i < yearsOnly.length; i++) {
				lastKeys.forEach((key) => delete yearsOnly[i][key]);
			}
		}

		// add or remove a row
		if (years > oldYears) {
			for (let i = oldYears + 1; i <= years; i++) {
				let yearData = new Map();
				yearData.set("year", i.toString());
				yearData.set("base-cost", "");
				yearData.set("base-rev", "");

				for (let i = 1; i <= alts; i++) {
					yearData.set(`alt${i}-cost`, "");
					yearData.set(`alt${i}-rev`, "");
				}
				yearsOnly.push(Object.fromEntries(yearData));
			}
		} else if (years < oldYears) {
			for (let i = 0; i < oldYears - years; i++) {
				yearsOnly.pop();
			}
		}
		data = [headerOnly, ...yearsOnly];
	}
	return data;
};

const getColumns = (n: number): Column[] => {
	let col = [{ columnId: "year", nonEditable: true }, { columnId: "base-cost" }, { columnId: "base-rev" }];
	for (let i = 1; i <= n; i++) {
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
	for (let i = 1; i <= alts; i++) {
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
	console.log(changes);
	console.log(...prevData);
	console.log("changes to data");
	return [...prevData];
};

function DataGrid(props: { noOfAlts: number; years: number; handleDataChange }) {
	const { noOfAlts, years, handleDataChange } = props;

	const [alts, setAlts] = useState(noOfAlts);
	const [newYears, setNewYears] = useState(years);

	// const initialData = generateData(noOfAlts, years);
	const [tableData, setTableData] = useState(() => generateData(noOfAlts, years, [], noOfAlts, years));

	const initialRows = getRows(tableData, noOfAlts);
	const [rows, setRows] = useState(initialRows);

	const initialColumns = getColumns(noOfAlts);
	const [columns, setColumns] = useState(initialColumns);

	// const changeAlts = (prevYears, newYears) => {
	// 	let newData = [];
	// 	if (prevYears < newYears) {
	// 		const oldData = tableData;
	// 		newData = oldData.slice(0, -1);
	// 		setTableData(oldData.slice(0, -1));
	// 		console.log(newData);
	// 	}
	// 	return newData;
	// };

	// only calls on first render
	// useEffect(() => {
	// 	console.log("useeffect on first render called");
	// 	const updatedData = generateData(noOfAlts, years);
	// 	const updatedRows = getRows(updatedData, noOfAlts);
	// 	const updatedColumns = getColumns(noOfAlts);

	// 	setRows(updatedRows);
	// 	setColumns(updatedColumns);
	// 	handleDataChange(tableData);
	// }, []);

	// updates the table when years/alts are changed
	useEffect(() => {
		console.log("useeffect with dependency called");
		// console.log("existing table data", tableData);
		if (tableData.length === 0 || +noOfAlts !== alts || +years !== newYears) {
			setAlts(+noOfAlts);
			setNewYears(+years);
			const updatedData = generateData(noOfAlts, +years, tableData, +alts, newYears);
			setTableData(updatedData);
			console.log(updatedData);
		}
		const updatedRows = getRows(tableData, noOfAlts);
		const updatedColumns = getColumns(noOfAlts);
		setRows(updatedRows);
		setColumns(updatedColumns);
		handleDataChange(tableData);
	}, [noOfAlts, years, tableData]);

	const handleChanges = (changes: CellChange<TextCell>[]) => {
		setTableData((prevData) => applyChangesToData(changes, prevData));
		handleDataChange(tableData);
	};

	return (
		<>
			<ReactGrid
				rows={rows}
				columns={columns}
				enableRangeSelection
				onCellsChanged={handleChanges}
				stickyRightColumns={0}
				stickyTopRows={0}
			/>
		</>
	);
}

export default DataGrid;
