import { Avatar, Box, Card, CardContent, IconButton, Stack, Typography } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email'

const UserCard = ({ user }) => {

    return (
        <Card>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ width: 60, height: 60 }}/>
                    <Stack>
                        <Typography variant="body1">{user.name}</Typography>
                        <Typography variant="caption">{user.position_name + ' (' + user.factory_name + ')'}</Typography>
                    </Stack>
                    <Box flexGrow={1}/>
                    <IconButton>
                        <EmailIcon/>
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default UserCard