import {
	AlternativeBuilder,
	AnalysisBuilder,
	AnalysisType,
	BcnBuilder,
	BcnSubType,
	BcnType,
	E3,
	ProjectType,
	RequestBuilder,
	TimestepComp,
	TimestepValue,
	VarRate,
} from "e3-sdk";

import { Cost, Project } from "./Formats";

// take the project and create an E3 reqeust.
export function toE3Object(project: Project) {
	const builder = new RequestBuilder();

	// Setup base E3 options
	const analysisBuilder = new AnalysisBuilder()
		.type(AnalysisType.LCCA)
		.projectType(ProjectType.OTHER)
		.addOutputType("measure", "optional", "required")
		.studyPeriod(project.studyPeriod)
		.timestepValue(TimestepValue.YEAR)
		.timestepComp(TimestepComp.END_OF_YEAR);

	project?.dollarValue === "current"
		? analysisBuilder
				.discountRateReal(0)
				.discountRateNominal(+project?.nominalDR / 100)
				.inflationRate(+project?.inflationRate / 100)
				.reinvestRate(+project?.inflationRate / 100)
				.nominal()
		: analysisBuilder
				.discountRateReal(+project?.realDR / 100)
				.discountRateNominal(0)
				.inflationRate(0)
				.reinvestRate(+project?.realDR / 100)
				.real();

	// Create costs
	const costs = project?.costs;
	const costMap = new Map(
		costs.map((cost) => {
			return [cost.name, costToBuilders(cost, project)];
		}),
	);

	const alternativeBuilders = project.costs.map((alternative: Cost) => {
		const builder = new AlternativeBuilder().name(alternative.name);
		// @ts-ignore
		costMap.get(alternative?.name).forEach((costMapItem) => {
			// @ts-ignore
			builder.addBcn(...costMapItem.filter((x: BcnBuilder): x is BcnBuilder => x !== undefined));
		});
		if (alternative.name) builder.name(alternative.name);
		return builder;
	});

	alternativeBuilders[0].baseline();

	// Create complete Request Builder and return
	return builder.analysis(analysisBuilder).addAlternative(...alternativeBuilders);
}

// tasks an E3 Request Builder object and executes the request and returns the E3 output object.

export function E3Request(builder: RequestBuilder) {
	// Perform the E3 analysis using the provided builder
	const analyzeE3 = async () => {
		let res = null;
		try {
			// Replace the following line with your actual E3 analysis logic
			res = await E3.analyze(import.meta.env.VITE_REQUEST_URL, builder, import.meta.env.VITE_API_TOKEN);

			// Handle the result as needed (e.g., update UI, store data, etc.)
			console.log("E3 analysis result:", res);
		} catch (error) {
			console.error("Error performing E3 analysis:", error);
			alert(`Error performing E3 analysis:${error}`);
			// Handle the error appropriately (e.g., show an error message to the user)
		}
		return res;
	};

	// Call the analyzeE3 function
	return analyzeE3();
}

function costToBuilders(cost: Cost, project: Project): BcnBuilder[] {
	// @ts-ignore
	return [[...energyCostToBuilderCost(cost, project)], energyCostToBuilderBenefit(cost, project)];
}

function energyCostToBuilderCost(cost: Cost, project: Project): BcnBuilder[] {
	let costArr = [...cost.cost];
	const initialInvestmentVal = [costArr.shift()];

	for (let i = 0; i < project?.studyPeriod; i++) {
		initialInvestmentVal.push("0");
	}

	// BCN builder for the base case
	const initialInvestmentCostbuilder = new BcnBuilder()
		.name(cost.name)
		.invest()
		.type(BcnType.COST)
		.subType(BcnSubType.DIRECT)
		.quantityValue(1)
		.quantity(1)
		.quantityVarRate(VarRate.YEAR_BY_YEAR)
		.quantityVarValue(initialInvestmentVal.map(Number));

	costArr.unshift("0");

	// BCN builder for the other non-base cases
	const costBuilder = new BcnBuilder()
		.name(cost.name)
		.type(BcnType.COST)
		.subType(BcnSubType.DIRECT)
		.quantityValue(1)
		.quantity(1)
		.quantityVarRate(VarRate.YEAR_BY_YEAR)
		.quantityVarValue(costArr.map(Number));

	if (project.dollarValue === "constant") {
		initialInvestmentCostbuilder.real();
		costBuilder.real();
	}

	return [costBuilder, initialInvestmentCostbuilder];
}

function energyCostToBuilderBenefit(cost: Cost, project: Project): BcnBuilder[] {
	const revArr = [...cost.revenue];

	const builder = new BcnBuilder()
		.name(cost.name)
		.type(BcnType.BENEFIT)
		.subType(BcnSubType.DIRECT)
		.quantityValue(1)
		.quantity(1)
		.quantityVarRate(VarRate.YEAR_BY_YEAR)
		.quantityVarValue(revArr.map(Number));

	if (project.dollarValue === "constant") {
		builder.real();
	}

	return [builder];
}
