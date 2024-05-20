import { Stack } from "@mui/system";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import { createLabels } from "../constants";
import { Project } from "../data/Formats";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
	},
};

export default function Chart(props: { project: Project; label: string; dataset: (number | string)[] }) {
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
		<Stack className="flex justify-center">
			<Bar className="max-h-80" options={options} data={data} />
		</Stack>
	);
}
