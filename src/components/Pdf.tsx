import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import PdfDisclaimer from "./pdf-components/PdfDisclaimer";

import { Project, Result } from "../data/Formats";
import PdfStepOne from "./pdf-components/PdfStepOne";
import PdfStepThree from "./pdf-components/PdfStepThree";
import PdfStepTwo from "./pdf-components/PdfStepTwo";

Font.register({
	family: "Audiowide",
	fonts: [{ src: "https://cdn.jsdelivr.net/fontsource/fonts/audiowide@latest/latin-400-normal.woff2" }],
});

const styles = StyleSheet.create({
	section: {
		display: "flex",
		flexDirection: "column",
		padding: 50,
		border: "1px solid black",
	},
	title: {
		fontSize: 24,
		textAlign: "center",
	},
	pageNumber: {
		position: "absolute",
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		color: "grey",
	},
	mainHeader: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 25,
	},
	headerNistLogo: {
		display: "flex",
		justifyContent: "flex-end",
		width: "80px",
		height: "20px",
		alignSelf: "flex-end",
	},
	logo: {
		display: "flex",
		justifyContent: "center",
		width: "400px",
		height: "60px",
		marginBottom: 10,
	},
	date: {
		display: "flex",
		justifyContent: "flex-end",
		fontSize: 14,
	},
});

const Pdf = (props: { project: Project; results: Result[]; graphSrc: string }) => {
	const { project, results, graphSrc } = props;
	return (
		<Document>
			<Page size="A4">
				<View style={styles.mainHeader} fixed>
					<Image
						style={{ ...styles.headerNistLogo, marginBottom: 25 }}
						src={"/images/645px-nist_logo-svg_1.png"}
						fixed
					/>
					<br />
					<Image style={styles.logo} src={"/images/ss.png"} />
					<Text style={styles.date}>Report Generated: {new Date().toLocaleDateString()}</Text>
				</View>
				<PdfStepOne project={project} />
				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
					fixed
				/>
			</Page>
			<Page orientation="landscape">
				<View style={styles.mainHeader} fixed>
					<Image style={styles.headerNistLogo} src={"/images/645px-nist_logo-svg_1.png"} fixed />
				</View>
				<PdfStepTwo project={project} />
			</Page>
			<Page>
				<View style={styles.mainHeader} fixed>
					<Image style={styles.headerNistLogo} src={"/images/645px-nist_logo-svg_1.png"} fixed />
				</View>
				<PdfStepThree project={project} results={results} graphSrc={graphSrc} />
				<PdfDisclaimer />
			</Page>
		</Document>
	);
};

export default Pdf;
