import { StyleSheet, Text, View } from "@react-pdf/renderer";

const borderRight = "1px solid #fff";
const backgroundColor = "#005fa3ff";
const borderBottom = "1px solid #fff";
const padding = "2px 5px";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
	},
	header: {
		borderRight,
		borderBottom,
		backgroundColor,
		padding,
		color: "#fff",
		width: "200px",
	},
	subHeaderRow: {
		backgroundColor,
		display: "flex",
		textAlign: "center",
		color: "#fff",
		width: "200px",
	},
	subHeader: {
		backgroundColor,
		borderRight,
		padding,
		color: "#fff",
		width: "100px",
	},
	col: {
		display: "flex",
		flexDirection: "column",
		width: "100px",
	},

	cellRow: {
		display: "flex",
		flexDirection: "row",
	},
	cell: {
		padding,
		borderRight: "1px solid #005fa3ff",
		borderBottom: "1px solid #005fa3ff",
	},
});

const PdfInputTableRows = ({ project }) => {
	const headers = {
		base: `Base Case`,
		alt1: `Alternative 1`,
		alt2: `Alternative 2`,
		alt3: `Alternative 3`,
		alt4: `Alternative 4`,
		alt5: `Alternative 5`,
	};

	const costs = [
		{
			name: "base",
			cost: ["5000", "1000", "1000", "1000", "1000", "1000", "1000", "1000", "1000", "1000", "1000"],
			revenue: ["0", "100", "100", "100", "100", "100", "100", "100", "100", "100", "100"],
		},
		{
			name: "alt1",
			cost: ["50000", "500", "500", "500", "500", "100", "50", "50", "50", "50", "50"],
			revenue: ["0", "1000", "1000", "2000", "5000", "5000", "5000", "5000", "5000", "5000", "5000"],
		},
		{
			name: "alt2",
			cost: ["10000", "300", "300", "300", "300", "300", "300", "300", "300", "300", "300"],
			revenue: ["0", "1000", "1000", "1000", "1000", "1000", "1000", "1000", "1000", "1000", "1000"],
		},
		{
			name: "alt3",
			cost: ["15000", "100", "100", "100", "100", "100", "100", "100", "100", "100", "100"],
			revenue: ["0", "3000", "3000", "3000", "3000", "3000", "3000", "3000", "1000", "1000", "1000"],
		},
	];
	// project.costs;

	const rows = [];
	costs?.forEach((cost) => {
		const name = cost.name;
		{
			rows.push(
				<View style={styles.container}>
					<Text style={styles.header}>{headers[name]}</Text>
					<View style={styles.subHeaderRow}>
						<Text style={styles.subHeader}>Cost ($)</Text>
						<Text style={styles.subHeader}>Revenue ($)</Text>
					</View>
					<View style={styles.cellRow}>
						<View style={styles.col}>
							{cost.cost.map((item) => (
								<Text style={styles.cell}>{item}</Text>
							))}
						</View>
						<View style={styles.col}>
							{cost.revenue.map((item) => (
								<Text style={styles.cell}>{item}</Text>
							))}
						</View>
					</View>
				</View>,
			);
		}
	});

	return <>{rows}</>;
};

export default PdfInputTableRows;
