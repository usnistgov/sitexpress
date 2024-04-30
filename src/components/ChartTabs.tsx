import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { resultLabels } from "../constants";
import { Measure, Project, e3Result } from "../data/Formats";
import Chart from "./Charts";

interface ResultsDataset {
	pv: number[];
	npv: (number | string)[];
	irr: (number | string)[];
	bcr: (number | string)[];
}

const createDataset = (alts: number, measure: Measure[]): ResultsDataset => {
	return {
		pv: measure.map((m, i) => m.totalBenefits - m.totalCosts),
		npv: measure.map((m) => m.netBenefits || 0),
		irr: measure.map((m) => m.irr * 100 || 0),
		bcr: measure.map((m) => m.bcr || 0),
	};
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

const ChartTabs = (props: { project: Project; results: e3Result }) => {
	const { project, results } = props;
	const [tabValue, setTabValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const alts = project?.alts;
	const measure = results?.measure;

	const resultsData = createDataset(alts, measure);

	return (
		<Stack>
			<Tabs value={tabValue} onChange={handleChange} aria-label="result tabs">
				<Tab label={resultLabels.pv} />
				<Tab label={resultLabels.npv} />
				<Tab label={resultLabels.irr} />
				<Tab label={resultLabels.bcr} />
			</Tabs>
			<br />
			<CustomTabPanel value={tabValue} index={0}>
				<Chart project={project} label={resultLabels.pv} dataset={resultsData.pv} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={1}>
				<Chart project={project} label={resultLabels.npv} dataset={resultsData.npv} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={2}>
				<Chart project={project} label={resultLabels.irr} dataset={resultsData.irr} />
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={3}>
				<Chart project={project} label={resultLabels.bcr} dataset={resultsData.bcr} />
			</CustomTabPanel>
		</Stack>
	);
};
export default ChartTabs;
