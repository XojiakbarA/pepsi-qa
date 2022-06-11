import {IconButton, TableCell, Tooltip} from "@mui/material"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import WeekendIcon from "@mui/icons-material/Weekend"
import HotelIcon from "@mui/icons-material/Hotel"
import HomeIcon from "@mui/icons-material/Home"

const ShiftTableCell = ({ value, onClick }) => {

    return (
        <TableCell>
                <Tooltip title={value}>
                    <IconButton
                        size="small"
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
                            <LightModeIcon color="inherit"/>
                            :
                            value === 'night'
                            ?
                            <DarkModeIcon color="inherit"/>
                            :
                            value === 'leave'
                            ?
                            <WeekendIcon color="inherit"/>
                            :
                            value === 'sick_leave'
                            ?
                            <HotelIcon color="inherit"/>
                            :
                            <HomeIcon color="inherit"/>
                        }
                    </IconButton>
                </Tooltip>
        </TableCell>
    )
}

export default ShiftTableCell