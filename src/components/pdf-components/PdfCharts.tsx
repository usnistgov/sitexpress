import { Document, Image, PDFViewer, Page, View } from "@react-pdf/renderer";
import * as htmlToImage from "html-to-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
	},
};

function PdfCharts(props) {
	const { project, label, results } = props;
	const [src, setSrc] = useState("");

	const datas = {
		labels: ["Base Case", "Alternative 1", "Alternative 2", "Alternative 3"],
		datasets: [
			{
				label: "Present Value",
				data: [-12677.18, -19890.62, -4028.86, 5137.75],
				backgroundColor: "#1975d1ff",
			},
		],
	};

	const pdfGraphRef = useRef(null);

	useEffect(() => {
		<Bar className="max-h-80" options={options} data={datas} id="pv-chart1" />;
	}, []);

	console.log(pdfGraphRef);

	const captureChart = useCallback(() => {
		// if (pdfGraphRef.current) {
		htmlToImage.toPng(document?.getElementById("pv-chart1")).then((url) => {
			// generatePdf(url);
			setSrc(url);
		});
		// }
	}, []);

	console.log(captureChart());

	const generatePdf = useCallback((chartImageUrl) => {
		<Image src={chartImageUrl} />;

		// pdf(doc)
		// 	.toBlob()
		// 	.then((blob) => {
		// 		const url = window.URL.createObjectURL(blob);
		// 		const link = document.createElement("a");
		// 		link.href = url;
		// 		link.download = "PV2 Analysis Report.pdf";
		// 		link.click();
		// 	});
	}, []);

	return (
		<View>
			<canvas id="myChart" ref={pdfGraphRef}></canvas>
			{/* {generatePdf(captureChart())} */}
			<Image src={src} style={{ display: "flex", height: 100, width: 100, border: "1px solid black" }} />
		</View>
	);
}

export default PdfCharts;
