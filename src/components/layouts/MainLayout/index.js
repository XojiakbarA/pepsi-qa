import {Box, Container, Toolbar} from '@mui/material'
import {Outlet} from "react-router"
import Header from "./Header"
import Sidebar from "./Sidebar"
import {useState} from "react"

const MainLayout = () => {

    const [open, setOpen] = useState(false)

    return (
        <Box>
            <Header handleOpenClick={e => setOpen(true)}/>
            <Sidebar
                open={open}
                handleCloseClick={e => setOpen(false)}
            />
            <Toolbar sx={{ marginBottom: 2 }}/>
            <Container maxWidth="xl">
                <Outlet/>
            </Container>
            <Toolbar/>
        </Box>
    );
}

export default MainLayout