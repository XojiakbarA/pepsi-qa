import {Box, Divider, IconButton, Stack, Tooltip} from "@mui/material"
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AnalysisDetails from "./AnalysisDetails"
import AnalysisTitle from "./AnalysisTitle"
import {useState} from "react"
import {baseURL} from "../../api"

const MyGridToolbar = ({ analysis }) => {

    const [anchorEl, setAnchorEl] = useState(null)

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
            <Box flexGrow={1}/>
            <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem/>}
            >
                <AnalysisTitle
                    logo={baseURL + analysis.product_logo}
                    syrup={ `${analysis.product_name} ${analysis.syrup_id}` }
                    filled_at={analysis.filled_at}
                />
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