import DataGrid, { SelectCellFormatter, SelectColumn, textEditor } from "react-data-grid";

//for datatable
const columns = [
	{ key: "year", name: "Year", width: "max-content" },
	{ key: "baseCase", name: "Base Case", width: "max-content", editor: textEditor },
	{
		key: "blankSpace1",
		name: "",
		width: "max-content",
		editor: textEditor,
	},
	{
		key: "alt1",
		name: "Alt 1",
		width: "max-content",
		editor: textEditor,
	},
	{
		key: "blankSpace2",
		name: "",
		width: "max-content",
		editor: textEditor,
	},
	{
		key: "alt2",
		name: "Alt 2",
		width: "max-content",
		editor: textEditor,
	},
	{
		key: "blankSpace3",
		name: "",
		width: "max-content",
		editor: textEditor,
	},
];

const rows = [
	{
		year: "",
		baseCase: "Cost",
		blankSpace1: "Revenue",
		alt1: "Cost",
		blankSpace2: "Revenue",
		alt2: "Cost",
		blankSpace3: "Revenue",
	},
	{ year: "Initial Investment", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "1", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "2", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "3", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "4", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "5", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "6", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "7", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "8", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "9", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "10", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "11", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "12", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "13", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "14", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "15", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "16", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "17", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "18", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "19", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
	{ year: "20", baseCase: "", blankSpace1: "", alt1: "", blankSpace2: "", alt2: "", blankSpace3: "" },
];

export default function StepTwo() {
	return (
		<div>
			{/*Section Header Rectangle */}
			<div className="rectangle3">
				<h1 className="section3titleText">
					<span>
						Step Two:
						<br /> Annual Cost/ Revenue Data By Alternative <br />
					</span>
					<span className="section2SubtitleText">
						Provide the annual values costs and revenues for each alternative.
					</span>
				</h1>
			</div>

			{/*Data table */}
			<DataGrid className="tableDesign" columns={columns} rows={rows} />
		</div>
	);
}
