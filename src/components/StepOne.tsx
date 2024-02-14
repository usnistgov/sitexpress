import { FormControlLabel, Radio, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import InputNumber from "./NumberInput";

import TextInput from "./Input";
import BasicTooltip from "./Tooltip";
export default function StepOne() {
	const [selectedValue, setSelectedValue] = useState("constant");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
		console.log(event.target.value);
	};

	function RadioButton(props: { value: string }) {
		return (
			<Radio
				checked={selectedValue === props.value}
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
					<TextInput placeholder="Enter Name Here" label="Project Name" />
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
					/>
					<BasicTooltip title="text" />
				</span>
				<br />

				<span>
					<TextInput
						placeholder="Max Alternatives of 5 + Base Case"
						label="Investment Options"
						helpertext="No of Alternatives"
					/>
					<BasicTooltip title="text" />
				</span>
				<br />

				<div className="m-auto w-full">
					<span className="flex justify-center">
						<InputNumber placeholder="Study Period" min={0} max={25} />
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
							className="disabled"
							placeholder="Enter % Here"
							label="Real Discount Rate"
							disabled={selectedValue !== "constant"}
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
						<TextInput placeholder="Enter % Here" label="Inflation Rate" disabled={selectedValue === "constant"} />
						<br />
						<br />
						<TextInput
							placeholder="Enter % Here"
							label="Nominal Discount Rate"
							disabled={selectedValue === "constant"}
						/>
					</div>
				</Stack>
			</Stack>

			{/*calculator image to side*/}
			<img className="calculatorImage"></img>
		</Stack>
	);
}
