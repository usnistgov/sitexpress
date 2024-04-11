import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Project, Result } from "../../data/Formats";
import PdfResultsTable from "./PdfResultsTable";

const styles = StyleSheet.create({
	section: {
		display: "flex",
		flexDirection: "column",
		padding: 25,
	},
	title: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
});

const PdfStepThree = ({ project, results }: { project: Project; results: Result[] }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Step Three: Results</Text>
			<PdfResultsTable results={results} />
		</View>
	);
};

export default PdfStepThree;
