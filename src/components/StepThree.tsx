import {
	Button,
	Paper,
	Stack,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";
import BasicTooltip from "./Tooltip";

const labs = (n: number) => {
	const lab = ["Base Case"];
	for (let i = 1; i <= n; i++) {
		lab.push(`Alt ${i}`);
	}
	return lab;
};

// @ts-ignore
const createDataset = (alts: number, measure) => {
	const data = [];
	for (let i = 0; i <= alts; i++) {
		data.push({
			npvp: measure[i]?.totalBenefits - measure[i]?.totalCosts,
			np: measure[i]?.netBenefits || 0,
			irr: measure[i]?.irr || 0,
			sp: measure[i]?.spp || 0,
			dp: measure[i]?.dpp === "Infinity" ? 0 : measure[i]?.dpp,
			bcr: measure[i]?.bcr || 0,
		});
	}
	return data;
};

function createData(alt: string, npvp: number, np: number, irr: number, sp: number, dp: number, bcr: number) {
	return { alt, npvp, np, irr, sp, dp, bcr };
}

// @ts-ignore
const getRows = (measure) => {
	let rows = [];
	for (let i = 0; i < measure?.length; i++) {
		rows.push(
			createData(
				i === 0 ? "Base Case" : `Alt ${i}`,
				+(measure[i]?.totalBenefits - measure[i]?.totalCosts)?.toFixed(2),
				measure[i]?.netBenefits ? measure[i]?.netBenefits.toFixed(2) : "NA",
				measure[i]?.irr ? measure[i]?.irr?.toFixed(3) : "NA",
				measure[i]?.spp !== "Infinity" ? measure[i]?.spp : "NA",
				measure[i]?.dpp !== "Infinity" ? measure[i]?.dpp : "NA",
				measure[i]?.bcr ? measure[i]?.bcr?.toFixed(2) : "NA",
			),
		);
	}
	return rows;
};

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Typography>{children}</Typography>}
		</div>
	);
}
// @ts-ignore
export default function StepThree(props) {
	const { project, results } = props;
	const [tabValue, setTabValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const measure = results?.measure;

	return (
		<Stack direction="column">
			<Stack className=" flex justify-center p-2 items-center" style={{ backgroundColor: "#ef860a" }}>
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
						<Typography variant="h6" className="">
							Save to:
						</Typography>
						&nbsp;
						<Button
							variant="contained"
							className=""
							onClick={() => {
								console.log("saved to csv");
							}}
						>
							CSV
						</Button>
						&nbsp;
						<span>
							<Button
								variant="contained"
								className=""
								onClick={() => {
									console.log("saved to pdf");
								}}
							>
								PDF
							</Button>
							<BasicTooltip title="text" />
						</span>
					</span>
					<br />

					<TableContainer component={Paper}>
						<Table aria-label="simple table" sx={{ "td, th": { border: "1px solid black" } }}>
							<TableHead>
								<TableRow >
									<TableCell></TableCell>
									<TableCell align="center" key={"npvp"} className="results-table-header">
										Net Present Value Profit ($)
									</TableCell>
									<TableCell align="center" key={"np"} className="results-table-header">
										Change in Profit ($)
									</TableCell>
									<TableCell align="center" key={"irr"} className="results-table-header">
										IRR
									</TableCell>
									<TableCell align="center" key={"sp"} className="results-table-header">
										Simple Payback (Years)
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
								{getRows(measure).map((row) => (
									<TableRow key={row.alt + "-row"}>
										<TableCell component="th" key={row.alt} scope="row" className="results-table-cell">
											{row.alt}
										</TableCell>
										<TableCell component="th" key={"npvp-" + row.alt} align="right" scope="row">
											{row.npvp}
										</TableCell>
										<TableCell align="right" key={"np-" + row.alt}>
											{row.np}
										</TableCell>
										<TableCell align="right" key={"irr-" + row.alt}>
											{row.irr}
										</TableCell>
										<TableCell align="right" key={"sp-" + row.alt}>
											{Math.round(row.sp)}
										</TableCell>
										<TableCell align="right" key={"dp-" + row.alt}>
											{Math.round(row.dp)}
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
					<Stack>
						<Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
							<Tab label="Net Present Value Profit" />
							<Tab label="Change in Profit" />
							<Tab label="IRR" />
							<Tab label="Simple Payback" />
							<Tab label="Discounted Payback" />
							<Tab label="BCR" />
						</Tabs>
						<CustomTabPanel value={tabValue} index={0}>
							<BarChart
								dataset={createDataset(project?.alts, measure)}
								height={250}
								xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
								margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
								series={[{ dataKey: "npvp", label: "Net Present Value Profit", color: "#ef860a" }]}
							/>
						</CustomTabPanel>
						<CustomTabPanel value={tabValue} index={1}>
							<BarChart
								dataset={createDataset(project?.alts, measure)}
								height={250}
								xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
								margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
								series={[{ dataKey: "np", label: "Change in Profit", color: "#ef860a" }]}
							/>
						</CustomTabPanel>
						<CustomTabPanel value={tabValue} index={2}>
							<BarChart
								dataset={createDataset(project?.alts, measure)}
								height={250}
								xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
								margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
								series={[{ dataKey: "irr", label: " IRR", color: "#ef860a" }]}
							/>
						</CustomTabPanel>
						<CustomTabPanel value={tabValue} index={3}>
							<BarChart
								dataset={createDataset(project?.alts, measure)}
								height={250}
								xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
								margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
								series={[{ dataKey: "sp", label: "Simple Payback", color: "#ef860a" }]}
							/>
						</CustomTabPanel>
						<CustomTabPanel value={tabValue} index={4}>
							<BarChart
								dataset={createDataset(project?.alts, measure)}
								height={250}
								xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
								margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
								series={[{ dataKey: "dp", label: "Discounted Payback", color: "#ef860a" }]}
							/>
						</CustomTabPanel>
						<CustomTabPanel value={tabValue} index={5}>
							<BarChart
								dataset={createDataset(project?.alts, measure)}
								height={250}
								xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
								margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
								series={[{ dataKey: "bcr", label: "BCR", color: "#ef860a" }]}
							/>
						</CustomTabPanel>
					</Stack>
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
