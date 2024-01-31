// import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from "@mui/material";

export default function BasicTooltip(props: { title: string }) {
	return (
		<Tooltip title={props.title}>
			<IconButton>{/* <DeleteIcon /> */}</IconButton>
		</Tooltip>
	);
}
