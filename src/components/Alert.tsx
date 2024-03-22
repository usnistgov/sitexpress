import { Alert, AlertTitle, List, ListItem } from "@mui/material";

const Alerts = (props: { errorTypes: string; showAlert: (show: boolean) => void }) => {
	const errorTypes = Array.from(props.errorTypes);

	const errorList = () => {
		const errors = [];
		if (errorTypes.includes("name")) errors.push("Project Name");
		if (errorTypes.includes("alts")) errors.push("Alternatives");
		if (errorTypes.includes("studyPeriod")) errors.push("Study Period");
		if (errorTypes.includes("realDR")) errors.push("Real Discount Rate");
		if (errorTypes.includes("nominalDR")) errors.push("Nominal Discount Rate");
		if (errorTypes.includes("inlfationRate")) errors.push("Inflation Rate");
		if (errorTypes.includes("costs")) errors.push("Input table");
		return errors;
	};

	return (
		<Alert
			variant="filled"
			severity="error"
			onClose={() => {
				props.showAlert(false);
			}}
		>
			<AlertTitle>Error</AlertTitle>
			Please check the following again:
			<List>
				{errorList()?.map((error) => {
					return (
						<ListItem key={error} disablePadding>
							- {error}
						</ListItem>
					);
				})}
			</List>
		</Alert>
	);
};
export default Alerts;
