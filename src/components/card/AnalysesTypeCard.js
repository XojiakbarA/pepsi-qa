import { Avatar, Box, Card, CardActionArea, CardContent, Chip, Stack, Typography, useMediaQuery } from '@mui/material'
import { baseURL } from '../../api'

const AnalysesTypeCard = ({ title, subtitle, chips, component, to }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea component={component} to={to}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography gutterBottom variant={isDownSm ? "h6" : "h5"} component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {subtitle}
                        </Typography>
                        <Box>
                            {
                                chips && chips.map(({ name, logo }) => (
                                    <Chip
                                        key={name}
                                        label={name}
                                        avatar={<Avatar src={baseURL + logo} alt="logo.png"/>}
                                        sx={{ mr: 1, mb: 1, cursor: 'pointer' }}
                                    />
                                ))
                            }
                        </Box>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default AnalysesTypeCard