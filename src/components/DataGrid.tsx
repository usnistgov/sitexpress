import { CellChange, Column, ReactGrid, Row, TextCell } from "@silevis/reactgrid";
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
			y === 0 ? yearData.set("base-rev", "0") : yearData.set("base-rev", "");

			for (let i = 1; i <= alts; i++) {
				yearData.set(`alt${i}-cost`, "");
				y === 0 ? yearData.set(`alt${i}-rev`, "0") : yearData.set(`alt${i}-rev`, "");
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
			let yearData = [];
			yearsOnly.forEach((year) => {
				const x = { ...year };
				for (let i = oldAlts + 1; i <= alts; i++) {
					x[`alt${i}-cost`] = "";
					x.year.startsWith("Initial") ? (x[`alt${i}-rev`] = "0") : (x[`alt${i}-rev`] = "");
				}
				yearData.push(x);
			});
			headerOnly = header;
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
			let obj = {};
			if (value === "Initial Investment" || value === "Cost ($)" || value === "Revenue ($)" || key === "year") {
				obj = { type: "text", text: value, nonEditable: true };
			} else {
				obj = { type: "text", text: value };
			}
			if ((/alt[1-5]-rev/.test(key) || key === "base-rev") && dataPoint.year === "Initial Investment") {
				obj = { type: "text", text: value, nonEditable: true };
			}
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

const DataGrid = forwardRef((props: { noOfAlts: number; years: number; handleDataChange }, ref) => {
	const { noOfAlts, years, handleDataChange } = props;

	const [alts, setAlts] = useState(noOfAlts);
	const [newYears, setNewYears] = useState(years);

	const [tableData, setTableData] = useState(() => generateData(noOfAlts, years, [], noOfAlts, years));

	const initialRows = getRows(tableData, noOfAlts);
	const [rows, setRows] = useState(initialRows);

	const initialColumns = getColumns(noOfAlts);
	const [columns, setColumns] = useState(initialColumns);

	// updates the table when years/alts are changed
	useEffect(() => {
		if (tableData.length === 0 || +noOfAlts !== alts || +years !== newYears) {
			setAlts(+noOfAlts);
			setNewYears(+years);
			const updatedData = generateData(noOfAlts, +years, tableData, +alts, newYears);
			setTableData(updatedData);
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

	useImperativeHandle(ref, () => ({
		handleReset: () => {
			const data = generateData(noOfAlts, years, [], noOfAlts, years);
			getRows(data, 1);
			getColumns(1);
			setTableData(data);
		},
	}));

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
});

export default DataGrid;
