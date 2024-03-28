import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const borderColor = "#3778C2";
const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		borderBottomColor: "#3778C2",
		borderBottomWidth: 1,
		alignItems: "center",
		height: 24,
		fontStyle: "bold",
	},
	description: {
		width: "60%",
		textAlign: "left",
		borderRightColor: borderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
	},
	qty: {
		width: "10%",
		borderRightColor: borderColor,
		borderRightWidth: 1,
		textAlign: "right",
		paddingRight: 8,
	},
	rate: {
		width: "15%",
		borderRightColor: borderColor,
		borderRightWidth: 1,
		textAlign: "right",
		paddingRight: 8,
	},
	amount: {
		width: "15%",
		textAlign: "right",
		paddingRight: 8,
	},
});

const PdfInputTableRow = (resultss) => {
	console.log(resultss);

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
			<>
				<View style={styles.row} key={item.alt}>
					<Text style={styles.description}>{item.alt}</Text>
					<Text style={styles.qty}>{item.pv}</Text>
					<Text style={styles.rate}>{item.npv}</Text>
					<Text style={styles.description}>{item.irr}</Text>
					<Text style={styles.qty}>{item.spp}</Text>
					<Text style={styles.rate}>{item.dpp}</Text>
					<Text style={styles.amount}>{item.bcr}</Text>
				</View>
				<br />
			</>,
		),
	);
	// console.log(rows);
	// return <></>;
	return <>{rows}</>;
};

export default PdfInputTableRow;