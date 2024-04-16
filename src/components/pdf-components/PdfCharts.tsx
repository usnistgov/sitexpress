import { Bar } from "react-chartjs-2";
import { createLabels } from "../../constants";

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
	},
};

const createDataset = (result) => {
	const data = { pv: [], npv: [], irr: [], sp: [], dp: [], bcr: [] };
	result.forEach((res) => {
		data.pv.push(res.pv);
	});
	return data;
};

function PdfCharts(props) {
	const { project, label, results } = props;
	const names = project?.altNames;

	const datas = {
		labels: createLabels(project?.alts, names),
		datasets: [
			{
				label,
				data: createDataset(results).pv,
				backgroundColor: "#1975d1ff",
			},
		],
	};
	return <Bar style={{ display: "hidden" }} className="hidden" options={options} data={datas} id="pv-chart1" />;
}

export default PdfCharts;
