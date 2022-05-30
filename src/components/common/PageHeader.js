import {Button, Stack, Typography, useMediaQuery} from "@mui/material"
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ProductAnalysisFilters from "./ProductAnalysisFilters"
import WaterAnalysisFilters from "./WaterAnalysisFilters"
import {useState} from "react"

const PageHeader = ({ title, icon, filterType }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const [anchorEl, setAnchorEl] = useState({ product: null, water: null })

    const handleFilterClick = (e) => {
        if (filterType === 'water') {
            setAnchorEl({ water: e.currentTarget, product: null })
        } else {
            setAnchorEl({ product: e.currentTarget, water: null })
        }
    }
    const handleClose = () => {
        setAnchorEl({ product: null, water: null })
    }

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
                onClick={handleFilterClick}
            >
                Filters
            </Button>
            <ProductAnalysisFilters
                anchorEl={anchorEl.product}
                onClose={handleClose}
            />
            <WaterAnalysisFilters
                anchorEl={anchorEl.water}
                onClose={handleClose}
            />
        </Stack>
    )
}

export default PageHeader