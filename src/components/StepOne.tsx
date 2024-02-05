import { FormControlLabel, Radio, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import InputNumber from "./NumberInput";

import TextInput from "./Input";
import BasicTooltip from "./Tooltip";

export default function StepOne() {
	const [project, setProject] = useState({
		projectName: "",
		projectDesc: "",
		alts: "0",
		studyperiod: "0",
		dollarvalue: "constant",
		realDR: "3",
		inflationRate: "2.3",
		nominalDR: "5.3",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setProject({ ...project, dollarvalue: event.target.value });
	};

	function RadioButton(props: { value: string }) {
		return (
			<Radio
				checked={project.dollarvalue === props.value}
				onChange={handleChange}
				value={props.value}
				name="radio-buttons"
				inputProps={{ "aria-label": props.value }}
				size="small"
			/>
		);
	}
	// style={{ border: "1px solid red" }}
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
						onChange={(e) => setProject({ ...project, projectName: e.target.value })}
					/>
					<BasicTooltip title="text" />
					<Typography variant="h6">{project.projectName}</Typography>
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
						onChange={(e) => setProject({ ...project, projectDesc: e.target.value })}
					/>
					<BasicTooltip title="text" />
				</span>
				<br />

				<span>
					<TextInput
						placeholder="Max Alternatives of 5 + Base Case"
						label="Investment Options"
						helpertext="No of Alternatives"
						onChange={(e) => setProject({ ...project, alts: e.target.value })}
					/>
					<BasicTooltip title="text" />
				</span>
				<br />

				<div>
					<span className="flex">
						<InputNumber
							placeholder="Study Period"
							min={0}
							max={25}
							onChange={(e) => setProject({ ...project, studyperiod: e.target.value })}
						/>

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
							disabled={project.dollarvalue !== "constant"}
							placeholder="Enter % Here"
							label="Real Discount Rate"
							onChange={(e) => setProject({ ...project, realDR: e.target.value })}
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
							disabled={project.dollarvalue !== "current"}
							placeholder="Enter % Here"
							label="Inflation Rate"
							onChange={(e) => setProject({ ...project, inflationRate: e.target.value })}
						/>
						<br />
						<br />
						<TextInput
							disabled={project.dollarvalue !== "current"}
							placeholder="Enter % Here"
							label="Nominal Discount Rate"
							onChange={(e) => setProject({ ...project, nominalDR: e.target.value })}
						/>
					</div>
				</Stack>
			</Stack>
			<Typography variant="h6">{project.projectName}</Typography>
			<br />
			<br /> &nbsp;
			<Typography variant="h6">{project.projectDesc}</Typography>
			<br />
			&nbsp;
			<Typography variant="h6">{project.alts}</Typography>
			<br />
			&nbsp;
			<Typography variant="h6">{project.studyperiod}</Typography>
			<br />
			&nbsp;
			<Typography variant="h6">{project.realDR}</Typography>
			<br />
			&nbsp;
			<Typography variant="h6">{project.inflationRate}</Typography>
			<br />
			&nbsp;
			<Typography variant="h6">{project.nominalDR}</Typography>
			{/*calculator image to side*/}
			<img className="calculatorImage"></img>
		</Stack>
	);
}
