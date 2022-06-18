import {IconButton, Popover, Stack, Tooltip} from "@mui/material"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import WeekendIcon from "@mui/icons-material/Weekend"
import HotelIcon from "@mui/icons-material/Hotel"
import HomeIcon from "@mui/icons-material/Home"

const ShiftTablePopover = ({ anchorEl, onClose, onClick, shiftValue }) => {

    const array = [
        { id: 1, value: 'day', color: 'warning', icon: <LightModeIcon/> },
        { id: 2, value: 'night', color: 'info', icon: <DarkModeIcon/> },
        { id: 3, value: 'weekend', color: 'default', icon: <HomeIcon/> },
        { id: 4, value: 'leave', color: 'secondary', icon: <WeekendIcon/> },
        { id: 5, value: 'sick_leave', color: 'error', icon: <HotelIcon/> },
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
                    array.map(({ value, color, icon }) => (
                        <Tooltip key={value} title={value}>
                            <span>
                            <IconButton
                                disabled={shiftValue === value}
                                color={color}
                                onClick={ e => onClick(value) }
                            >
                                {icon}
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