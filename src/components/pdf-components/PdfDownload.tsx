import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import * as htmlToImage from "html-to-image";
import { useCallback } from "react";
import { createLabels, resultLabels } from "../../constants";
import { Project, Result } from "../../data/Formats";
import Pdf from "../Pdf";
import PdfCharts from "./PdfCharts";

interface PDFDownloadProps {
	project: Project;
	results: Result[];
}

/**
 * Generates a PDF file and makes it available for download.
 *
 * @param result The results to generate a PDF for.
 */
const PDFDownload = ({ project, results }: PDFDownloadProps) => {
	const generatePdf = useCallback(() => {
		const pdfGraphs = document.getElementsByClassName("pv-chart1");

		if (pdfGraphs.length === 0) return;

		const promises = [...pdfGraphs].map((graph) => htmlToImage.toPng(graph).then((graphSrc) => graphSrc));

		Promise.all(promises).then((graphSources) => {
			const blob = pdf(<Pdf project={project} graphSources={graphSources} results={results} />).toBlob();

			blob.then((blob: Blob | MediaSource) => {
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = "SitExpress Report.pdf";
				link.click();
			});
		});
	}, [project, results]);

	const createDataset = (result: Result[]) => {
		const data = { pv: [], npv: [], irr: [], bcr: [] };
		result.forEach((res: Result) => {
			data.pv.push(res.pv);
			data.npv.push(res.npv);
			data.irr.push(res.irr);
			data.bcr.push(res.bcr);
		});
		return data;
	};

	const altLabels = createLabels(project?.alts, project?.altNames);
	const dataset = createDataset(results);

	return (
		<>
			<div style={{ position: "absolute", left: 0, top: "-100vh", backgroundColor: "#FFFFFF" }}>
				{Object.entries(dataset).map(([key]) => (
					<PdfCharts key={key} label={resultLabels[key]} altLabels={altLabels} dataset={dataset} type={key} />
				))}
			</div>
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
};

export default PDFDownload;
