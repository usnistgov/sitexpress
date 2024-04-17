import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Project } from "../../data/Formats";

const styles = StyleSheet.create({
	section: {
		display: "flex",
		flexDirection: "column",
		padding: 25,
	},
	title: {
		fontSize: 18,
		textAlign: "center",
		marginBottom: 20,
	},
	key: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 10,
	},
	text: {
		fontSize: 14,
		color: "#979797",
	},
	value: {
		fontSize: 14,
	},
});

const PdfStepOne = ({ project }: { project: Project }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Step One: Project Information</Text>
			<View style={styles.key}>
				<Text style={styles.text}>Project Name:&nbsp;</Text>
				<Text style={styles.value}>{project.projectName}</Text>
			</View>
			<br />
			{project?.projectDesc ?? (
				<>
					<View style={styles.key}>
						<Text style={styles.text}>Project Description:&nbsp;</Text>
						<Text style={styles.value}>{project.projectDesc}</Text>
					</View>
					<br />
				</>
			)}
			<View style={styles.key}>
				<Text style={styles.text}>Number of Alternatives:&nbsp;</Text>
				<Text style={styles.value}>{project.alts}</Text>
			</View>
			<br />
			<View style={styles.key}>
				<Text style={styles.text}>Study Period:&nbsp;</Text>
				<Text style={styles.value}>{project.studyPeriod} year(s)</Text>
			</View>
			<br />

			{project.dollarValue === "constant" ? (
				<>
					<View style={styles.key}>
						<Text style={styles.text}>Dollar Value:&nbsp;</Text>
						<Text style={styles.value}>Constant</Text>
					</View>
					<View style={styles.key}>
						<Text style={styles.text}>Real Discount Rate:&nbsp;</Text>
						<Text style={styles.value}>{project.realDR}%</Text>
					</View>
				</>
			) : (
				<>
					<View style={styles.key}>
						<Text style={styles.text}>Dollar Value:&nbsp;</Text>
						<Text style={styles.value}>Current</Text>
					</View>
					<View style={styles.key}>
						<Text style={styles.text}>Inflation Rate:&nbsp;</Text>
						<Text style={styles.value}>{project.inflationRate}%</Text>
					</View>
					<br />
					<View style={styles.key}>
						<Text style={styles.text}>Nominal Discount Rate:&nbsp;</Text>
						<Text style={styles.value}>{project.nominalDR}%</Text>
					</View>
					<br />
				</>
			)}
		</View>
	);
};

export default PdfStepOne;
