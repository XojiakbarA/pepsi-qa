import {Drawer, IconButton, Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader, Stack} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ListItemIcon from "@mui/material/ListItemIcon"
import ChemicalIcon from "../../icons/ChemicalIcon"
import CapIcon from "../../icons/CapIcon"
import BottleIcon from "../../icons/BottleIcon"
import WaterIcon from "../../icons/WaterIcon"
import BarometerIcon from "../../icons/BarometerIcon"
import BrokenIcon from "../../icons/BrokenIcon"
import ScheduleIcon from "../../icons/ScheduleIcon"
import {Link, useLocation} from "react-router-dom"

const menu = [
    { title: 'Physical-Chemical Analyses', path: '/physical-chemical-analyses', icon: <ChemicalIcon/> },
    { title: 'Removal Torque Analyses', path: '/removal-torque-analyses', icon: <CapIcon/> },
    { title: 'Section Weight Analyses', path: '/section-weight-analyses', icon: <BottleIcon/>  },
    { title: 'Water Analyses', path: '/water-analyses', icon: <WaterIcon/>  },
    { title: 'Secure Seal Tests', path: '/secure-seal-tests', icon: <BarometerIcon/>  },
    { title: 'Burst Tests', path: '/burst-tests', icon: <BrokenIcon/>  },
]
const menu2 = [
    { title: 'Shift Schedule', path: '/shift-schedule', icon: <ScheduleIcon/>  },
]

const Sidebar = ({ open, handleCloseClick }) => {

    const location = useLocation()

    return (
        <Drawer open={open} onClose={handleCloseClick}>
            <Stack alignItems="end" padding={1}>
                <IconButton onClick={handleCloseClick}>
                    <ChevronLeftIcon />
                </IconButton>
            </Stack>
            <Divider/>
            <List>
                <ListSubheader>Analyses</ListSubheader>
                {
                    menu.map(({ title, path, icon }) => (
                        <ListItem key={title} disablePadding>
                            <ListItemButton
                                onClick={handleCloseClick}
                                component={Link}
                                to={path}
                                selected={path === location.pathname}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText
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
                {
                    menu2.map(({ title, path, icon }) => (
                        <ListItem key={title} disablePadding>
                            <ListItemButton
                                onClick={handleCloseClick}
                                component={Link}
                                to={path}
                                selected={path === location.pathname}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText
                                    primary={title}
                                    primaryTypographyProps={{ noWrap: true }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    )
}

export default Sidebar