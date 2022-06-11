import {Stack, Typography, useMediaQuery} from "@mui/material"

const PageHeader = ({ title, icon, rightComponent }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
                {icon}
                <Typography variant={isDownSm ? 'body1' : 'h5'}>{title}</Typography>
            </Stack>
            {rightComponent}
        </Stack>
    )
}

export default PageHeader