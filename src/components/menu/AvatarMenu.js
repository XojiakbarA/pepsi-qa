import {useState} from "react"
import {Avatar,  Box,  CircularProgress,  IconButton,  ListItemIcon,  ListItemText,  Menu,  MenuItem,  Tooltip} from "@mui/material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LogoutIcon from '@mui/icons-material/Logout'
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../../store/actionCreators"
import {userSelector} from "../../store/selectors"

const AvatarMenu = () => {

    const dispatch = useDispatch()

    const { loading } = useSelector(userSelector)

    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const handleLogout = () => {
        dispatch(logout())
    }

    const settings = [
        {
            title: 'Notifications',
            icon: <NotificationsNoneIcon/>
        },
        {
            title: 'Logout',
            icon: loading ? <CircularProgress size={20} color="inherit"/> : <LogoutIcon/>,
            onClick: handleLogout
        },
    ]

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                onClose={handleCloseUserMenu}
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