import {Box, Divider, IconButton, Stack, Tooltip, Typography} from "@mui/material"
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AnalysisDetails from "./AnalysisDetails"
import {useState} from "react"
import {baseURL} from "../../api"

const MyGridToolbar = ({ analysis }) => {

    const [anchorEl, setAnchorEl] = useState(null)

    return (
        <GridToolbarContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            {/*<Box>*/}
            {/*<GridToolbarColumnsButton/>*/}
            {/*<GridToolbarFilterButton/>*/}
            {/*<GridToolbarDensitySelector/>*/}
            {/*<GridToolbarExport/>*/}
            {/*</Box>*/}
            <Stack
                alignSelf="end"
                alignItems="center"
                direction="row"
                spacing={1}
                divider={<Divider orientation="vertical" flexItem/>}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <img src={baseURL + analysis.product_logo} alt="syrup-logo" width={30}/>
                    <Typography variant="body2">
                        {`${analysis.product_name} ${analysis.syrup_id}`}
                    </Typography>
                </Stack>
                <Typography variant="body2">
                    Checked at: {analysis.checked_at}
                </Typography>
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
            <AnalysisDetails
                anchorEl={anchorEl}
                onClose={ e => setAnchorEl(null) }
                analysis={analysis}
            />
        </GridToolbarContainer>
    )
}

export default MyGridToolbar