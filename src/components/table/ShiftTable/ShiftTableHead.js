import {Chip, TableCell, TableHead, TableRow, Typography} from "@mui/material"

const ShiftTableHead = ({ monthDays, getDayName }) => {

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
                                variant="body2"
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