import {Avatar,  Box,  CircularProgress,  IconButton,  ListItemIcon,  ListItemText,  Menu,  MenuItem,  Tooltip} from "@mui/material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {userSelector} from "../../store/selectors"
import {logout} from "../../store/actionCreators"

const AvatarMenu = () => {

    const dispatch = useDispatch()

    const { loading } = useSelector(userSelector)

    const [anchorElUser, setAnchorElUser] = useState(null)

    const settings = [
        {
            title: 'Notifications',
            icon: <NotificationsNoneIcon/>
        },
        {
            title: 'Settings',
            icon: <SettingsOutlinedIcon/>
        },
        {
            title: 'Logout',
            icon: loading ? <CircularProgress size={20} color="inherit"/> : <LogoutIcon/>,
            onClick: () => dispatch(logout())
        },
    ]

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open menu">
                <IconButton onClick={ e => setAnchorElUser(e.currentTarget) } sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                id="avatar-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={ e => setAnchorElUser(null) }
            >
                {
                    settings.map(({title, icon, onClick}) => (
                        <MenuItem key={title} onClick={onClick}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText>{title}</ListItemText>
                        </MenuItem>
                    ))
                }
            </Menu>
        </Box>
    )
}

export default AvatarMenu