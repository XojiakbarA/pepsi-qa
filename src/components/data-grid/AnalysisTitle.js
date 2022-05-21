import {IconButton, Stack, Tooltip, Typography} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"

const AnalysisTitle = ({ logo, syrup, filled_at, onClick }) => {

    return (
        <Stack direction="row" spacing={5} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
                <img src={logo} alt="syrup-logo" width={30}/>
                <Typography variant="body1">
                    {syrup}
                </Typography>
            </Stack>
            <Typography variant="body1">
                Filled at: {filled_at}
            </Typography>
            <Tooltip title="More">
                <IconButton
                    size="small"
                    color="primary"
                    onClick={onClick}
                >
                    <MoreVertIcon fontSize="small" color="primary"/>
                </IconButton>
            </Tooltip>
        </Stack>
    )
}

export default AnalysisTitle