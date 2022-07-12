import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover} from "@mui/material"
import ChemicalIcon from "../icons/ChemicalIcon"
import CapIcon from "../icons/CapIcon"
import BottleIcon from "../icons/BottleIcon"
import BarometerIcon from "../icons/BarometerIcon"
import BrokenIcon from "../icons/BrokenIcon"
import {Link} from "react-router-dom";

const SyrupMorePopover = ({ anchorEl, syrup, onClose }) => {

    const menu = [
        {
            title: 'Physical-Chemical Analyses',
            path: `/physical-chemical-analyses/${syrup?.is_carbonated ? 'carbonated-drinks' : 'non-carbonated-drinks'}`,
            icon: <ChemicalIcon/>
        },
        { title: 'Removal Torque Analyses', path: '/removal-torque-analyses', icon: <CapIcon/> },
        { title: 'Section Weight Analyses', path: '/section-weight-analyses', icon: <BottleIcon/>  },
        { title: 'Secure Seal Tests', path: '/secure-seal-tests', icon: <BarometerIcon/>  },
        { title: 'Burst Tests', path: '/burst-tests', icon: <BrokenIcon/>  },
    ]

    return (
        <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
            <List dense>
                {
                    menu.map(({ title, path, icon }) => (
                        <ListItem key={title} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={`${path}?syrup_id=${syrup?.id}`}
                            >
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText>{title}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Popover>
    )
}

export default SyrupMorePopover