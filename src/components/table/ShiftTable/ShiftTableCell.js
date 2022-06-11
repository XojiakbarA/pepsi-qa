import {IconButton, TableCell, Tooltip, useMediaQuery} from "@mui/material"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import WeekendIcon from "@mui/icons-material/Weekend"
import HotelIcon from "@mui/icons-material/Hotel"
import HomeIcon from "@mui/icons-material/Home"

const ShiftTableCell = ({ value, onClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <TableCell>
                <Tooltip title={value}>
                    <IconButton
                        size={isDownSm ? 'small' : 'medium'}
                        onClick={onClick}
                        color={
                            value === 'day'
                            ?
                            'warning'
                            :
                            value === 'night'
                            ?
                            'info'
                            :
                            value === 'leave'
                            ?
                            'secondary'
                            :
                            value === 'sick_leave'
                            ?
                            'error'
                            :
                            'default'
                        }
                    >
                        {
                            value === 'day'
                            ?
                            <LightModeIcon color="inherit" fontSize="inherit"/>
                            :
                            value === 'night'
                            ?
                            <DarkModeIcon color="inherit" fontSize="inherit"/>
                            :
                            value === 'leave'
                            ?
                            <WeekendIcon color="inherit" fontSize="inherit"/>
                            :
                            value === 'sick_leave'
                            ?
                            <HotelIcon color="inherit" fontSize="inherit"/>
                            :
                            <HomeIcon color="inherit" fontSize="inherit"/>
                        }
                    </IconButton>
                </Tooltip>
        </TableCell>
    )
}

export default ShiftTableCell