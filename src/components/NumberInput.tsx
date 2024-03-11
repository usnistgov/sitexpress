import {
	Unstable_NumberInput as BaseNumberInput,
	NumberInputProps,
	numberInputClasses,
} from "@mui/base/Unstable_NumberInput";

import { styled } from "@mui/system";
import * as React from "react";
import { ChangeEventHandler } from "react";

const NumberInput = React.forwardRef(function CustomNumberInput(
	props: NumberInputProps,
	ref: React.ForwardedRef<HTMLDivElement>,
) {
	return (
		<BaseNumberInput
			slots={{
				root: InputRoot,
				input: InputElement,
				incrementButton: Button,
				decrementButton: Button,
			}}
			slotProps={{
				incrementButton: {
					children: <span className="arrow">▴</span>,
				},
				decrementButton: {
					children: <span className="arrow">▾</span>,
				},
			}}
			{...props}
			ref={ref}
		/>
	);
});

export default function InputNumber(props: {
	placeholder: string;
	min: number;
	max: number;
	defaultValue: number;
	adornment?: string;
	onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
	return (
		<NumberInput
			className="w-1/3"
			endAdornment={<InputAdornment>{props?.adornment}</InputAdornment>}
			min={props.min}
			max={props.max}
			placeholder={props.placeholder}
			// @ts-ignore
			onChange={props.onChange}
			defaultValue={props?.defaultValue || 2}
			inputProps={{ inputMode: "numeric" }}
		/>
	);
}

const InputAdornment = styled("div")(
	() => `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    grid-row: 1/3;
    color: ${grey[700]};
    padding: 0 4px;
  `,
);

const blue = {
	100: "#DAECFF",
	200: "#B6DAFF",
	400: "#3399FF",
	500: "#007FFF",
	600: "#0072E5",
	700: "#0059B2",
	900: "#003A75",
};

const grey = {
	50: "#F3F6F9",
	100: "#E5EAF2",
	200: "#DAE2ED",
	300: "#C7D0DD",
	400: "#B0B8C4",
	500: "#9DA8B7",
	600: "#6B7A90",
	700: "#434D5B",
	800: "#303740",
	900: "#1C2025",
};

const InputRoot = styled("div")(
	() => `
  
  border-radius: 4px;
  color: ${grey[900]};
  border: 1px solid ${grey[400]};
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  padding: 0 0 0 4px;

  &.${numberInputClasses.focused} {
    border-color: ${grey[400]};
  }

  &:hover {
    border-color: ${grey[900]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const InputElement = styled("input")(
	() => `
  font-family: inherit;
  font-weight: 400;
  grid-row: 1/3;
  color: ${grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  outline: 0;
`,
);

const Button = styled("button")(
	() => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 20px;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: transparent;
  border: 0;
  color: ${grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${grey[50]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 4/5;
    grid-row: 1/2;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    border-color: ${grey[200]};
    background: ${grey[50]};
    color: ${grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${blue[400]};
      border-color: ${blue[400]};
    }
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 4/5;
    grid-row: 2/3;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    border-color: ${grey[200]};
    background: ${grey[50]};
    color: ${grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${blue[400]};
      border-color: ${blue[400]};
    }
  }

  & .arrow {
    transform: translateY(-1px);
  }

  & .arrow {
    transform: translateY(-1px);
  }
`,
);
