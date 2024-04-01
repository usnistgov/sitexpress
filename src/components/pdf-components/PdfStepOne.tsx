import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	section: {
		display: "flex",
		flexDirection: "column",
		padding: 50,
		border: "1px solid black",
	},
	title: {
		fontSize: 24,
		textAlign: "center",
	},
});

const PdfStepOne = ({ project }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Step One: Project Information</Text>
			<br />
			<Text>
				<b>Project Name:</b>
				{project.projectName}
			</Text>
			<br />
			<Text>
				<b>Project Description:</b> {project.projectDesc}
			</Text>
			<br />
			<Text>
				<b>Number of Alternatives:</b> {project.alts}
			</Text>
			<br />
			<Text>
				<b>Study Period:</b> {project.studyPeriod} year(s)
			</Text>
			<br />
			{project.dollarValue === "constant" ? (
				<Text>
					<b>Real Discount Rate:</b> {project.realDR}%
				</Text>
			) : (
				<>
					<Text>
						<b>Inflation Rate:</b> {project.inflationRate}%
					</Text>
					<br />
					<Text>
						<b>Nominal Discount Rate:</b> {project.nominalDR}%
					</Text>
				</>
			)}
		</View>
	);
};

export default PdfStepOne;
