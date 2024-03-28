import { StyleSheet, Text, View } from "@react-pdf/renderer";
import PdfInputTable from "./PdfInputTable";

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
		fontFamily: "Oswald",
	},
});

const PdfStepThree = ({ project, results, headers }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Step Three: Results</Text>
			<br />
			<PdfInputTable project={project} results={results} headers={headers} />
		</View>
	);
};

export default PdfStepThree;
