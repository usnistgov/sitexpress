import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { resultHeaders } from "../../constants";
import { Result } from "../../data/Formats";
import PdfResultsTableRow from "./PdfResultsRow";

const borderRight = "1px solid #fff";
const fontSize = 10;

export const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		color: "#fff",
		textAlign: "center",
		backgroundColor: "#005fa3ff",
	},
	alt: {
		width: "14.28%",
		borderRight,
		fontSize,
	},
	pv: {
		width: "17.28%",
		fontSize,
		borderRight,
	},
	npv: {
		width: "20.28%",
		fontSize,
		borderRight,
	},
	irr: {
		width: "12%",
		borderRight,
		fontSize,
	},
	spp: {
		width: "16.28%",
		fontSize,
		borderRight,
	},
	dpp: {
		width: "18.84%",
		borderRight,
		fontSize,
	},
	bcr: {
		width: "7%",
		fontSize,
	},
});

const PdfResultsTable = ({ results }: { results: Result[] }) => {
	return (
		<View>
			{/* results Table Header */}
			<View style={styles.container}>
				<Text style={styles.alt}>{resultHeaders[0].label}</Text>
				<Text style={styles.pv}>{resultHeaders[1].label}</Text>
				<Text style={styles.npv}>{resultHeaders[2].label}</Text>
				<Text style={styles.irr}>{resultHeaders[3].label}</Text>
				<Text style={styles.spp}>{resultHeaders[4].label}</Text>
				<Text style={styles.dpp}>{resultHeaders[5].label}</Text>
				<Text style={styles.bcr}>{resultHeaders[6].label}</Text>
			</View>
			{/* Results Table Rows */}
			<PdfResultsTableRow results={results} />
		</View>
	);
};

export default PdfResultsTable;
