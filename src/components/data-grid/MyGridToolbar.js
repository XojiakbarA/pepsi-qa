import {Divider, IconButton, Stack, Tooltip, Typography, useMediaQuery} from "@mui/material"
import {GridToolbarContainer} from "@mui/x-data-grid"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AnalysisMorePopover from "../popover/AnalysisMorePopover"
import SyrupLink from "../links/SyrupLink"
import {useState} from "react"

const MyGridToolbar = ({ analysis }) => {

    const [anchorEl, setAnchorEl] = useState(null)

    const isDownMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

    return (
        <GridToolbarContainer>
            <Stack
                alignItems={ isDownMd ? "start" : "center" }
                direction={ isDownMd ? "column" : "row" }
                spacing={1}
                divider={<Divider orientation={ isDownMd ? "horizontal" : "vertical" } flexItem/>}
            >
                <Tooltip title="More">
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={ e => setAnchorEl(e.currentTarget) }
                    >
                        <MoreVertIcon fontSize="inherit" color="primary"/>
                    </IconButton>
                </Tooltip>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2">Syrup:</Typography>
                    <SyrupLink
                        src={analysis.product_logo}
                        id={analysis.syrup_id}
                    >
                        {`${analysis.product_name} ${analysis.syrup_id}`}
                    </SyrupLink>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2">Checked At:</Typography>
                    <Typography variant="body2" color="primary">{new Date(analysis.checked_at).toLocaleString()}</Typography>
                </Stack>
                {
                    analysis.target &&
                    <Typography variant="body2">
                        Target: {analysis.target}
                    </Typography>
                }
            </Stack>
            <AnalysisMorePopover
                anchorEl={anchorEl}
                onClose={ e => setAnchorEl(null) }
                analysis={analysis}
            />
        </GridToolbarContainer>
    )
}

export default MyGridToolbar