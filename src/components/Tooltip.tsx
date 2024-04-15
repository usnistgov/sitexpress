import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

export default function BasicTooltip(props: { title: string }) {
	return (
		<Tooltip title={props.title}>
			<InfoIcon className="m-2 cursor-pointer" fontSize="small" style={{ color: "#1975d1ff" }} />
		</Tooltip>
	);
}
