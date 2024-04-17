import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Result } from "../../data/Formats";
import PdfResultsTable from "./PdfResultsTable";

const styles = StyleSheet.create({
	section: {
		display: "flex",
		flexDirection: "column",
		padding: 25,
		flexGrow: 1,
	},
	title: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	graphGrid: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
	},
	graphItem: {
		width: "50%",
		marginTop: 10,
		marginBottom: 10,
		alignItems: "center",
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
			<View style={styles.graphGrid}>
				{graphSources.map((src, index) => (
					<View key={index} style={styles.graphItem}>
						<Image style={styles.graph} src={src} />
					</View>
				))}
			</View>
		</View>
	);
};

export default PdfStepThree;
