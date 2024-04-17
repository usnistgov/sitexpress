type altNames = {
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
	dollarValue: "constant" | "current";
	studyPeriod: number;
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

export type Result = {
	alt: string;
	pv: number;
	npv: string;
	irr: number | string;
	spp: number | string;
	dpp: number | String;
	bcr: number | string;
};
