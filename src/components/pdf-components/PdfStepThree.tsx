import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Project, Result } from "../../data/Formats";
import PdfResultsTable from "./PdfResultsTable";

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

const PdfStepThree = ({ project, results }: { project: Project; results: Result[] }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Step Three: Results</Text>
			<br />
			<PdfResultsTable results={results} />
		</View>
	);
};

export default PdfStepThree;
