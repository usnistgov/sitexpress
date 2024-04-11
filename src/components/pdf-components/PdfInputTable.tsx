import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Project } from "../../data/Formats";
import PdfInputTableRows from "./PdfInputTableRows";

const fontSize = 10;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		border: "1px solid #005fa3ff",
		borderBottom: 0,
		borderRight: 0,
		textAlign: "center",
	},
	defaultCol: {
		display: "flex",
		flexDirection: "column",
		fontSize,
	},
	altCol: {
		display: "flex",
		flexDirection: "row",
		fontSize,
	},
	header: {
		borderRight: "1px solid #fff",
		borderBottom: "1px solid #fff",
		backgroundColor: "#005fa3ff",
		color: "#fff",
		padding: "2px 5px",
		fontSize,
	},
});

const PdfInputTable = ({ project }: { project: Project }) => {
	const defaultCol = [
		{
			label: "Years",
			key: "year",
		},
		{
			label: "Cost/Revenue",
			key: "cost-rev",
		},
		{
			label: "Initial Investment",
			key: "year-0",
		},
	];

	for (let i = 1; i <= project?.studyPeriod; i++) {
		defaultCol.push({
			label: `${i}`,
			key: `year-${i}`,
		});
	}

	return (
		<View style={styles.container}>
			<View style={styles.defaultCol}>
				{defaultCol.map((header) => (
					<Text style={styles.header}>{header.label}</Text>
				))}
			</View>
			<View style={styles.altCol}>
				<PdfInputTableRows project={project} />
			</View>
		</View>
	);
};

export default PdfInputTable;
