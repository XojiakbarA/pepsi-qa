import {IconButton, Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader} from "@mui/material"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ListItemIcon from "@mui/material/ListItemIcon"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import ChemicalIcon from "../../icons/ChemicalIcon"
import CapIcon from "../../icons/CapIcon"
import BottleIcon from "../../icons/BottleIcon"
import {Drawer, DrawerHeader} from "./styled"
import {useTheme} from "@mui/material/styles"
import {Link} from "react-router-dom"

const menu = [
    { title: 'Physical-Chemical Analyses', path: '/physical-chemical-analyses', icon: <ChemicalIcon/> },
    { title: 'Removal Torque', path: '/removal-torque', icon: <CapIcon/> },
    { title: 'Section Weight', path: '/section-weight', icon: <BottleIcon/>  },
]

const Sidebar = ({ open, handleCloseClick }) => {

    const theme = useTheme()

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleCloseClick}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                <ListSubheader sx={{ opacity: open ? 1 : 0 }}>Analyses</ListSubheader>
                {
                    menu.map(({ title, path, icon }) => (
                        <ListItem key={title} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                component={Link}
                                to={path}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ opacity: open ? 1 : 0 }}
                                    primary={title}
                                    primaryTypographyProps={{ noWrap: true }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar