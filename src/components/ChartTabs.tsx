// @ts-nocheck
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import Chart from "./Charts";
// @ts-ignore
const createPVDataset = (alts: number, measure) => {
	const data = [];
	for (let i = 0; i <= alts; i++) {
		data.push(measure[i]?.totalBenefits - measure[i]?.totalCosts);
	}
	return data;
};

const createNPVDataset = (alts: number, measure) => {
	const data = [];
	for (let i = 0; i <= alts; i++) {
		data.push(measure[i]?.netBenefits || 0);
	}
	return data;
};

const createIRRDataset = (alts: number, measure) => {
	const data = [];
	for (let i = 0; i <= alts; i++) {
		data.push(measure[i]?.irr * 100 || 0);
	}
	return data;
};

const createBCRDataset = (alts: number, measure) => {
	const data = [];
	for (let i = 0; i <= alts; i++) {
		data.push(measure[i]?.bcr || 0);
	}
	return data;
};

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`tab-${index}`} aria-labelledby={`tab-${index}`} {...other}>
			{value === index && <Typography>{children}</Typography>}
		</div>
	);
}

export default function ChartTabs(props) {
	const { project, results } = props;
	const [tabValue, setTabValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const labels = {
		pv: "Present Value",
		npv: "Net Present Value",
		irr: "IRR",
		sp: "Simple Payback",
		dp: "Discounted Payback",
		bcr: "BCR",
	};

	const alts = project?.alts;
	const measure = results?.measure;

	return (
		<Stack>
			<Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
				<Tab label={labels.pv} />
				<Tab label={labels.npv} />
				<Tab label={labels.irr} />
				<Tab label={labels.bcr} />
			</Tabs>
			<br />
			<CustomTabPanel value={tabValue} index={0}>
				<Chart project={project} label={labels.pv} dataset={createPVDataset(alts, measure)} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={1}>
				<Chart project={project} label={labels.npv} dataset={createNPVDataset(alts, measure)} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={2}>
				<Chart project={project} label={labels.irr} dataset={createIRRDataset(alts, measure)} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={3}>
				<Chart project={project} label={labels.bcr} dataset={createBCRDataset(alts, measure)} />
			</CustomTabPanel>
		</Stack>
	);
}
