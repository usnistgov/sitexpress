import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { JSX } from "react/jsx-runtime";
import { Result } from "../../data/Formats";

const borderRight = "1px solid #005fa3ff";

const styles = StyleSheet.create({
	row: {
		display: "flex",
		justifyContent: "space-between",
		textAlign: "center",
		border: "1px solid #005fa3ff",
		marginTop: 0,
	},
	cell: {
		width: "14.28%",
		borderRight,
	},
	irr: {
		width: "12%",
		borderRight,
	},
	bcr: {
		width: "12%",
	},
	dpp: {
		width: "18.84%",
		borderRight,
	},
});

const PdfResultsTableRow = ({ results }: { results: Result[] }) => {
	const rows: JSX.Element[] = [];
	results?.forEach((item: Result) =>
		rows.push(
			<View style={styles.row} key={item.alt}>
				<Text style={styles.cell}>{item.alt}</Text>
				<Text style={styles.cell}>{item.pv}</Text>
				<Text style={styles.cell}>{item.npv}</Text>
				<Text style={styles.irr}>{item.irr}</Text>
				<Text style={styles.cell}>{item.spp}</Text>
				<Text style={styles.dpp}>{item.dpp}</Text>
				<Text style={styles.bcr}>{item.bcr}</Text>
			</View>,
		),
	);
	return <>{rows}</>;
};

export default PdfResultsTableRow;
