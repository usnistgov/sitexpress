import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Project, Result } from "../../data/Formats";
import PdfCharts from "./PdfCharts";
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
	graph: {
		height: 150,
		width: 300,
	},
});

const PdfStepThree = ({ results, graphSources }: { results: Result[]; graphSources: string[] }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Step Three: Results</Text>
			<PdfResultsTable results={results} />
			<br />
			{graphSources.map((src) => (
				<Image style={styles.graph} src={src} />
			))}
		</View>
	);
};

export default PdfStepThree;
