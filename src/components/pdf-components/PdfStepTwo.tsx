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
	},
});

const PdfStepTwo = ({ project }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Step Two: Annual Cost/Revenue Data By Alternative</Text>
			<br />
			<PdfInputTable project={project} />
		</View>
	);
};

export default PdfStepTwo;
