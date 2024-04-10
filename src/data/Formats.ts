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
	altNames: string[];
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
	npm: string;
	irr: number | string;
	spp: number | string;
	dpp: number | String;
	bcr: number | string;
};
