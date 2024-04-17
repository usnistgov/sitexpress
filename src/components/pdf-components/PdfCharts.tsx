import { Bar } from "react-chartjs-2";

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
	},
};

const PdfCharts = (props: { label: string; altLabels: string[]; dataset: any; type: string }) => {
	const { label, altLabels, dataset, type } = props;

	const datas = {
		labels: altLabels,
		datasets: [
			{
				label,
				data: dataset[type],
				backgroundColor: "#1975d1ff",
			},
		],
	};
	return <Bar style={{ height: "250px", width: "500px" }} options={options} data={datas} className="pv-chart1" />;
};

export default PdfCharts;
