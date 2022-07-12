import {Chip, TableCell, TableHead, TableRow, Typography, useMediaQuery} from "@mui/material"
import { Link } from "react-router-dom"

const ShiftTableHead = ({ monthDays, getDayName }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const isToday = (date) => date.toLocaleDateString() === new Date().toLocaleDateString()

    const setFrom = (day) => {
        const from = new Date(day)
        return new Date(from.setHours(8, 0, 0, 0)).toJSON()
    }
    const setTo = (day) => {
        const to = new Date(day)
        to.setHours(7, 59, 59, 999)
        return new Date(to.setDate(to.getDate() + 1)).toJSON()
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    rowSpan={3}
                    align="center"
                    sx={{
                        minWidth: isDownSm ? 130 : 220,
                        position: 'sticky',
                        left: 0,
                        backgroundColor: 'white',
                        zIndex: 1
                    }}
                >
                    Employees
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Typography variant="caption">Month Days</Typography>
                </TableCell>
                {
                    monthDays.map(day => (
                        <TableCell
                            key={day.getDate()}
                            align="center"
                        >
                            <Chip
                                clickable
                                component={Link}
                                to={`/daily-analyses?from=${setFrom(day)}&to=${setTo(day)}`}
                                label={day.getDate()}
                                size={isDownSm ? 'small' : 'medium'}
                                variant={isToday(day) ? 'filled' : 'outlined'}
                                color={isToday(day) ? 'primary' : 'default'}
                            />
                        </TableCell>
                    ))
                }
            </TableRow>
            <TableRow>
                <TableCell>
                    <Typography variant="caption">Week Days</Typography>
                </TableCell>
                {
                    monthDays.map(day => (
                        <TableCell
                            key={day.getDate()}
                            align="center"
                        >
                            <Typography
                                variant={isDownSm ? 'caption' : 'body2'}
                                color={ day.getDay() === 0 || day.getDay() === 6 ? 'error' : 'primary' }
                            >
                                {getDayName('short', day)}
                            </Typography>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}

export default ShiftTableHead