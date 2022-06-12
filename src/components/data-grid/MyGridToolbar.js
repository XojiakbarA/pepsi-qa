import {Divider, IconButton, Link, Stack, Tooltip, Typography} from "@mui/material"
import {GridToolbarContainer} from "@mui/x-data-grid"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {Link as RouterLink} from "react-router-dom"
import AnalysisMorePopover from "../popover/AnalysisMorePopover"
import {useState} from "react"
import {useSelector} from "react-redux"
import {baseURL} from "../../api"
import {perPagesSelector} from "../../store/selectors"

const MyGridToolbar = ({ analysis }) => {

    const [anchorEl, setAnchorEl] = useState(null)

    const { singleTable } = useSelector(perPagesSelector)

    return (
        <GridToolbarContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Stack
                alignSelf="end"
                alignItems="center"
                direction="row"
                spacing={1}
                divider={<Divider orientation="vertical" flexItem/>}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <img src={baseURL + analysis.product_logo} alt="syrup-logo" width={30}/>
                    <Link
                        component={RouterLink}
                        to={`/syrup-analyses?page=${Math.ceil(analysis.syrup_id/singleTable[0])}`}
                        state={{ syrup_id: analysis.syrup_id }}
                    >
                        <Typography variant="body2">
                            {`${analysis.product_name} ${analysis.syrup_id}`}
                        </Typography>
                    </Link>
                </Stack>
                <Typography variant="body2">
                    Checked at: {analysis.checked_at}
                </Typography>
                {
                    analysis.target &&
                    <Typography variant="body2">
                        Target: {analysis.target}
                    </Typography>
                }
                <Tooltip title="More">
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={ e => setAnchorEl(e.currentTarget) }
                    >
                        <MoreVertIcon fontSize="small" color="primary"/>
                    </IconButton>
                </Tooltip>
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