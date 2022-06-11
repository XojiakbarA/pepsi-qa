import {Chip, TableCell, TableHead, TableRow, Typography, useMediaQuery} from "@mui/material"

const ShiftTableHead = ({ monthDays, getDayName }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const isToday = (date) => date.toLocaleDateString() === new Date().toLocaleDateString()

    return (
        <TableHead>
            <TableRow>
                <TableCell rowSpan={3}>Employees</TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Typography variant="caption">Month Days</Typography>
                </TableCell>
                {
                    monthDays.map(day => (
                        <TableCell key={day.getDate()}>
                            <Chip
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
                        <TableCell key={day.getDate()}>
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