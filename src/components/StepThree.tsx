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
import { dataset } from "../data/dataset";
import BasicTooltip from "./Tooltip";

const labs = (n: number) => {
	const lab = ["Base Case"];
	for (let i = 0; i < n; i++) {
		lab.push(`Alt ${i}`);
	}
	return lab;
};

function createData(metric: string, npvp: number, np: number, irr: number, sp: number, dp: number, bcr: number) {
	return { metric, npvp, np, irr, sp, dp, bcr };
}

const rows = [
	createData("Net Present Value Profit", 1.59, 6.0, 2.4, 4.0, 2.3, 5.6),
	createData("Net Profit", 23.7, 9.0, 3.7, 4.3, 2.3, 5.6),
	createData("IRR", 26.2, 16.0, 24, 6.0, 2.3, 5.6),
	createData("Simple Payback", 30.5, 3.7, 6.7, 4.3, 2.3, 5.6),
	createData("Discounted Payback", 35.6, 16.0, 4.9, 3.9, 2.3, 5.6),
	createData("BCR", 35.4, 16.0, 4.9, 3.9, 2.3, 5.6),
];

const NoOfAlternatives = (n: number) => {
	const alts = [];
	for (let i = 0; i < n; i++) {
		alts.push(<TableCell align="center">Alt {i}</TableCell>);
	}
	return alts;
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

export default function StepThree(props) {
	const { project } = props;
	const [tabValue, setTabValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};
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
			<Stack className="p-10">
				<span className="flex ml-auto">
					<Typography variant="h6" className="">
						Save to:
					</Typography>{" "}
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
							<TableRow>
								<TableCell></TableCell>
								<TableCell align="center">Base Case</TableCell>
								{NoOfAlternatives(project?.alts || 2)}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.npvp}>
									<TableCell component="th" scope="row">
										{row.metric}
									</TableCell>
									<TableCell component="th" align="right" scope="row">
										{row.npvp}
									</TableCell>
									<TableCell align="right">{row.np}</TableCell>
									<TableCell align="right">{row.irr}</TableCell>
									<TableCell align="right">{row.sp}</TableCell>
									<TableCell align="right">{row.dp}</TableCell>
									<TableCell align="right">{row.bcr}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<br />
				<Stack>
					<Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
						<Tab label="Net Present Value Profit" />
						<Tab label="Net Profit" />
						<Tab label="IRR" />
						<Tab label="Simple Payback" />
						<Tab label="Discounted Payback" />
						<Tab label="BCR" />
					</Tabs>
					<CustomTabPanel value={tabValue} index={0}>
						<BarChart
							dataset={dataset}
							height={250}
							xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
							margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
							series={[{ dataKey: "npvp", label: "Net Present Value Profit", color: "#ef860a" }]}
						/>
					</CustomTabPanel>
					<CustomTabPanel value={tabValue} index={1}>
						<BarChart
							dataset={dataset}
							height={250}
							xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
							margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
							series={[{ dataKey: "np", label: "Net Profit", color: "#ef860a" }]}
						/>
					</CustomTabPanel>
					<CustomTabPanel value={tabValue} index={2}>
						<BarChart
							dataset={dataset}
							height={250}
							xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
							margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
							series={[{ dataKey: "irr", label: " IRR", color: "#ef860a" }]}
						/>
					</CustomTabPanel>
					<CustomTabPanel value={tabValue} index={3}>
						<BarChart
							dataset={dataset}
							height={250}
							xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
							margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
							series={[{ dataKey: "sp", label: "Simple Payback", color: "#ef860a" }]}
						/>
					</CustomTabPanel>
					<CustomTabPanel value={tabValue} index={4}>
						<BarChart
							dataset={dataset}
							height={250}
							xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
							margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
							series={[{ dataKey: "dp", label: "Discounted Payback", color: "#ef860a" }]}
						/>
					</CustomTabPanel>
					<CustomTabPanel value={tabValue} index={5}>
						<BarChart
							dataset={dataset}
							height={250}
							xAxis={[{ data: labs(project?.alts || 2), scaleType: "band" }]}
							margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
							series={[{ dataKey: "bcr", label: "BCR", color: "#ef860a" }]}
						/>
					</CustomTabPanel>
				</Stack>
			</Stack>
		</Stack>
	);
}
