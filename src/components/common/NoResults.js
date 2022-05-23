import {Stack, Typography} from "@mui/material"
import noResults from '../../assets/icons/no-results.png'

const NoResults = () => {

    return (
        <Stack alignItems="center" spacing={2}>
            <img src={noResults} alt="no-results" width={120}/>
            <Typography variant="h4">Analyses not found</Typography>
        </Stack>
    )
}

export default NoResults