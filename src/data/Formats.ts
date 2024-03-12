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
};

export type Type<T> = {
	type: T;
};

export type Cost = {
	name: string;
	cost: string[];
	revenue: string[];
};
