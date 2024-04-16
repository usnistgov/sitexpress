// @ts-nocheck
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import Chart from "./Charts";

const createDataset = (alts: number, measure) => {
	const data = { pv: [], npv: [], irr: [], sp: [], dp: [], bcr: [] };
	for (let i = 0; i <= alts; i++) {
		data?.pv.push(measure[i]?.totalBenefits - measure[i]?.totalCosts);
		data?.npv.push(measure[i]?.netBenefits || 0);
		data?.irr.push(measure[i]?.irr * 100 || 0);
		data?.sp.push(Number.isNaN(measure[i]?.spp) ? 0 : measure[i]?.spp);
		data?.dp.push(Number.isNaN(measure[i]?.dpp) ? 0 : measure[i]?.dpp);
		data?.bcr.push(measure[i]?.bcr || 0);
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

const ChartTabs = (props) => {
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

	const resultsData = createDataset(alts, measure);

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
				<Chart project={project} label={labels.pv} dataset={resultsData.pv} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={1}>
				<Chart project={project} label={labels.npv} dataset={resultsData.npv} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={2}>
				<Chart project={project} label={labels.irr} dataset={resultsData.irr} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={3}>
				<Chart project={project} label={labels.sp} dataset={resultsData.sp} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={4}>
				<Chart project={project} label={labels.dp} dataset={resultsData.dp} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={5}>
				<Chart project={project} label={labels.bcr} dataset={resultsData.bcr} />
			</CustomTabPanel>
		</Stack>
	);
};
export default ChartTabs;
