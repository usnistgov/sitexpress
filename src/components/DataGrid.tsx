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

// const rowss = (years: number, n: number) => {
// 	const row = [];
// 	for (let i = 0; i < years; i++) {
// 		let obj = { year: i };
// 		for (let j = 0; j < n; j++) {
// 			let object = {
// 				[`cost+${j}`]: `${123 + j}`,
// 				[`revenue+${j}`]: `${456 + j}`,
// 			};

// 			obj[`Alt ${i}`] = { ...obj[`Alt ${i}`], ...object };
// 		}
// 		row.push(obj);
// 	}
// 	return row;
// };

// console.log(rowss(5, 5));

// const getPeople = () => [
// 	{ year: 0, baseCase: 2, "Alt 0": "Thomas", "Alt 1": "Goldman" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Susie", "Alt 1": "Quattro" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Josh", "Alt 1": "Kneifel" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Thomas", "Alt 1": "Goldman" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Susie", "Alt 1": "Quattro" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Josh", "Alt 1": "Kneifel" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Thomas", "Alt 1": "Goldman" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Susie", "Alt 1": "Quattro" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Josh", "Alt 1": "Kneifel" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Thomas", "Alt 1": "Goldman" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Susie", "Alt 1": "Quattro" },
// 	{ year: 0, baseCase: 2, "Alt 0": "Josh", "Alt 1": "Kneifel" },
// ];

const getPeople = () => [
	{
		year: "",
		"base-cost": "Cost",
		"base-rev": "Revenue",
		"alt0-cost": "Cost",
		"alt0-rev": "Revenue",
		"alt1-cost": "Cost",
		"alt1-rev": "Revenue",
	},
	{
		year: "Initial Investment",
		"base-cost": "14",
		"base-rev": "17",
		"alt0-cost": "12",
		"alt0-rev": "21",
		"alt1-cost": "26",
		"alt1-rev": "25",
	},
	{
		year: "1",
		"base-cost": "12",
		"base-rev": "12",
		"alt0-cost": "12",
		"alt0-rev": "0",
		"alt1-cost": "0",
		"alt1-rev": "0",
	},
	{
		year: "2",
		"base-cost": "12",
		"base-rev": "12",
		"alt0-cost": "23",
		"alt0-rev": "32",
		"alt1-cost": "26",
		"alt1-rev": "21",
	},
	{
		year: "3",
		"base-cost": "12",
		"base-rev": "12",
		"alt0-cost": "34",
		"alt0-rev": "43",
		"alt1-cost": "26",
		"alt1-rev": "21",
	},
	{
		year: "4",
		"base-cost": "12",
		"base-rev": "12",
		"alt0-cost": "45",
		"alt0-rev": "54",
		"alt1-cost": "26",
		"alt1-rev": "21",
	},
	{
		year: "5",
		"base-cost": "12",
		"base-rev": "12",
		"alt0-cost": "56",
		"alt0-rev": "65",
		"alt1-cost": "26",
		"alt1-rev": "21",
	},
	{
		year: "6",
		"base-cost": "12",
		"base-rev": "12",
		"alt0-cost": "67",
		"alt0-rev": "76",
		"alt1-cost": "26",
		"alt1-rev": "21",
	},
	{
		year: "7",
		"base-cost": "12",
		"base-rev": "12",
		"alt0-cost": "78",
		"alt0-rev": "87",
		"alt1-cost": "26",
		"alt1-rev": "21",
	},
	{
		year: "8",
		"base-cost": "12",
		"base-rev": "12",
		"alt0-cost": "89",
		"alt0-rev": "98",
		"alt1-cost": "26",
		"alt1-rev": "21",
	},
];

const getColumns = (n: number): Column[] => {
	let col = [{ columnId: "year", nonEditable: false }, { columnId: "base-cost" }, { columnId: "base-rev" }];
	for (let i = 0; i < n; i++) {
		col.push({ columnId: `alt${i}-cost` }, { columnId: `alt${i}-rev` });
	}
	return col;
};

const headerRow = (n: number) => {
	let header = [
		{ type: "header", text: "Year", nonEditable: false },
		{ type: "text", text: "Base Case", colSpan: 2 },
		{ type: "header", text: "" },
	];
	for (let i = 0; i < n; i++) {
		header.push({ type: "text", text: `Alt ${i}`, colSpan: 2 }, { type: "header", text: "" });
	}
	return {
		rowId: "header",
		cells: header,
	};
};

const applyChangesToPeople = (changes: CellChange<TextCell>[], prevPeople) => {
	changes.forEach((change) => {
		const personIndex = change.rowId;
		const fieldName = change.columnId;
		prevPeople[personIndex][fieldName] = change.newCell.text;
	});
	return [...prevPeople];
};

function DataGrid(props: { noOfAlts: number }) {
	const [people, setPeople] = React.useState(getPeople());
	const { noOfAlts } = props;

	const getRows = (people) => [
		headerRow(noOfAlts),
		...people.map((person, idx: number) => {
			const cells = [];
			for (const [key, value] of Object.entries(person)) {
				const obj = { type: "text", text: value };
				cells.push(obj);
			}
			return { rowId: idx, cells };
		}),
	];

	const rows = getRows(people);
	const columns = getColumns(noOfAlts);

	console.log(rows);
	const handleChanges = (changes: CellChange<TextCell>[]) => {
		setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
	};

	return (
		<ReactGrid
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
