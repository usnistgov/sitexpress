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

// take the project and create an E3 reqeust.
export function toE3Object(project) {
	const builder = new RequestBuilder();

	// Setup base E3 options
	const analysisBuilder = new AnalysisBuilder()
		.type(AnalysisType.LCCA)
		.projectType(ProjectType.OTHER)
		.addOutputType("measure", "optional", "required")
		.studyPeriod(project.studyPeriod)
		.timestepValue(TimestepValue.YEAR)
		.timestepComp(TimestepComp.END_OF_YEAR)
		.outputReal();

	project?.dollarValue === "current"
		? analysisBuilder
				.discountRateReal(0)
				.discountRateNominal(+project?.nominalDR)
				.inflationRate(+project?.inflationRate)
		: analysisBuilder.discountRateReal(+project?.realDR).discountRateNominal(0).inflationRate(0);

	// Create costs
	const costs = project?.costs;
	const costMap = new Map(
		costs.map((cost) => {
			return [cost.name, costToBuilders(cost)];
		}),
	);

	const alternatives = project.costs;
	const alternativeBuilders = project.costs.map((alternative) => {
		const builder = new AlternativeBuilder().name(alternative.name);
		costMap.get(alternative?.name).forEach((costMapItem) => {
			builder.addBcn(...costMapItem.filter((x): x is BcnBuilder => x !== undefined));
		});
		if (alternative.name) builder.name(alternative.name);
		return builder;
	});

	const hasBaseline = !!alternatives.find((alt) => alt["baseline"]);
	if (!hasBaseline && alternativeBuilders[0]) alternativeBuilders[0].baseline();

	// Create complete Request Builder and return
	return builder.analysis(analysisBuilder).addAlternative(...alternativeBuilders);
}

// tasks an E3 Request Builder object and executes the request and returns the E3 output object.

export function E3Request(builder) {
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

function costToBuilders(cost): BcnBuilder[] {
	return [[...energyCostToBuilderCost(cost)], energyCostToBuilderBenefit(cost)];
}

function energyCostToBuilderCost(cost): BcnBuilder[] {
	const costArr = [...cost.cost];
	const initialInvestmentVal = costArr.shift();

	// BCN builder for the base case
	const initialInvestmentCostbuilder = new BcnBuilder()
		.name(cost.name)
		.real()
		.invest()
		.type(BcnType.COST)
		.subType(BcnSubType.DIRECT)
		.quantityValue(1)
		.quantity(1)
		.quantityVarRate(VarRate.YEAR_BY_YEAR)
		.quantityVarValue([initialInvestmentVal].map(Number));

	// BCN builder for the other non-base cases
	const costBuilder = new BcnBuilder()
		.name(cost.name)
		.real()
		.type(BcnType.COST)
		.subType(BcnSubType.DIRECT)
		.quantityValue(1)
		.quantity(1)
		.quantityVarRate(VarRate.YEAR_BY_YEAR)
		.quantityVarValue(costArr.map(Number));

	return [costBuilder, initialInvestmentCostbuilder];
}

function energyCostToBuilderBenefit(cost): BcnBuilder[] {
	const revArr = [...cost.revenue];
	revArr.shift(); // removes the "Initial Investment value as it is 0"

	const builder = new BcnBuilder()
		.name(cost.name)
		.real()
		.type(BcnType.BENEFIT)
		.subType(BcnSubType.DIRECT)
		.quantityValue(1)
		.quantity(1)
		.quantityVarRate(VarRate.YEAR_BY_YEAR)
		.quantityVarValue(revArr.map(Number));

	return [builder];
}
