export type altNames = {
	alt0: string;
	alt1: string;
	alt2: string;
	alt3?: string;
	alt4?: string;
	alt5?: string;
};
export type Project = {
	projectName: string;
	projectDesc?: string;
	alts: number;
	studyPeriod: number;
	dollarValue: "constant" | "current";
	realDR: number;
	nominalDR: number;
	inflationRate: number;
	costs: Cost[];
	altNames: altNames;
};

export type Type<T> = {
	type: T;
};

export type Cost = {
	name: string;
	cost: string[];
	revenue: string[];
};

export type Measure = {
	altId: number;
	totalBenefits: number;
	totalCosts: number;
	totalCostsInvest: number;
	totalCostNonInvest: number;
	totalTagFlows: {};
	netBenefits: number;
	netSavings: number;
	sir: number;
	irr: number;
	airr: number;
	dpp: number;
	spp: number;
	bcr: number;
	quantitySum: {};
	quantityUnits: {};
	marr: number;
	deltaQuantity: number;
	nsPercentQuantity: number;
	nsDeltaQuantity: number;
	nsElasticityQuantity: number;
};

export type Required = {
	totalCostsNonDiscounted: number[];
	totalCostsDiscounted: number[];
	totalBenefitsNonDiscounted: number[];
	totalBenefitsDiscounted: number[];
	totalCostsNonDiscountedInvest: number[];
	totalCostsDiscountedInvest: number[];
	totalBenefitsNonDiscountedInvest: number[];
	totalBenefitsDiscountedInvest: number[];
	totalCostsNonDiscountedNonInvest: number[];
	totalCostsDiscountedNonInvest: number[];
	totalBenefitsNonDiscountedNonInvest: number[];
	totalBenefitsDiscountedNonInvest: number[];
	totalCostsNonDiscountedDirect: number[];
	totalCostsDiscountedDirect: number[];
	totalBenefitsNonDiscountedDirect: number[];
	totalBenefitsDiscountedDirect: number[];
	totalCostsNonDiscountedIndirect: number[];
	totalCostsDiscountedIndirect: number[];
	totalBenefitsNonDiscountedIndirect: number[];
	totalBenefitsDiscountedIndirect: number[];
	totalCostsNonDiscountedExternal: number[];
	totalCostsDiscountedExternal: number[];
	totalBenefitsNonDiscountedExternal: number[];
	totalBenefitsDiscountedExternal: number[];
	altId: number;
};

export type e3Result = {
	measure: Measure[];
	optional: any[];
	required: Required[];
};

export type Result = {
	alt: string;
	pv: number;
	npv: string | string;
	irr: number | string;
	spp: number | string;
	dpp: number | String;
	bcr: number | string;
};
