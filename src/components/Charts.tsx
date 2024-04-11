import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import React from "react";
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

const createLabels = (alts: number, names) => {
	const labels = [names?.["alt0"] || "Base Case", names?.["alt1"] || "Alternative 1"];
	for (let i = 2; i <= alts; i++) {
		labels.push(names?.[`alt${i}`] || `Alternative ${i}`);
	}
	return labels;
};

// @ts-ignore
export default function Chart(props) {
	const { project, label, dataset } = props;
	const names = project?.altNames;

	const data = {
		labels: createLabels(project.alts, names),
		datasets: [
			{
				label,
				data: dataset,
				backgroundColor: "#1975d1ff",
			},
		],
	};

	return (
		<div className="flex justify-center">
			<Bar className="max-h-80" options={options} data={data} />
		</div>
	);
}
