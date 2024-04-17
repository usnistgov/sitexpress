import {
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

import CSVDownload from "./CSVDownload";
import ChartTabs from "./ChartTabs";
import BasicTooltip from "./Tooltip";
import PDFDownload from "./pdf-components/PdfDownload";

function createData(alt: string, pv: number, npv: number, irr: number, spp: number, dpp: number, bcr: number) {
	return { alt, pv, npv, irr, spp, dpp, bcr };
}

// @ts-ignore
const getRows = (measure, names) => {
	let rows = [];
	for (let i = 0; i < measure?.length; i++) {
		rows.push(
			createData(
				i === 0 ? names?.[`alt${0}`] : names?.[`alt${i}`],
				+(measure[i]?.totalBenefits - measure[i]?.totalCosts)?.toFixed(2),
				measure[i]?.netBenefits ? measure[i]?.netBenefits.toFixed(2) : "NA",
				measure[i]?.irr ? +(measure[i]?.irr * 100).toFixed(3) : 0,
				// @ts-ignore
				parseFloat(measure[i]?.spp) === Infinity ? "Not Reached" : Math.round(measure[i]?.spp),
				parseFloat(measure[i]?.dpp) === Infinity ? "Not Reached" : Math.round(measure[i]?.dpp),
				measure[i]?.bcr ? measure[i]?.bcr?.toFixed(2) : "NA",
			),
		);
	}
	return rows;
};

// @ts-ignore
export default function StepThree(props) {
	const { project, results } = props;

	const measure = results?.measure;
	const names = project?.altNames;
	const tableRows = getRows(measure, names);

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

					<TableContainer component={Paper}>
						<Table aria-label="simple table" sx={{ "td, th": { border: "1px solid black" } }}>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell align="center" key={"npvp"} className="results-table-header">
										Present Value ($)
									</TableCell>
									<TableCell align="center" key={"np"} className="results-table-header">
										Net Present Value ($)
									</TableCell>
									<TableCell align="center" key={"irr"} className="results-table-header">
										IRR (%)
									</TableCell>
									<TableCell align="center" key={"sp"} className="results-table-header">
										Payback Period (Years)
									</TableCell>
									<TableCell align="center" key={"dp"} className="results-table-header">
										Discounted Payback (Years)
									</TableCell>
									<TableCell align="center" key={"bcr"} className="results-table-header">
										BCR
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{tableRows.map((row) => (
									<TableRow key={row.alt + "-row"}>
										<TableCell component="th" key={row.alt} scope="row" className="results-table-cell">
											{row.alt}
										</TableCell>
										<TableCell component="th" key={"npvp-" + row.alt} align="right" scope="row">
											{row.pv}
										</TableCell>
										<TableCell align="right" key={"np-" + row.alt}>
											{row.npv}
										</TableCell>
										<TableCell align="right" key={"irr-" + row.alt}>
											{row.irr}
										</TableCell>
										<TableCell align="right" key={"sp-" + row.alt}>
											{row.spp}
										</TableCell>
										<TableCell align="right" key={"dp-" + row.alt}>
											{row.dpp}
										</TableCell>
										<TableCell align="right" key={"bcr-" + row.alt}>
											{row.bcr}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<br />
					<ChartTabs project={project} results={results} />
				</Stack>
			) : (
				<Stack direction="column" className="flex justify-center items-center h-96">
					<br />
					<Typography variant="h4" className="text-center">
						Run results to display table.
					</Typography>
					<br />
				</Stack>
			)}
		</Stack>
	);
}
