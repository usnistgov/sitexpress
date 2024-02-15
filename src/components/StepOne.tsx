import { Button, FormControlLabel, Radio, Stack, TextField, Typography } from "@mui/material";
import InputNumber from "./NumberInput";

import TextInput from "./Input";
import BasicTooltip from "./Tooltip";

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
		<Stack direction="column" className="w-full text-center">
			<Stack className="flex justify-center  p-2" style={{ backgroundColor: "#ef860a" }}>
				<Typography variant="h6">
					Step One <br />
					Project Information
				</Typography>
				<Typography variant="body1">Provide project details and assumptions for completing the analysis.</Typography>
			</Stack>

			<Stack className="p-10 flex flex-col justify-center">
				<span>
					<TextInput
						placeholder="Enter Name Here"
						label="Project Name"
						onChange={(e) => handleChange("projectName", e)}
					/>
					<BasicTooltip title="text" />
				</span>
				<br />

				<span>
					<TextField
						className="w-1/3"
						label="Project Description"
						placeholder="Enter Description Here"
						maxRows={8}
						minRows={4}
						multiline
						size="small"
						onChange={(e) => handleChange("projectDesc", e)}
					/>
					<BasicTooltip title="text" />
				</span>
				<br />

				<div className="m-auto w-full">
					<span className="flex justify-center">
						<InputNumber
							placeholder="Max Alternatives of 5 + Base Case"
							min={0}
							max={5}
							defaultValue={project?.alts || 2}
							onChange={(e) => handleChange("alts", e)}
						/>
						<BasicTooltip title="text" />
					</span>
					<span className="">
						<Typography className="" variant="caption">
							No of Alternatives
						</Typography>
					</span>
				</div>
				<br />

				<div className="m-auto w-full">
					<span className="flex justify-center">
						<InputNumber
							placeholder="Study Period"
							min={0}
							max={25}
							defaultValue={project?.studyPeriod}
							adornment="years"
							onChange={(e) => handleChange("studyPeriod", e)}
						/>
						<BasicTooltip title="text" />
					</span>
					<span className="">
						<Typography className="" variant="caption">
							Maximum study period of 25 years.
						</Typography>
					</span>
				</div>
				<br />

				<Typography variant="body1">Dollar values will be entered in:</Typography>

				<Stack direction="column">
					<div className="flex justify-center">
						<FormControlLabel
							value="constant"
							control={<RadioButton value="constant" />}
							label="Constant Dollars With Real Discount Rate"
						/>
					</div>
					<div>
						<TextInput
							disabled={project?.dollarValue !== "constant"}
							placeholder="Enter % Here"
							label="Real Discount Rate"
							defaultValue={project?.realDR}
							onChange={(e) => handleChange("realDR", e)}
						/>
						<br />
					</div>
				</Stack>
				<br />
				<Stack direction="column">
					<div className="flex justify-center">
						<FormControlLabel
							value="current"
							control={<RadioButton value="current" />}
							label="Current Dollars With Real Discount Rate"
						/>
					</div>
					<div>
						<TextInput
							disabled={project?.dollarValue !== "current"}
							placeholder="Enter % Here"
							label="Inflation Rate"
							defaultValue={project?.inflationRate}
							onChange={(e) => handleChange("inflationRate", e)}
						/>
						<br />
						<br />
						<TextInput
							disabled={project?.dollarValue !== "current"}
							placeholder="Enter % Here"
							label="Nominal Discount Rate"
							defaultValue={project?.nominalDR}
							onChange={(e) => handleChange("nominalDR", e)}
						/>
					</div>
					<Button onClick={() => console.log(project)}>Click Me</Button>
				</Stack>
			</Stack>
			{/*calculator image to side*/}
			<img className="calculatorImage"></img>
		</Stack>
	);
}
