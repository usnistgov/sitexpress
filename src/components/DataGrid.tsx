import { CellChange, Column, NumberCell, ReactGrid } from "@silevis/reactgrid";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { InputTableData, altNames } from "../data/Formats";

const generateData = (
	alts: number,
	years: number,
	existingData: InputTableData[],
	oldAlts: number,
	oldYears: number,
) => {
	let data = [...existingData];
	let yearsOnly = existingData.slice(1);
	let headerOnly = existingData[0];

	if (data.length === 0) {
		const header: InputTableData = {
			year: "",
			"base-cost": "Cost ($)",
			"base-rev": "Revenue ($)",
		};

		for (let i = 1; i <= alts; i++) {
			header[`alt${i}-cost` as keyof InputTableData] = "Cost ($)";
			header[`alt${i}-rev` as keyof InputTableData] = "Revenue ($)";
		}

		data.push(header);

		for (let y = 0; y <= years; y++) {
			const yearData: InputTableData = {
				year: y === 0 ? "Initial Investment" : y.toString(),
				"base-cost": "",
				"base-rev": y === 0 ? 0 : "",
			};

			for (let i = 1; i <= alts; i++) {
				yearData[`alt${i}-cost` as keyof InputTableData] = "";
				yearData[`alt${i}-rev` as keyof InputTableData] = y === 0 ? "0" : "";
			}

			data.push(yearData);
		}
	} else {
		let header: InputTableData = headerOnly;
		if (alts > oldAlts) {
			for (let i = oldAlts + 1; i <= alts; i++) {
				header[`alt${i}-cost` as keyof InputTableData] = "Cost ($)";
				header[`alt${i}-rev` as keyof InputTableData] = "Revenue ($)";
			}
			let yearData: InputTableData[] = [];
			yearsOnly.forEach((year) => {
				for (let i = oldAlts + 1; i <= alts; i++) {
					year[`alt${i}-cost` as keyof InputTableData] = "";
					year[`alt${i}-rev` as keyof InputTableData] = year.year.startsWith("Initial") ? "0" : "";
				}
				yearData.push(year);
			});
			headerOnly = header;
			yearsOnly = yearData;
		} else if (alts < oldAlts) {
			const diff = oldAlts - alts;
			const lastKeys = Object.keys(headerOnly).slice(-(diff * 2));
			lastKeys.forEach((key) => delete headerOnly[key as keyof InputTableData]);
			for (let i = 0; i < yearsOnly.length; i++) {
				lastKeys.forEach((key) => delete yearsOnly[i][key as keyof InputTableData]);
			}
		}

		// add or remove a row
		if (years > oldYears) {
			for (let i = oldYears + 1; i <= years; i++) {
				const yearData: Record<string, string | number> = {
					year: i.toString(),
					"base-cost": "",
					"base-rev": "",
				};

				for (let j = 1; j <= alts; j++) {
					yearData[`alt${j}-cost`] = "";
					yearData[`alt${j}-rev`] = "";
				}
				yearsOnly.push(yearData as InputTableData);
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

const headerRow = (alts: number, names: altNames) => {
	let header = [
		{ type: "header", text: "Year" },
		{ type: "header", text: splitString(names?.["alt0"])[0] || "Base", colSpan: 2 },
		{ type: "header", text: splitString(names?.["alt0"])[1] || "Case" },
	];
	for (let i = 1; i <= alts; i++) {
		const altName = names?.[`alt${i}` as keyof altNames];
		header.push(
			{ type: "header", text: splitString(altName)[0] || `Alternati`, colSpan: 2 },
			{ type: "header", text: splitString(altName)[1] || `ve ${i}` },
		);
	}

	return {
		rowId: "header",
		cells: header,
	};
};

const getRows = (data: InputTableData[], alts: number, names: altNames) => {
	return [
		headerRow(alts, names),
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
};

const applyChangesToData = (changes: CellChange<NumberCell>[], prevData: InputTableData[]) => {
	changes.forEach((change) => {
		const dataIndex = change?.rowId;
		const fieldName = change?.columnId;
		// @ts-ignore
		prevData[dataIndex][fieldName] = change?.newCell?.value;
	});
	return [...prevData];
};

const DataGrid = forwardRef(
	(
		props: { noOfAlts: number; years: number; handleDataChange: (data: InputTableData[]) => void; names: altNames },
		ref,
	) => {
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
			// @ts-ignore
			<ReactGrid
				rows={rows}
				columns={columns}
				enableRangeSelection
				onCellsChanged={handleChanges}
				stickyRightColumns={0}
				stickyTopRows={0}
			/>
		);
	},
);

export default DataGrid;
