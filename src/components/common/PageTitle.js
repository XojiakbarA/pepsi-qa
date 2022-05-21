import {Button, Stack, Typography} from "@mui/material"
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import AnalysisFilters from "./AnalysisFilters"
import {useState} from "react"

const PageTitle = ({ title, icon }) => {

    const [anchorEl, setAnchorEl] = useState(null)

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
                {icon}
                <Typography variant="h4">{title}</Typography>
            </Stack>
            <Button
                startIcon={<FilterAltIcon/>}
                variant="contained"
                onClick={ e => setAnchorEl(e.currentTarget) }
            >
                Filters
            </Button>
            <AnalysisFilters
                anchorEl={anchorEl}
                onClose={ e => setAnchorEl(null) }
            />
        </Stack>
    )
}

export default PageTitle