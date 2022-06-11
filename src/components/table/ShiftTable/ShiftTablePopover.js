import {IconButton, Popover, Stack, Tooltip} from "@mui/material"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import WeekendIcon from "@mui/icons-material/Weekend"
import HotelIcon from "@mui/icons-material/Hotel"
import HomeIcon from "@mui/icons-material/Home"

const ShiftTablePopover = ({ anchorEl, onClose, shift }) => {

    const array = [
        { id: 1, title: 'day', color: 'warning', icon: <LightModeIcon/> },
        { id: 2, title: 'night', color: 'info', icon: <DarkModeIcon/> },
        { id: 3, title: 'weekend', color: 'default', icon: <HomeIcon/> },
        { id: 4, title: 'leave', color: 'error', icon: <WeekendIcon/> },
        { id: 5, title: 'sick_leave', color: 'secondary', icon: <HotelIcon/> },
    ]

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={onClose}
            PaperProps={{ sx: { padding: 1 } }}
        >
            <Stack direction="row" spacing={1}>
                {
                    array.map(item => (
                        <Tooltip key={item.title} title={item.title}>
                            <span>
                            <IconButton
                                disabled={shift === item.title}
                                color={item.color}
                            >
                                {item.icon}
                            </IconButton>
                            </span>
                        </Tooltip>
                    ))
                }
            </Stack>
        </Popover>
    )
}

export default ShiftTablePopover