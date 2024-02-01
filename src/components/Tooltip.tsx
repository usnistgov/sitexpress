import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

export default function BasicTooltip(props: { title: string }) {
	return (
		<Tooltip title={props.title}>
			<InfoIcon className="m-2 text-sky-500 cursor-pointer" fontSize="small" />
		</Tooltip>
	);
}
