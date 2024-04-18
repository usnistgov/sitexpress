import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { resultLabels } from "../constants";
import { Result } from "../data/Formats";

const ResultsTable = (props: { tableRows: Result[] }) => {
	const { tableRows } = props;

	console.log(tableRows);
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table" sx={{ "td, th": { border: "1px solid black" } }}>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						{Object.entries(resultLabels).map(([key, value]) => (
							<TableCell align="center" key={key} className="results-table-header">
								{value}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{tableRows.map((row) => (
						<TableRow key={row.alt + "-row"}>
							{Object.entries(row).map(([key, value]) => (
								<TableCell
									align={key === "alt" ? "center" : "right"}
									key={key + row.alt}
									className={key === "alt" ? "results-table-header" : ""}
								>
									{value}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ResultsTable;
