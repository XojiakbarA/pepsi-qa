import { Avatar, Box, Card, CardActionArea, CardContent, Chip, Stack, Typography, useMediaQuery } from '@mui/material'
import { baseURL } from '../../api'

const AnalysesTypeCard = ({ title, subtitle, chips, component, to }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Card sx={{ width: '100%', height: '100%' }}>
            <CardActionArea component={component} to={to} sx={{ height: '100%' }}>
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