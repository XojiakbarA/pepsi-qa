import {AppBar, Toolbar, IconButton, Button, Box} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import {Link} from "react-router-dom"
import AppLogo from "../../common/AppLogo"
import AvatarMenu from "../../menu/AvatarMenu"

const Header = ({ handleOpenClick }) => {

    return (
        <AppBar>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleOpenClick}
                    edge="start"
                >
                    <MenuIcon/>
                </IconButton>
                <Button
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