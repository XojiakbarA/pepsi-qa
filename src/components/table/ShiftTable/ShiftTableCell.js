import {IconButton, TableCell, Tooltip, useMediaQuery} from "@mui/material"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import WeekendIcon from "@mui/icons-material/Weekend"
import HotelIcon from "@mui/icons-material/Hotel"
import HomeIcon from "@mui/icons-material/Home"

const ShiftTableCell = ({ value, disabled, onClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const setColor = (value) => {
        switch (value) {
            case 'day': return 'warning'
            case 'night': return 'info'
            case 'leave': return 'secondary'
            case 'sick_leave': return 'error'
            default: return 'default'
        }
    }
    const setIcon = (value) => {
        switch (value) {
            case 'day': return <LightModeIcon color="inherit" fontSize="inherit"/>
            case 'night': return <DarkModeIcon color="inherit" fontSize="inherit"/>
            case 'leave': return <WeekendIcon color="inherit" fontSize="inherit"/>
            case 'sick_leave': return <HotelIcon color="inherit" fontSize="inherit"/>
            default: return <HomeIcon color="inherit" fontSize="inherit"/>
        }
    }

    return (
        <TableCell>
                <Tooltip title={value}>
                    <span>
                    <IconButton
                        size={isDownSm ? 'small' : 'medium'}
                        disabled={disabled}
                        onClick={onClick}
                        color={setColor(value)}
                    >
                        {setIcon(value)}
                    </IconButton>
                    </span>
                </Tooltip>
        </TableCell>
    )
}

export default ShiftTableCell