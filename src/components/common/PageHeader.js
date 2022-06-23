import {Stack, Typography, useMediaQuery} from "@mui/material"

const PageHeader = ({ title, icon, rightComponent, justifyContent, alignItems, variant }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Stack direction="row" justifyContent={justifyContent ?? 'space-between'} alignItems={alignItems ?? 'center'}>
            <Stack direction="row" spacing={2} alignItems="center">
                {icon}
                <Typography variant={isDownSm ? 'body1' : variant ?? 'h5'}>{title}</Typography>
            </Stack>
            {rightComponent}
        </Stack>
    )
}

export default PageHeader