import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { JSX } from "react/jsx-runtime";
import { Project } from "../../data/Formats";

const borderRight = "1px solid #fff";
const backgroundColor = "#005fa3ff";
const borderBottom = "1px solid #fff";
const padding = "2px 2px";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
	},
	header: {
		display: "flex",
		flexDirection: "column",
		borderRight,
		borderBottom,
		backgroundColor,
		padding,
		color: "#fff",
		width: 120,
	},
	subHeaderRow: {
		backgroundColor,
		display: "flex",
		flexDirection: "row",
		textAlign: "center",
		color: "#fff",
		width: 120,
	},
	subHeader: {
		backgroundColor,
		borderRight,
		padding,
		color: "#fff",
		width: 60,
	},
	col: {
		display: "flex",
		flexDirection: "column",
		width: 60,
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

const PdfInputTableRows = ({ project }: { project: Project }) => {
	const headers: {
		base: string;
		alt1: string;
		alt2: string;
		alt3: string;
		alt4: string;
		alt5: string;
	} = {
		base: project?.altNames?.alt0 || `Base Case`,
		alt1: project?.altNames?.alt1 || `Alternative 1`,
		alt2: project?.altNames?.alt2 || `Alternative 2`,
		alt3: project?.altNames?.alt3 || `Alternative 3`,
		alt4: project?.altNames?.alt4 || `Alternative 4`,
		alt5: project?.altNames?.alt5 || `Alternative 5`,
	};

	const costs = project.costs;

	const rows: JSX.Element[] = [];
	costs?.forEach((cost) => {
		const name: string = cost.name;
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
