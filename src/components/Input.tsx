import { InputAdornment, TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

export enum TextInputType {
	PRIMARY = " ",
	ERROR = " border-solid border-2 border-red-600 active:border-red-600 hover:border-red-600 ",
	SUCCESS = " border-solid border-2 border-green-600 active:border-green-600 hover:border-green-600 ",
	DISABLED = " bg-base-lighter text-base-light ",
}

export type TextInputProps = {
	className?: string;
	type?: TextInputType;
	disabled?: boolean;
	defaultValue?: string;
	placeholder?: string;
	label?: string;
	helpertext?: string;
	adornment?: string;
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
};

export default function TextInput(props: TextInputProps) {
	return (
		<TextField
			required
			className={(props.className ?? "") + `${props.disabled ? TextInputType.DISABLED : props.type}`}
			endAdornment={<InputAdornment position="end">{props?.adornment}</InputAdornment>}
			label={props.label}
			placeholder={props.placeholder}
			size="small"
			helperText={props.helpertext}
			disabled={props.disabled}
			defaultValue={props.defaultValue}
			onChange={props.onChange}
		/>
	);
}
