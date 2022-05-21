import {Box} from "@mui/material"
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid"
import AnalysisDetails from "./AnalysisDetails"
import AnalysisTitle from "./AnalysisTitle"
import {useState} from "react"
import {api} from "../../api"

const MyGridToolbar = ({ analysis }) => {

    const [anchorEl, setAnchorEl] = useState(null)

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
            <Box flexGrow={1}/>
            <AnalysisTitle
                logo={api + analysis.product_logo}
                syrup={ `${analysis.product_name} ${analysis.syrup_id}` }
                filled_at={analysis.filled_at}
                onClick={ e => setAnchorEl(e.currentTarget) }
            />
            <AnalysisDetails
                anchorEl={anchorEl}
                onClose={ e => setAnchorEl(null) }
                analysis={analysis}
            />
        </GridToolbarContainer>
    )
}

export default MyGridToolbar