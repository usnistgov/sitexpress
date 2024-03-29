import { StyleSheet, Text, View } from "@react-pdf/renderer";
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

const PdfResultsTable = ({ project, results, headers }) => {
	const headerss = [
		{
			label: "Alternatives",
			key: "alt",
		},
		{
			label: "Present Value ($)",
			key: "pv",
		},
		{
			label: "Net Present Value ($)",
			key: "npv",
		},
		{
			label: "IRR (%)",
			key: "irr",
		},
		{
			label: "Payback Period (Years)",
			key: "spp",
		},
		{
			label: "Discounted Payback (Years)",
			key: "dpp",
		},
		{
			label: "BCR",
			key: "bcr",
		},
	];

	const resultss = [
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
	return (
		<View>
			{/* results Table Header */}
			<View style={styles.container}>
				<Text style={styles.cell}>{headerss[0].label}</Text>
				<Text style={styles.cell}>{headerss[1].label}</Text>
				<Text style={styles.cell}>{headerss[2].label}</Text>
				<Text style={styles.irr}>{headerss[3].label}</Text>
				<Text style={styles.cell}>{headerss[4].label}</Text>
				<Text style={styles.dpp}>{headerss[5].label}</Text>
				<Text style={styles.bcr}>{headerss[6].label}</Text>
			</View>
			{/* Results Table Rows */}
			<PdfResultsTableRow results={resultss} />
		</View>
	);
};

export default PdfResultsTable;
