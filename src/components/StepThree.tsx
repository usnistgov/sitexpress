import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import DataGrid, { SelectCellFormatter, SelectColumn, textEditor } from "react-data-grid";

//for bar graph
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

//for second datatable
const columns1 = [
	{ key: "blankSpace", name: "", width: "max-content" },

	{ key: "baseCase", name: "Base Case", width: "max-content", editor: textEditor },

	{
		key: "option1",
		name: "Option 1",
		width: "max-content",
		editor: textEditor,
	},

	{
		key: "option2",
		name: "Option 2",
		width: "max-content",
		editor: textEditor,
	},
];

const rows1 = [
	{ blankSpace: "Net Present Value Profit", baseCase: "", option1: "", option2: "" },
	{ blankSpace: "Net Profit", baseCase: "", option1: "", option2: "" },
	{ blankSpace: "IRR", baseCase: "", option1: "", option2: "" },
	{ blankSpace: "Simple Payback", baseCase: "", option1: "", option2: "" },
	{ blankSpace: "Discounted Payback", baseCase: "", option1: "", option2: "" },
	{ blankSpace: "BCR", baseCase: "", option1: "", option2: "" },
];

const labels = ["Base Case", "Alt 1", "Alt 2"];

export const data = {
	labels,
	datasets: [
		{
			label: "Net Present Value - Profit",
			data: [8000, 9000, 10000],
			backgroundColor: "rgba(0, 0, 240, 0.5)",
		},
	],
};

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "bottom" as const,
		},
		title: {
			display: true,
		},
	},
};

export default function StepThree() {
	return (
		<div>
			{/*Section Header Rectangle */}
			<div className="rectangle4">
				<h1 className="section4titleText">
					{" "}
					<span>
						Step Three:
						<br /> Results <br />
					</span>
					<span>
						<button className="largeButton">Run Results</button>
					</span>
					<span className="section4subtitleText">Save to:</span>
					<span>
						<button className="smallButton"> CSV</button> <button className="smallButton">PDF</button>
					</span>{" "}
				</h1>
			</div>

			{/*Creates Table */}
			<DataGrid className="tableDesign2" columns={columns1} rows={rows1} />

			{/*Bar Graph needs to be sized smaller and set to only appear after pressing run */}
			<Bar className="barGraphDesign" data={data} options={options} />
		</div>
	);
}
