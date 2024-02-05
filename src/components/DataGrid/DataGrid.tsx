import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import { useMemo, useState } from "react";
import "./datagrid.css";

// Row Data Interface
interface IRow {
	year: number;
	cost: string | string;
	revenue: string | string;
}

const cols = (n: number) => {
	let col = [
		{ field: "year", editable: false },
		{
			headerName: "Base Case",
			children: [
				{ field: "cost", resizable: false, width: 100, editable: true, singleClickEdit: "true" },
				{ field: "revenue", resizable: false, width: 100, editable: true, singleClickEdit: "true" },
			],
		},
	];
	for (let i = 0; i < n; i++) {
		col.push({
			headerName: `Alt ${i}`,
			children: [
				{ field: "cost", resizable: false, width: 100, editable: true, singleClickEdit: "true" },
				{ field: "revenue", resizable: false, width: 100, editable: true, singleClickEdit: "true" },
			],
		});
	}
	return col;
};

// only to generate mock data
const rows = (years: number, n: number) => {
	const row: IRow[] = [];
	for (let i = 0; i < years; i++) {
		row.push({ year: i, cost: `${123 + n}`, revenue: `${456 + n}` });
	}
	return row;
};

// [
//     { year: 1, cost: "Model Y", revenue: "64950" },
//     { year: 2, cost: "F-Series", revenue: "33850" },
//     { year: 3, cost: "Corolla", revenue: "29600" },
// ]

const rowStyle = { borderTop: "5px solid inherit" };

const getRowStyle = (params) => {
	if (params.node.rowIndex % 2 === 0) {
		return {};
	}
};

export default function DataGrid() {
	const defaultColDef = useMemo<ColDef>(() => {
		return {
			flex: 1,
			minWidth: 110,
			editable: true,
			lockPosition: true,
			resizable: false,
			moveColumn: false,
			width: 100,
			enterNavigatesVertically: true,
		};
	}, []);
	// Row Data: The data to be displayed.
	const [rowData, setRowData] = useState<IRow[]>(rows(5, 3));

	// Column Definitions: Defines & controls grid columns.
	const [colDefs, setColDefs] = useState<ColDef<IRow>[]>(cols(3));

	return (
		<div className={"ag-theme-quartz"} style={{ height: 500 }}>
			<AgGridReact
				rowData={rowData}
				columnDefs={colDefs}
				defaultColDef={defaultColDef}
				rowStyle={rowStyle}
				getRowStyle={getRowStyle}
			/>
		</div>
	);
}
