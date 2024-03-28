import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import PdfInputTableRow from "./PdfInputRow";

const borderColor = "#00519C";

const styles = StyleSheet.create({
	tableContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 24,
		borderWidth: 5,
		borderColor: "#3778C2",
		display: "block",
	},
	container: {
		flexDirection: "row",
		borderBottomColor: "#00519C",
		// backgroundColor: "#00519C",
		color: "#000",
		borderBottomWidth: 1,
		alignItems: "center",
		// height: 24,
		textAlign: "center",
		fontStyle: "bold",
		flexGrow: 1,
	},
	description: {
		width: "50",
		borderRightColor: borderColor,
		borderRightWidth: 1,
		border: "1px solid red",
	},
	qty: {
		// width: "25%",
		borderRightColor: borderColor,
		borderRightWidth: 1,
		border: "1px solid red",
	},
	rate: {
		// width: "15%",
		borderRightColor: borderColor,
		borderRightWidth: 1,
		border: "1px solid red",
	},
	amount: {
		// width: "15%",
		border: "1px solid red",
	},
});

const PdfInputTable = ({ project, results, headers }) => {
	console.log(project, results, headers);

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
		<View style={styles.tableContainer}>
			{/* Invoice Table Header */}
			<View style={styles.container}>
				<Text style={styles.description}>{headerss[0].label}</Text>
				<Text style={styles.qty}>{headerss[1].label}</Text>
				<Text style={styles.rate}>{headerss[2].label}</Text>
				<Text style={styles.amount}>{headerss[4].label}</Text>
				<Text style={styles.amount}>{headerss[5].label}</Text>
				<Text style={styles.amount}>{headerss[6].label}</Text>
			</View>
			<br />
			{/* Invoice Table Rows */}
			<PdfInputTableRow results={resultss} />
		</View>
	);
};

export default PdfInputTable;
