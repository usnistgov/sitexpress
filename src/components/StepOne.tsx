import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, FormControlLabel, Radio, Stack, TextField, Tooltip, Typography } from "@mui/material";

import TextInput from "./Input";
import InputNumber from "./NumberInput";
import BasicTooltip from "./Tooltip";
// @ts-ignore
export default function StepOne(props) {
	const project = props.project;
	const handleChange = props.handleChange;

	function RadioButton(props: { value: string }) {
		return (
			<Radio
				checked={project?.dollarValue === props.value}
				onChange={(e) => handleChange("dollarValue", e)}
				value={props.value}
				name="radio-buttons"
				inputProps={{ "aria-label": props.value }}
				size="small"
			/>
		);
	}

	return (
		<Stack direction="column" className="w-full ">
			<Stack className="flex justify-center p-2 text-center" style={{ backgroundColor: "#ef860a" }}>
				<Typography variant="h6">
					Step One <br />
					Project Information
				</Typography>
				<Typography variant="body1">Provide project details and assumptions for completing the analysis.</Typography>
			</Stack>
			<br />
			<Stack className="m-auto w-1/2">
				<div className="m-auto">
					<TextInput
						className="w-80 "
						placeholder="Enter Name Here"
						label="Project Name"
						onChange={(e) => handleChange("projectName", e)}
					/>
					<BasicTooltip title="text" />
				</div>
				<br />
				<div className="m-auto">
					<TextField
						required
						className="w-80"
						label="Project Description"
						placeholder="Enter Description Here"
						maxRows={8}
						minRows={4}
						multiline
						size="small"
						onChange={(e) => handleChange("projectDesc", e)}
					/>
					<BasicTooltip title="text" />
				</div>
				<br />

				<div className="">
					<span className="flex justify-center">
						<InputNumber
							placeholder="Max Alternatives of 5 + Base Case"
							min={1}
							max={5}
							defaultValue={1}
							// @ts-ignore
							onChange={(e, val) => handleChange("alts", val)}
						/>
						<BasicTooltip title="No of Alternatives. Max Alternatives of 5 + Base Case" />
					</span>
				</div>
				<br />

				<div className="">
					<span className="flex justify-center">
						<InputNumber
							placeholder="Study Period"
							min={1}
							max={25}
							defaultValue={1}
							adornment="years"
							// @ts-ignore
							onChange={(e, val) => handleChange("studyPeriod", val)}
						/>
						<BasicTooltip title="Maximum study period of 25 years." />
					</span>
				</div>
				<br />
				<div className="m-auto">
					<div className="flex flex-row justify-center items-center ">
						<Typography variant="h6">Dollar values will be entered in</Typography>
						<Button className="refresh-btn" onClick={(e) => handleChange("refresh", e)}>
							<Tooltip title="Reset to Default Values">
								<RefreshIcon className="p-1 cursor-pointer text-white rounded bg-sky-500" fontSize="medium" />
							</Tooltip>
						</Button>
					</div>
					<Stack direction="column" className="m-auto mb-2">
						<div className="mb-2">
							<FormControlLabel
								value="constant"
								control={<RadioButton value="constant" />}
								label="Constant Dollars With Real Discount Rate"
							/>
						</div>
						<div className="m-auto">
							<TextInput
								disabled={project?.dollarValue !== "constant"}
								placeholder="Enter % Here"
								label="Real Discount Rate"
								adornment="%"
								// defaultValue={project?.realDR}
								value={project?.realDR}
								onChange={(e) => handleChange("realDR", e)}
							/>
						</div>
					</Stack>
					<Stack direction="column">
						<div className="flex justify-center mb-2">
							<FormControlLabel
								value="current"
								control={<RadioButton value="current" />}
								label="Current Dollars With Real Discount Rate"
							/>
						</div>
						<div className="m-auto">
							<TextInput
								disabled={project?.dollarValue !== "current"}
								placeholder="Enter % Here"
								label="Inflation Rate"
								adornment="%"
								// defaultValue={project?.inflationRate}
								value={project?.inflationRate}
								onChange={(e) => handleChange("inflationRate", e)}
							/>
							<br />
							<br />
							<TextInput
								disabled={project?.dollarValue !== "current"}
								placeholder="Enter % Here"
								label="Nominal Discount Rate"
								adornment="%"
								// defaultValue={project?.nominalDR}
								value={project?.nominalDR}
								onChange={(e) => handleChange("nominalDR", e)}
							/>
						</div>
					</Stack>
				</div>
			</Stack>
			<br />
		</Stack>
	);
}
