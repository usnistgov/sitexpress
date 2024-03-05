import {
	AlternativeBuilder,
	AnalysisBuilder,
	AnalysisType,
	BcnBuilder,
	BcnSubType,
	BcnType,
	E3,
	Output,
	ProjectType,
	// RecurBuilder,
	RequestBuilder,
	TimestepComp,
	TimestepValue,
	VarRate,
} from "e3-sdk";
// import { Cost, DiscountingMethod, EnergyCost, ID } from "../blcc-format/Format";

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
		.outputReal() // TODO add interest rate
		.discountRateReal(project.realDiscountRate ?? 3)
		.discountRateNominal(project.nominalDiscountRate ?? 5.3)
		.inflationRate(project.inflationRate ?? 2.3)
		.reinvestRate(project.inflationRate ?? 2.3); //replace with actual reinvest rate

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
	// 	// Perform the E3 analysis using the provided builder
	const analyzeE3 = async () => {
		try {
			// Replace the following line with your actual E3 analysis logic
			const result = await E3.analyze(import.meta.env.VITE_REQUEST_URL, builder, import.meta.env.VITE_API_TOKEN);

			// Handle the result as needed (e.g., update UI, store data, etc.)
			console.log("E3 analysis result:", result);
		} catch (error) {
			console.error("Error performing E3 analysis:", error);
			// Handle the error appropriately (e.g., show an error message to the user)
		}
	};

	// Call the analyzeE3 function
	analyzeE3();
}

function costToBuilders(cost): BcnBuilder[] {
	return [energyCostToBuilderCost(cost), energyCostToBuilderBenefit(cost)];
}

// function capitalCostToBuilder(cost: CapitalCost, studyPeriod: number): BcnBuilder[] {
// 	const tag = "Initial Investment";
// 	const result = [];

// 	if (cost.phaseIn) {
// 		// Create multiple phase in BCNs
// 		const adjusted = (cost.initialCost ?? 0) * Math.pow(1 + (cost.costAdjustment ?? 0), cost.phaseIn.length);

// 		result.push(
// 			...cost.phaseIn.map((phaseIn, i) =>
// 				new BcnBuilder()
// 					.type(BcnType.COST)
// 					.subType(BcnSubType.DIRECT)
// 					.name(`${cost.name} Phase-In year ${i}`)
// 					.real()
// 					.invest()
// 					.initialOccurrence(0)
// 					.life(cost.expectedLife)
// 					.addTag(tag)
// 					.quantity(1)
// 					.quantityValue(adjusted * phaseIn),
// 			),
// 		);
// 	} else {
// 		// Default BCN
// 		result.push(
// 			new BcnBuilder()
// 				.type(BcnType.COST)
// 				.subType(BcnSubType.DIRECT)
// 				.name(cost.name)
// 				.real()
// 				.invest()
// 				.initialOccurrence(0)
// 				.life(cost.expectedLife)
// 				.addTag(tag)
// 				.quantity(1)
// 				.quantityValue(cost.initialCost ?? 0),
// 		);
// 	}

// 	// Add residual value if there is any
// 	if (cost.residualValue)
// 		result.push(
// 			residualValueBcn(
// 				cost,
// 				(cost.initialCost ?? 0) + (cost.amountFinanced ?? 0),
// 				cost.residualValue,
// 				studyPeriod,
// 				cost.annualRateOfChange ?? 0,
// 				[tag],
// 			),
// 		);

// 	return result;
// }

function energyCostToBuilderCost(cost): BcnBuilder[] {
	const builder = new BcnBuilder()
		.name(cost.name)
		.real()
		.type(BcnType.COST)
		.subType(BcnSubType.DIRECT)
		.quantityValue(1)
		.quantity(1)
		.quantityVarRate(VarRate.YEAR_BY_YEAR)
		.quantityVarValue(cost.cost.map(Number));

	return [builder];
}

function energyCostToBuilderBenefit(cost): BcnBuilder[] {
	const builder = new BcnBuilder()
		.name(cost.name)
		.real()
		.type(BcnType.BENEFIT)
		.subType(BcnSubType.DIRECT)
		.quantityValue(1)
		.quantity(1)
		.quantityVarRate(VarRate.YEAR_BY_YEAR)
		.quantityVarValue(cost.revenue.map(Number));

	return [builder];
}

// function recurrence(cost: EnergyCost | WaterCost): RecurBuilder {
// 	const builder = new RecurBuilder().interval(1);

// 	if (cost.escalation)
// 		builder
// 			.varRate(VarRate.YEAR_BY_YEAR)
// 			.varValue(Array.isArray(cost.escalation) ? cost.escalation : [cost.escalation]);

// 	return builder;
// }

// function waterCostToBuilder(cost: WaterCost): BcnBuilder[] {
// 	const recurBuilder = recurrence(cost);

// 	return [
// 		...cost.usage.map((usage) => {
// 			const builder = new BcnBuilder()
// 				.name(cost.name)
// 				.addTag(cost.unit)
// 				.addTag(`${cost.name} ${usage.season} Water Usage`)
// 				.real()
// 				.invest()
// 				.recur(recurBuilder)
// 				.quantity(usage.amount)
// 				.quantityValue(usage.costPerUnit);

// 			if (cost.useIndex) {
// 				const varValue = Array.isArray(cost.useIndex) ? cost.useIndex : [cost.useIndex];
// 				builder.quantityVarValue(varValue).quantityVarRate(VarRate.YEAR_BY_YEAR);
// 			}

// 			return builder;
// 		}),
// 		...cost.disposal.map((disposal) => {
// 			const builder = new BcnBuilder()
// 				.name(cost.name)
// 				.addTag(cost.unit)
// 				.addTag(`${cost.name} ${disposal.season} Water Disposal`)
// 				.real()
// 				.invest()
// 				.recur(recurBuilder)
// 				.quantity(disposal.amount)
// 				.quantityValue(disposal.costPerUnit);

// 			if (cost.useIndex) {
// 				const varValue = Array.isArray(cost.useIndex) ? cost.useIndex : [cost.useIndex];
// 				builder.quantityVarValue(varValue).quantityVarRate(VarRate.YEAR_BY_YEAR);
// 			}

// 			return builder;
// 		}),
// 	];
// }

// function replacementCapitalCostToBuilder(cost: ReplacementCapitalCost, studyPeriod: number): BcnBuilder[] {
// 	const builder = new BcnBuilder()
// 		.name(cost.name)
// 		.real()
// 		.invest()
// 		.type(BcnType.COST)
// 		.subType(BcnSubType.DIRECT)
// 		.addTag("Replacement Capital")
// 		.life(cost.expectedLife ?? 1)
// 		.quantity(1)
// 		.quantityValue(cost.initialCost)
// 		.quantityValue(1);

// 	if (cost.residualValue)
// 		return [
// 			builder,
// 			residualValueBcn(cost, cost.initialCost, cost.residualValue, studyPeriod, cost.annualRateOfChange ?? 0),
// 		];

// 	return [builder];
// }

// function omrCostToBuilder(cost: OMRCost): BcnBuilder[] {
// 	const builder = new BcnBuilder()
// 		.name(cost.name)
// 		.addTag("OMR")
// 		.type(BcnType.COST)
// 		.subType(BcnSubType.DIRECT)
// 		.initialOccurrence(cost.initialOccurrence)
// 		.real()
// 		.quantityValue(cost.initialCost)
// 		.quantity(1);

// 	if (cost.rateOfRecurrence) {
// 		builder.addTag("OMR Recurring").recur(new RecurBuilder().interval(cost.rateOfRecurrence)); //TODO rate of change
// 	} else {
// 		builder.addTag("OMR Non-Recurring");
// 	}

// 	return [builder];
// }

// function implementationContractCostToBuilder(cost: ImplementationContractCost): BcnBuilder[] {
// 	return [
// 		new BcnBuilder()
// 			.name(cost.name)
// 			.type(BcnType.COST)
// 			.subType(BcnSubType.DIRECT)
// 			.addTag("Implementation Contract Cost")
// 			.real()
// 			.invest()
// 			.quantity(1)
// 			.quantityValue(cost.cost)
// 			.initialOccurrence(cost.occurrence + 1),
// 	];
// }

// function recurringContractCostToBuilder(cost: RecurringContractCost): BcnBuilder[] {
// 	return [
// 		new BcnBuilder()
// 			.name(cost.name)
// 			.type(BcnType.COST)
// 			.subType(BcnSubType.DIRECT)
// 			.addTag("Recurring Contract Cost")
// 			.real()
// 			.invest()
// 			.recur(new RecurBuilder().interval(cost.rateOfRecurrence ?? 1))
// 			.initialOccurrence(cost.initialOccurrence)
// 			.quantity(1)
// 			.quantityValue(cost.initialOccurrence + 1),
// 	];
// }

// function otherCostToBuilder(cost: OtherCost): BcnBuilder[] {
// 	const builder = new BcnBuilder()
// 		.name(cost.name)
// 		.real()
// 		.invest()
// 		.initialOccurrence(cost.initialOccurrence)
// 		.type(cost.costOrBenefit === CostBenefit.COST ? BcnType.COST : BcnType.BENEFIT)
// 		.subType(BcnSubType.DIRECT)
// 		.addTag("Other")
// 		.addTag(cost.tag)
// 		.addTag(cost.unit)
// 		.quantityValue(cost.valuePerUnit)
// 		.quantity(cost.numberOfUnits)
// 		.quantityUnit(cost.unit); //TODO rate of change

// 	applyRateOfChange(builder, cost);

// 	return [builder];
// }

// function otherNonMonetaryCostToBuilder(cost: OtherNonMonetary): BcnBuilder[] {
// 	const builder = new BcnBuilder()
// 		.name(cost.name)
// 		.addTag("Other Non-Monetary")
// 		.addTag(cost.unit)
// 		.addTag(cost.tag)
// 		.initialOccurrence(cost.initialOccurrence)
// 		.type(BcnType.NON_MONETARY)
// 		.subType(BcnSubType.DIRECT)
// 		.quantity(cost.numberOfUnits)
// 		.quantityValue(1);

// 	applyRateOfChange(builder, cost);

// 	return [builder];
// }

// function applyRateOfChange(builder: BcnBuilder, cost: OtherCost | OtherNonMonetary) {
// 	if (cost.rateOfChangeUnits)
// 		builder
// 			.quantityVarRate(VarRate.YEAR_BY_YEAR)
// 			.quantityVarValue(Array.isArray(cost.rateOfChangeUnits) ? cost.rateOfChangeUnits : [cost.rateOfChangeUnits]);

// 	if (cost.recurring) {
// 		const recurBuilder = new RecurBuilder().interval(1);

// 		if (cost.rateOfChangeValue) {
// 			recurBuilder
// 				.varRate(VarRate.YEAR_BY_YEAR)
// 				.varValue(Array.isArray(cost.rateOfChangeValue) ? cost.rateOfChangeValue : [cost.rateOfChangeValue]);
// 		}

// 		builder.recur(recurBuilder);
// 	}
// }

// function residualValueBcn(
// 	cost: Cost,
// 	value: number,
// 	obj: ResidualValue,
// 	studyPeriod: number,
// 	rateOfChange: number = 0,
// 	tags: string[] = [],
// ): BcnBuilder {
// 	return new BcnBuilder()
// 		.name(`${cost.name} Residual Value`)
// 		.type(BcnType.BENEFIT)
// 		.subType(BcnSubType.DIRECT)
// 		.addTag(...tags)
// 		.real()
// 		.initialOccurrence(studyPeriod + 1)
// 		.quantity(1)
// 		.quantityValue(
// 			obj.approach === DollarOrPercent.PERCENT
// 				? value * Math.pow(1 + rateOfChange, studyPeriod) * -obj.value
// 				: -obj.value,
// 		);
// }
