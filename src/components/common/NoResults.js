import {Stack, Typography, useMediaQuery} from "@mui/material"
import noResults from '../../assets/icons/no-results.png'

const NoResults = ({ resource = 'Analyses' }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Stack alignItems="center" spacing={2}>
            <img src={noResults} alt="no-results" width={isDownSm ? 60 : 120 }/>
            <Typography variant={isDownSm ? 'h5' : 'h4'}>{resource} not found</Typography>
        </Stack>
    )
}

export default NoResults