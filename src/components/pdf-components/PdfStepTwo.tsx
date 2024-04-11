import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Project } from "../../data/Formats";
import PdfInputTable from "./PdfInputTable";

const styles = StyleSheet.create({
	section: {
		display: "flex",
		flexDirection: "column",
		padding: 25,
		alignItems: "center",
	},
	title: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
});

const PdfStepTwo = ({ project }: { project: Project }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Step Two: Annual Cost/Revenue Data By Alternative</Text>
			<PdfInputTable project={project} />
		</View>
	);
};

export default PdfStepTwo;
