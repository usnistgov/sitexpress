import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { resultHeaders } from "../../constants";
import { Result } from "../../data/Formats";
import PdfResultsTableRow from "./PdfResultsRow";

const borderRight = "1px solid #fff";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "space-between",
		border: "1px solid black",
		color: "#fff",
		textAlign: "center",
		backgroundColor: "#005fa3ff",
	},
	cell: {
		width: "14.28%",
		borderRight,
	},
	irr: {
		width: "12%",
		borderRight,
	},
	dpp: {
		width: "18.84%",
		borderRight,
	},
	bcr: {
		width: "12%",
	},
});

const PdfResultsTable = ({ results }: { results: Result[] }) => {
	return (
		<View>
			{/* results Table Header */}
			<View style={styles.container}>
				<Text style={styles.cell}>{resultHeaders[0].label}</Text>
				<Text style={styles.cell}>{resultHeaders[1].label}</Text>
				<Text style={styles.cell}>{resultHeaders[2].label}</Text>
				<Text style={styles.irr}>{resultHeaders[3].label}</Text>
				<Text style={styles.cell}>{resultHeaders[4].label}</Text>
				<Text style={styles.dpp}>{resultHeaders[5].label}</Text>
				<Text style={styles.bcr}>{resultHeaders[6].label}</Text>
			</View>
			{/* Results Table Rows */}
			<PdfResultsTableRow results={results} />
		</View>
	);
};

export default PdfResultsTable;
