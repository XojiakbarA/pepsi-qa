import {Button, Stack, Typography, useMediaQuery} from "@mui/material"
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import AnalysisFilters from "./AnalysisFilters"
import {useState} from "react"

const PageHeader = ({ title, icon }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const [anchorEl, setAnchorEl] = useState(null)

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
                {icon}
                <Typography variant={isDownSm ? 'body1' : 'h5'}>{title}</Typography>
            </Stack>
            <Button
                size={isDownSm ? 'small' : 'medium'}
                variant="contained"
                startIcon={<FilterAltIcon/>}
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

export default PageHeader