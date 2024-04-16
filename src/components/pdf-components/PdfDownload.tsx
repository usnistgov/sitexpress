import { Button } from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { pdf } from "@react-pdf/renderer";

import Pdf from "../Pdf";

import { useCallback, useState } from "react";

import * as htmlToImage from "html-to-image";
import { Project } from "../../data/Formats";
import PdfCharts from "./PdfCharts";

interface PDFDownloadProps {
	project: Project;
	results: any;
}

/**
 * Generates a PDF file and makes it available for download.
 *
 * @param result The results to generate a PDF for.
 */
export default function PDFDownload({ project, results }: PDFDownloadProps) {
	const [src, setSrc] = useState("");
	const generatePdf = useCallback(() => {
		const pdfGraph = document.getElementById("pv-chart1");

		if (pdfGraph == null) return;

		htmlToImage
			.toPng(pdfGraph)
			.then(async (graphSrc) => {
				setSrc(graphSrc);
				return pdf(<Pdf project={project} graphSrc={graphSrc} results={results} />).toBlob();
			})
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = "SitExpress Report.pdf";

				link.click();
			});
	}, [src]);

	return (
		<>
			<PdfCharts
				className="hidden"
				style={{ display: "hidden" }}
				project={project}
				label="Present Value"
				results={results}
			/>
			<Button
				variant={"contained"}
				color={"primary"}
				startIcon={<FileDownloadIcon className="cursor-pointer text-white rounded" fontSize="medium" />}
				onClick={generatePdf}
			>
				PDF
			</Button>
		</>
	);
}
