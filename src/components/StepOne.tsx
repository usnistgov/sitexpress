import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
	Box,
	Button,
	FormControlLabel,
	InputLabel,
	Modal,
	Radio,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "#f7f9faff",
	border: "2px solid #ef860a",
	boxShadow: 24,
	p: 4,
};

import { useState } from "react";
import TextInput from "./Input";
import InputNumber from "./NumberInput";
import BasicTooltip from "./Tooltip";
// @ts-ignore
export default function StepOne(props) {
	const project = props.project;
	const handleChange = props.handleChange;
	const handleNameChange = props.handleNameChange;

	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
			<Stack className="flex justify-center p-2 text-center bg-sit-orange">
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
					<BasicTooltip title="Name of your project to be included in the results report" />
				</div>
				<br />
				<div className="m-auto">
					<InputLabel required>Project Description</InputLabel>
					<TextField
						required
						className="w-80"
						placeholder="Enter Description Here"
						maxRows={8}
						minRows={4}
						multiline
						size="small"
						onChange={(e) => handleChange("projectDesc", e)}
					/>
					<BasicTooltip title="A brief description of your project for documentation purposes" />
				</div>
				<br />

				<div className="m-auto">
					<span className="flex justify-center items-center">
						<InputNumber
							placeholder="Max Alternatives of 5 + Base Case"
							min={1}
							max={5}
							defaultValue={1}
							label="Number of Alternatives"
							// @ts-ignore
							onChange={(e, val) => handleChange("alts", val)}
						/>
						<BasicTooltip title="Max Alternatives of 5 + Base Case. You can give custom names to each alternative. (Max 20 characters)" />
					</span>
					<br />
					{/* <BasicTooltip title="You can give custom names to each alternative. (Max 30 characters)" /> */}
					{Array.from({ length: project?.alts + 1 }).map((_, i) => (
						<div key={i} className="mb-3">
							<TextInput
								placeholder={i === 0 ? `Enter Base Case Name Here` : `Enter Alt ${i} Name Here`}
								label={i === 0 ? `Base Case Name` : `Alternative ${i} Name`}
								onChange={(e) => handleNameChange(i, e)}
								inputProps={{ maxLength: 20 }}
								defaultValue={i === 0 ? `Base Case` : `Alternative ${i}`}
							/>
						</div>
					))}
				</div>
				<br />

				<div className="m-auto">
					<span className="flex justify-center items-center">
						<InputNumber
							placeholder="Study Period"
							min={1}
							max={25}
							defaultValue={1}
							label="Study Period"
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

						<Button variant="contained" className="refresh-btn" onClick={handleOpen}>
							<Tooltip title="Reset to Default Values">
								<RefreshIcon className="p-1 cursor-pointer text-white rounded bg-sky-500" fontSize="medium" />
							</Tooltip>
						</Button>

						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={style}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Are you sure you want to reset the discount values to their default?
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									You will lose all your entered data.
								</Typography>
								<br />
								<span className="flex justify-around">
									<Button
										variant="contained"
										className=""
										onClick={(e) => {
											handleChange("refresh", e);
											handleClose();
										}}
										color="error"
									>
										Reset
									</Button>
									<Button variant="contained" className="" onClick={handleClose}>
										Keep
									</Button>
								</span>
							</Box>
						</Modal>
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
