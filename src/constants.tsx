import { altNames } from "./data/Formats";

export const resultHeaders = [
	{
		label: "Alternatives",
		key: "alt",
	},
	{
		label: "Present Value ($)",
		key: "pv",
	},
	{
		label: "Net Present Value ($)",
		key: "npv",
	},
	{
		label: "IRR (%)",
		key: "irr",
	},
	{
		label: "Payback Period (Years)",
		key: "spp",
	},
	{
		label: "Discounted Payback (Years)",
		key: "dpp",
	},
	{
		label: "BCR",
		key: "bcr",
	},
];

export const resultLabels = {
	pv: "Present Value ($)",
	npv: "Net Present Value ($)",
	irr: "IRR (%)",
	spp: "Simple Payback (years)",
	dpp: "Discounted Payback (years)",
	bcr: "BCR",
};

export const createLabels = (alts: number, names: altNames) => {
	const labels = [names?.["alt0"] || "Base Case", names?.["alt1"] || "Alternative 1"];
	for (let i = 2; i <= alts; i++) {
		labels.push(names?.[`alt${i}` as keyof altNames] || `Alternative ${i}`);
	}
	return labels;
};
