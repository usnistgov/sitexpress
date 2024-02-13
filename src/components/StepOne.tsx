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
		<Stack direction="row" className="w-full">
			<Stack className="flex justify-center text-center p-2 w-1/3 max-w-1/3 bg-orange-400">
				<Typography variant="h6">Step One: Project Information</Typography>
				<Typography variant="body1">Provide project details and assumptions for completing the analysis.</Typography>
			</Stack>
			<Stack className=" w-2/3 p-10">
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

				<span>
					<TextInput
						placeholder="Max Alternatives of 5 + Base Case"
						label="Investment Options"
						helpertext="No of Alternatives"
						onChange={(e) => handleChange("alts", e)}
					/>
					<BasicTooltip title="text" />
				</span>
				<br />

				<div>
					<span className="flex">
						<InputNumber placeholder="Study Period" min={0} max={25} onChange={(e) => handleChange("studyPeriod", e)} />
						<BasicTooltip title="text" />
					</span>
					<Typography variant="caption">Maximum study period of 25 years.</Typography>
				</div>
				<br />

				<Typography variant="body1">Dollar values will be entered in:</Typography>

				<Stack direction="column">
					<div className="flex">
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
					<div className="flex">
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
