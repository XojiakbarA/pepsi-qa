import {Box} from '@mui/material'
import {Outlet} from "react-router"
import {DrawerHeader} from "./styled"
import Header from "./Header"
import Sidebar from "./Sidebar"
import {useState} from "react"

const MainLayout = () => {

    const [open, setOpen] = useState(false)

    return (
        <Box sx={{ display: 'flex' }}>
            <Header
                open={open}
                handleMenuClick={e => setOpen(true)}
            />
            <Sidebar
                open={open}
                handleCloseClick={e => setOpen(false)}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader/>
                <Outlet/>
            </Box>
        </Box>
    );
}

export default MainLayout