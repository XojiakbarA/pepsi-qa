import {Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useMediaQuery} from "@mui/material"
import ShiftTableHead from "./ShiftTableHead"
import ShiftTableCell from "./ShiftTableCell"
import ShiftTableToolbar from "./ShiftTableToolbar"
import ShiftTableFooter from "./ShiftTableFooter"
import ShiftTablePopover from "./ShiftTablePopover"
import {useSearchParams} from "react-router-dom"
import {useState} from "react"

const ShiftTable = ({ shifts }) => {

    const [params] = useSearchParams()

    const [anchorEl, setAnchorEl] = useState(null)
    const [shift, setShift] = useState('day')

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const handleShiftClick = (e, shift, i) => {
        console.log(shift)
        console.log(i)
        setShift(shift.shift_values[i])
        setAnchorEl(e.currentTarget)
    }

    const date = params.get('date') ? new Date(params.get('date')) : new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const lastDate = new Date(year, month + 1, 0)
    const lastDay = lastDate.getDate()
    const minDate = new Date('2011-01-01')
    const maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 31)
    const monthDays = Array.from({ length: lastDay }, (_, i) => new Date(year, month, i + 1))
    const getDayName = (weekday, date) => new Intl.DateTimeFormat('en-US', { weekday }).format(date)
    const getMonthName = (month, date) => new Intl.DateTimeFormat('en-US', { month }).format(date)

    return (
        <Paper>
            <ShiftTableToolbar/>
            <TableContainer>
                <Table size={isDownSm ? 'small' : 'medium'}>
                    <ShiftTableHead
                        monthDays={monthDays}
                        getDayName={getDayName}
                    />
                    <TableBody>
                    {
                        shifts.length
                        ?
                        shifts.map(shift => (
                            <TableRow key={shift.id}>
                                <TableCell colSpan={2}>{shift.user_name}</TableCell>
                                {
                                    shift.shift_values.map((value, i) => (
                                        <ShiftTableCell
                                            key={i}
                                            value={value}
                                            onClick={ e => handleShiftClick(e, shift, i) }
                                        />
                                    ))
                                }
                            </TableRow>
                        ))
                        :
                        <TableRow>
                            <TableCell/>
                            <TableCell/>
                            <TableCell colSpan={lastDay}>
                                <Typography variant="h5">
                                    Shifts not found
                                </Typography>
                            </TableCell>
                        </TableRow>
                    }
                    </TableBody>
            </Table>
        </TableContainer>
            <ShiftTableFooter
                date={date}
                minDate={minDate}
                maxDate={maxDate}
                getMonthName={getMonthName}
            />
            <ShiftTablePopover
                anchorEl={anchorEl}
                onClose={ e => setAnchorEl(null) }
                shift={shift}
            />
        </Paper>
    )
}

export default ShiftTable