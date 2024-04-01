import { Document, Image, Page, StyleSheet, Text } from "@react-pdf/renderer";

import PdfDisclaimer from "./pdf-components/PdfDisclaimer";

import PdfStepOne from "./pdf-components/PdfStepOne";
import PdfStepThree from "./pdf-components/PdfStepThree";
import PdfStepTwo from "./pdf-components/PdfStepTwo";

const styles = StyleSheet.create({
	page: {
		flexDirection: "row",
	},
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
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerNistLogo: {
		width: "127px",
		height: "34px",
	},
	headerPV2Logo: {
		width: "128px",
		height: "38px",
	},
});

const Pdf = (props) => {
	const { project, results, headers } = props;
	return (
		<Document>
			<Page size="LETTER">
				<Image style={styles.headerNistLogo} src={"/images/645px-nist_logo-svg_1.png"} />
				<Image style={styles.headerPV2Logo} src={"../logo.png"} />
				<PdfStepOne project={project} />
				<PdfStepTwo project={project} />
				<PdfStepThree project={project} results={results} headers={headers} />
				<PdfDisclaimer />
				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
					fixed
				/>
			</Page>
		</Document>
	);
};

export default Pdf;
