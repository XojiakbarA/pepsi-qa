import {Drawer, IconButton, Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader, Stack} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ListItemIcon from "@mui/material/ListItemIcon"
import ChemicalReactionIcon from "../../icons/ChemicalReactionIcon"
import ChemicalIcon from "../../icons/ChemicalIcon"
import CapIcon from "../../icons/CapIcon"
import BottleIcon from "../../icons/BottleIcon"
import WaterIcon from "../../icons/WaterIcon"
import BarometerIcon from "../../icons/BarometerIcon"
import BrokenIcon from "../../icons/BrokenIcon"
import ScheduleIcon from "../../icons/ScheduleIcon"
import {Link, useLocation} from "react-router-dom"

const menu = [
    { title: 'Shift Schedule', path: '/shift-schedule', icon: <ScheduleIcon/>  },
]
const menu2 = [
    { title: 'Water Analyses', path: '/water-analyses', icon: <WaterIcon/>  },
    { title: 'Syrup Analyses', path: '/syrup-analyses', icon: <ChemicalReactionIcon/> },
    { title: 'Physical-Chemical Analyses', path: '/physical-chemical-analyses', icon: <ChemicalIcon/> },
    { title: 'Removal Torque Analyses', path: '/removal-torque-analyses', icon: <CapIcon/> },
    { title: 'Section Weight Analyses', path: '/section-weight-analyses', icon: <BottleIcon/>  },
    { title: 'Secure Seal Tests', path: '/secure-seal-tests', icon: <BarometerIcon/>  },
    { title: 'Burst Tests', path: '/burst-tests', icon: <BrokenIcon/>  },
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
                <ListSubheader>Analyses</ListSubheader>
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