import {Divider, Stack, Typography} from "@mui/material"

const AnalysisTitle = ({ logo, syrup, filled_at }) => {

    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem/>}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <img src={logo} alt="syrup-logo" width={30}/>
                <Typography variant="body2">
                    {syrup}
                </Typography>
            </Stack>
            <Typography variant="body2">
                Filled at: {filled_at}
            </Typography>
        </Stack>
    )
}

export default AnalysisTitle