import { StyleSheet, Text, View } from "@react-pdf/renderer";

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

const PdfResultsTableRow = (resultss) => {
	const results = [
		{
			alt: "Base Case",
			pv: -12677.18,
			npv: "NA",
			irr: 0,
			spp: 0,
			dpp: 0,
			bcr: "NA",
		},
		{
			alt: "Alt 1",
			pv: -19890.62,
			npv: "-7213.44",
			irr: 0.222,
			spp: 10,
			dpp: "Not Reached",
			bcr: "0.84",
		},
		{
			alt: "Alt 2",
			pv: -4028.86,
			npv: "8648.32",
			irr: 29.608,
			spp: 4,
			dpp: 4,
			bcr: "2.73",
		},
		{
			alt: "Alt 3",
			pv: 5137.75,
			npv: "17814.93",
			irr: 34.574,
			spp: 3,
			dpp: 3,
			bcr: "2.78",
		},
	];

	const rows = [];
	results?.forEach((item) =>
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
