import {Toolbar, IconButton, Button, Box, useMediaQuery} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import {Link} from "react-router-dom"
import {AppBar} from "./styled"
import AppLogo from "../../common/AppLogo"
import AvatarMenu from "../../menu/AvatarMenu"

const Header = ({ open, handleMenuClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleMenuClick}
                    edge="start"
                    sx={{ ...(open && { display: 'none' }) }}
                >
                    <MenuIcon/>
                </IconButton>
                <Button
                    sx={ open && isDownSm && {display: 'none'} }
                    color="inherit"
                    component={Link}
                    to="/"
                >
                    <AppLogo/>
                    Pepsi QA
                </Button>
                <Box flexGrow={1}/>
                <AvatarMenu/>
            </Toolbar>
        </AppBar>
    )
}

export default Header