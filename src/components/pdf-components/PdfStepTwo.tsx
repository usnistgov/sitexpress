import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	section: {
		display: "flex",
		flexDirection: "column",
		// margin: 10,
		padding: 50,
		// flexGrow: 1,
		border: "1px solid black",
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		fontFamily: "Oswald",
	},
});

const PdfStepTwo = ({ project }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Step Two: Annual Cost/Revenue Data By Alternative</Text>
		</View>
	);
};

export default PdfStepTwo;
