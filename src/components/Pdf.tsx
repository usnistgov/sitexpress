import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import PdfDisclaimer from "./pdf-components/PdfDisclaimer";

import PdfStepOne from "./pdf-components/PdfStepOne";
import PdfStepThree from "./pdf-components/PdfStepThree";
import PdfStepTwo from "./pdf-components/PdfStepTwo";
import InvoiceData from "./pdf-components/pdfInputData";

const styles = StyleSheet.create({
	page: {
		flexDirection: "row",
		// padding: 50,
		// backgroundColor: "#E4E4E4",
	},
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
	const invoice = InvoiceData;
	console.log(props);
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
