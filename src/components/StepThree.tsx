import { Stack, Typography } from "@mui/material";

import { Measure, Project, Result, altNames, e3Result } from "../data/Formats";
import CSVDownload from "./CSVDownload";
import ChartTabs from "./ChartTabs";
import ResultsTable from "./ResultsTable";
import BasicTooltip from "./Tooltip";
import PDFDownload from "./pdf-components/PdfDownload";

function createData(
	alt: string,
	pv: number,
	npv: number | string,
	irr: number | string,
	spp: number | string,
	dpp: number | string,
	bcr: number | string,
) {
	return { alt, pv, npv, irr, spp, dpp, bcr };
}

const findIRR = (alt: number, irr: number | string) => {
	if (alt === 0) return "NA";
	if (irr === null) return "Negative Return";
	return (+irr * 100).toFixed(2);
};

const getRows = (measure: Measure[], names: altNames) => {
	return measure?.map((m, i) =>
		createData(
			names?.[`alt${i}` as keyof altNames] || `Alternative ${i}`,
			+(m.totalBenefits - m.totalCosts).toFixed(2),
			measure[i]?.netBenefits ? m.netBenefits?.toFixed(2) : "NA",
			findIRR(i, m?.irr),
			typeof m.spp === "number" && isFinite(m.spp) ? Math.round(m.spp) : "Not Reached",
			typeof m.dpp === "number" && isFinite(m.dpp) ? Math.round(m.dpp) : "Not Reached",
			typeof measure[i]?.bcr === "number" ? m?.bcr.toFixed(2) : "NA",
		),
	);
};

export default function StepThree(props: { project: Project; results: e3Result }) {
	const { project, results } = props;

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
			{measure.length > 0 ? (
				<Stack className="p-10">
					<span className="flex ml-auto">
						<CSVDownload project={project} tableData={tableRows} />
						&nbsp;
						<span>
							<PDFDownload project={project} results={tableRows} />
							<BasicTooltip title="Results are provided for the base case and all alternatives. The Present Value is the net benefits for each alternative. All other metrics are calculated for each alternative relative to the base case." />
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
