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
});

const PdfResultsTableRow = ({ results }: { results: Result[] }) => {
	const rows: JSX.Element[] = [];
	results?.forEach((item: Result) =>
		rows.push(
			<View style={styles.row} key={item.alt}>
				<Text style={{ ...cellStyles.alt, borderRight: border }}>{item.alt}</Text>
				<Text style={{ ...cellStyles.pv, borderRight: border }}>{item.pv}</Text>
				<Text style={{ ...cellStyles.npv, borderRight: border }}>{item.npv}</Text>
				<Text style={{ ...cellStyles.irr, borderRight: border }}>{item.irr}</Text>
				<Text style={{ ...cellStyles.spp, borderRight: border }}>{item.spp}</Text>
				<Text style={{ ...cellStyles.dpp, borderRight: border }}>{item.dpp}</Text>
				<Text style={{ ...cellStyles.bcr, borderRight: border }}>{item.bcr}</Text>
			</View>,
		),
	);
	return <>{rows}</>;
};

export default PdfResultsTableRow;
