import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { JSX } from "react/jsx-runtime";
import { Result } from "../../data/Formats";
import { styles as cellStyles } from "./PdfResultsTable";

const border = "1px solid #005fa3ff";

const styles = StyleSheet.create({
	row: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		textAlign: "center",
		border,
		marginTop: 0,
	},
	cell: { borderRight: border, padding: 2, textAlign: "right" },
});

const PdfResultsTableRow = ({ results }: { results: Result[] }) => {
	const rows: JSX.Element[] = [];
	results?.forEach((item: Result) =>
		rows.push(
			<View style={styles.row} key={item.alt}>
				<Text style={{ ...cellStyles.alt, borderRight: border }}>{item.alt}</Text>
				<Text style={{ ...cellStyles.pv, ...styles.cell }}>{item.pv}</Text>
				<Text style={{ ...cellStyles.npv, ...styles.cell }}>{item.npv}</Text>
				<Text style={{ ...cellStyles.irr, ...styles.cell }}>{item.irr}</Text>
				<Text style={{ ...cellStyles.spp, ...styles.cell }}>{item.spp}</Text>
				<Text style={{ ...cellStyles.dpp, ...styles.cell }}>{item.dpp}</Text>
				<Text style={{ ...cellStyles.bcr, ...styles.cell }}>{item.bcr}</Text>
			</View>,
		),
	);
	return <>{rows}</>;
};

export default PdfResultsTableRow;
