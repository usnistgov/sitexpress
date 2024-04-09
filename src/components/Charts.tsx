import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
	},
};

const createLabels = (alts: number) => {
	const labels = ["Base Case", "Alt 1"];
	for (let i = 2; i <= alts; i++) {
		labels.push(`Alt ${i}`);
	}
	return labels;
};

// @ts-ignore
export default function Chart(props) {
	const { project, label, dataset } = props;

	const data = {
		labels: createLabels(project.alts),
		datasets: [
			{
				label,
				data: dataset,
				backgroundColor: "#0ea3e8ff",
			},
		],
	};

	return (
		<div className="flex justify-center">
			<Bar className="max-h-80" options={options} data={data} />
		</div>
	);
}
