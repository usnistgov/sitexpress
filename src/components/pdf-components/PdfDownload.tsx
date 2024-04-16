import {
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";

import Pdf from "../Pdf";
import BasicTooltip from "../Tooltip";

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
		console.log(pdfGraph);

		if (pdfGraph == null) return;

		htmlToImage
			.toPng(pdfGraph)
			.then(async (graphSrc) => {
				setSrc(graphSrc);
				console.log(graphSrc);
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
			<PdfCharts project={project} label="Present Value" result={results} />
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
