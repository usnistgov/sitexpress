import { Stack, Typography } from "@mui/material";

import { Measure, Project, Result, altNames, e3Result } from "../data/Formats";
import CSVDownload from "./CSVDownload";
import ChartTabs from "./ChartTabs";
import ResultsTable from "./ResultsTable";
import BasicTooltip from "./Tooltip";
import PDFDownload from "./pdf-components/PdfDownload";

function createData(alt: string, pv: number, npv: number, irr: number, spp: number, dpp: number, bcr: number) {
	return { alt, pv, npv, irr, spp, dpp, bcr };
}

const getRows = (measure: Measure[], names: altNames) => {
	let rows = [];
	for (let i = 0; i < measure?.length; i++) {
		rows.push(
			createData(
				// @ts-ignore
				i === 0 ? names?.[`alt${0}`] : names?.[`alt${i}`],
				+(measure[i]?.totalBenefits - measure[i]?.totalCosts)?.toFixed(2),
				// @ts-ignore
				measure[i]?.netBenefits ? measure[i]?.netBenefits.toFixed(2) : "NA",
				measure[i]?.irr ? +(measure[i]?.irr * 100).toFixed(1) : 0,
				// @ts-ignore
				parseFloat(measure[i]?.spp) === Infinity ? "Not Reached" : Math.round(measure[i]?.spp),
				// @ts-ignore
				parseFloat(measure[i]?.dpp) === Infinity ? "Not Reached" : Math.round(measure[i]?.dpp),
				measure[i]?.bcr ? measure[i]?.bcr?.toFixed(2) : "NA",
			),
		);
	}
	return rows;
};

export default function StepThree(props: { project: Project; results: e3Result[] }) {
	const { project, results } = props;

	// @ts-ignore
	const measure = results?.measure;
	const names: altNames = project?.altNames;
	const tableRows: Result[] = getRows(measure, names);

	return (
		<Stack direction="column">
			<Stack className=" flex justify-center p-2 items-center bg-sit-orange">
				<Stack direction="column" className="flex justify-center items-center">
					<Typography variant="h6" className="text-center">
						Step Three
						<br />
						Results
					</Typography>
				</Stack>
			</Stack>
			{measure ? (
				<Stack className="p-10">
					<span className="flex ml-auto">
						<CSVDownload project={project} tableData={tableRows} />
						&nbsp;
						<span>
							<PDFDownload project={project} results={tableRows} />
							<BasicTooltip title="text" />
						</span>
					</span>
					<br />
					<ResultsTable tableRows={tableRows} />
					<br />
					<ChartTabs project={project} results={results} />
				</Stack>
			) : (
				<Stack direction="column" className="flex justify-center items-center h-96">
					<br />
					<Typography variant="h4" className="text-center">
						Run results to display the table and the graphs.
					</Typography>
					<br />
				</Stack>
			)}
		</Stack>
	);
}
