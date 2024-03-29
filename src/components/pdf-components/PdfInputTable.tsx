import { StyleSheet, Text, View } from "@react-pdf/renderer";
import PdfInputTableRows from "./PdfInputTableRows";

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
		width: "14.285%",
		borderRight,
	},
	cost: {
		width: "7.145%",
		borderRight,
	},
});

const PdfInputTable = ({ project }) => {
	const alts = 5;
	const headerss = [
		{
			label: "Years",
			key: "year",
			cost: "",
			rev: "",
		},
		{
			label: "Base Case",
			key: `base`,
			cost: "Cost ($)",
			rev: "Revenue ($)",
		},
		{
			label: `Alternative 1`,
			key: `alt-1`,
			cost: "Cost ($)",
			rev: "Revenue ($)",
		},
	];
	for (let i = 2; i <= alts; i++) {
		headerss.push({
			label: `Alternative ${i}`,
			key: `alt-${i}`,
			cost: "Cost ($)",
			rev: "Revenue ($)",
		});
	}

	return (
		<View>
			{/* input Table Header */}
			<View style={styles.container}>
				{headerss.map((header) => {
					return <Text style={styles.cell}>{header.label}</Text>;
				})}
			</View>
			<View style={styles.container}>
				{headerss.map((header) => {
					return (
						<>
							<Text style={styles.cost}>{header.cost}</Text>
							<Text style={styles.cost}>{header.rev}</Text>
						</>
					);
				})}
			</View>
			{/* input Table Rows */}
			<PdfInputTableRows project={project} />
		</View>
	);
};

export default PdfInputTable;
