import { CellChange, Column, NumberCell, ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

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
// @ts-ignore
const generateData = (alts: number, years: number, existingData, oldAlts: number, oldYears: number) => {
	let data = [...existingData];
	let yearsOnly = existingData.slice(1);
	let headerOnly = existingData[0];

	if (data.length === 0) {
		let header = new Map();
		header.set("year", "");
		header.set("base-cost", "Cost ($)");
		header.set("base-rev", "Revenue ($)");

		for (let i = 1; i <= alts; i++) {
			header.set(`alt${i}-cost`, "Cost ($)");
			header.set(`alt${i}-rev`, "Revenue ($)");
		}

		data.push(Object.fromEntries(header));

		for (let y = 0; y <= years; y++) {
			let yearData = new Map();
			y === 0 ? yearData.set("year", `Initial Investment`) : yearData.set("year", y.toString());
			yearData.set("base-cost", "");
			y === 0 ? yearData.set("base-rev", 0) : yearData.set("base-rev", "");

			for (let i = 1; i <= alts; i++) {
				yearData.set(`alt${i}-cost`, "");
				y === 0 ? yearData.set(`alt${i}-rev`, 0) : yearData.set(`alt${i}-rev`, "");
			}

			data.push(Object.fromEntries(yearData));
		}
	} else {
		let header = headerOnly;
		if (alts > oldAlts) {
			for (let i = oldAlts + 1; i <= alts; i++) {
				header[`alt${i}-cost`] = "Cost ($)";
				header[`alt${i}-rev`] = "Revenue ($)";
			}
			// @ts-ignore
			let yearData = [];
			// @ts-ignore
			yearsOnly.forEach((year) => {
				const x = { ...year };
				for (let i = oldAlts + 1; i <= alts; i++) {
					x[`alt${i}-cost`] = "";
					x.year.startsWith("Initial") ? (x[`alt${i}-rev`] = "0") : (x[`alt${i}-rev`] = "");
				}
				yearData.push(x);
			});
			headerOnly = header;
			// @ts-ignore
			yearsOnly = yearData;
		} else if (alts < oldAlts) {
			const diff = oldAlts - alts;
			const lastKeys = Object.keys(headerOnly).slice(-(diff * 2));
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
	let col = [
		{ columnId: "year", nonEditable: true },
		{ columnId: "base-cost", width: 100 },
		{ columnId: "base-rev", width: 100 },
	];
	for (let i = 1; i <= n; i++) {
		col.push({ columnId: `alt${i}-cost`, width: 100 }, { columnId: `alt${i}-rev`, width: 100 });
	}
	return col;
};

const splitString = (str: string) => {
	var middle = Math.ceil(str?.length / 2);
	var firstPart = str?.slice(0, middle);
	var secondPart = str?.slice(middle);
	if (firstPart[firstPart.length - 1] === " ") {
		firstPart += secondPart[0];
		secondPart = secondPart.slice(1);
	}
	return [firstPart, secondPart];
};

const headerRow = (alts: number, names) => {
	let header = [
		{ type: "header", text: "Year" },
		{ type: "header", text: splitString(names?.["alt0"])[0] || "Base", colSpan: 2 },
		{ type: "header", text: splitString(names?.["alt0"])[1] || "Case" },
	];
	for (let i = 1; i <= alts; i++) {
		header.push(
			{ type: "header", text: splitString(names?.[`alt${i}`])[0] || "Alternati", colSpan: 2 },
			{ type: "header", text: splitString(names?.[`alt${i}`])[1] || `ve ${i}` },
		);
	}
	return {
		rowId: "header",
		cells: header,
	};
};

// @ts-ignore
const getRows = (data, alts: number, names) => [
	headerRow(alts, names),
	// @ts-ignore
	...data.map((dataPoint, idx: number) => {
		const cells = [];
		for (const [key, value] of Object.entries(dataPoint)) {
			let obj = {};
			if (value === "Initial Investment" || value === "Cost ($)" || value === "Revenue ($)" || key === "year") {
				obj = { type: "text", text: value, nonEditable: true };
			} else {
				obj = { type: "number", text: value, value: value };
			}
			if ((/alt[1-5]-rev/.test(key) || key === "base-rev") && dataPoint.year === "Initial Investment") {
				obj = { type: "number", text: value, value: +value, nonEditable: true };
			}
			cells.push(obj);
		}
		return { rowId: idx, cells };
	}),
];
// @ts-ignore
const applyChangesToData = (changes: CellChange<NumberCell>[], prevData) => {
	changes.forEach((change) => {
		const dataIndex = change?.rowId;
		const fieldName = change?.columnId;
		prevData[dataIndex][fieldName] = change?.newCell?.value;
	});
	return [...prevData];
};
// @ts-ignore
const DataGrid = forwardRef((props: { noOfAlts: number; years: number; handleDataChange; names }, ref) => {
	const { noOfAlts, years, handleDataChange, names } = props;

	const [alts, setAlts] = useState(noOfAlts);
	const [newYears, setNewYears] = useState(years);

	const [tableData, setTableData] = useState(() => generateData(noOfAlts, years, [], noOfAlts, years));

	const initialRows = getRows(tableData, noOfAlts, names);
	const [rows, setRows] = useState(initialRows);

	const initialColumns = getColumns(noOfAlts);
	const [columns, setColumns] = useState(initialColumns);

	// updates the table when years/alts are changed
	useEffect(() => {
		if (tableData.length === 0 || +noOfAlts !== alts || +years !== newYears || names !== names) {
			setAlts(+noOfAlts);
			setNewYears(+years);
			const updatedData = generateData(noOfAlts, +years, tableData, +alts, newYears);
			setTableData(updatedData);
		}
		const updatedRows = getRows(tableData, noOfAlts, names);
		const updatedColumns = getColumns(noOfAlts);
		setRows(updatedRows);
		setColumns(updatedColumns);
		handleDataChange(tableData);
	}, [noOfAlts, years, tableData, names]);

	const handleChanges = (changes: CellChange<NumberCell>[]) => {
		setTableData((prevData) => applyChangesToData(changes, prevData));
		handleDataChange(tableData);
	};

	useImperativeHandle(ref, () => ({
		handleReset: () => {
			const data = generateData(noOfAlts, years, [], noOfAlts, years);
			getRows(data, 1, names);
			getColumns(1);
			setTableData(data);
		},
	}));

	return (
		<ReactGrid
			rows={rows}
			columns={columns}
			enableRangeSelection
			// @ts-ignore
			onCellsChanged={handleChanges}
			stickyRightColumns={0}
			stickyTopRows={0}
		/>
	);
});

export default DataGrid;
