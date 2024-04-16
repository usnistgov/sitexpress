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
		height: 200,
		width: 400,
	},
});

const PdfStepThree = ({ project, results, graphSrc }: { project: Project; results: Result[]; graphSrc: string }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Step Three: Results</Text>
			<PdfResultsTable results={results} />
			<Image style={styles.graph} src={graphSrc} />
			{/* <PdfCharts project={project} label="Present Value" results={results} /> */}
		</View>
	);
};

export default PdfStepThree;
