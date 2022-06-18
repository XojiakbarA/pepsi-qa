import {Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useMediaQuery} from "@mui/material"
import ShiftTableHead from "./ShiftTableHead"
import ShiftTableCell from "./ShiftTableCell"
import ShiftTableToolbar from "./ShiftTableToolbar"
import ShiftTablePopover from "./ShiftTablePopover"
import NoResults from "../../common/NoResults"
import {useSearchParams} from "react-router-dom"
import {useState} from "react"
import { useDispatch } from "react-redux"
import { setShiftValues } from "../../../store/slices/shiftsSlice"

const ShiftTable = ({ shifts, loading }) => {

    const dispatch = useDispatch()

    const [params] = useSearchParams()

    const [anchorEl, setAnchorEl] = useState(null)
    const [shift, setShift] = useState({ id: null, values: [] })

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const handleShiftClick = (e, id, index) => {
        setShift({ id, values: [ { index, value: null } ] })
        setAnchorEl(e.currentTarget)
    }
    const handlePopoverClick = (value) => {
        setShift(prev => ({ ...prev, values: [ { ...prev.values[0], value } ] }))
        dispatch(setShiftValues({ ...shift, values: [ { ...shift.values[0], value } ] }))
        setAnchorEl(null)
    }

    const shiftValue = shifts.find(item => item.id === shift.id)?.shift_values[shift.values[0].index]

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
            <ShiftTableToolbar
                date={date}
                minDate={minDate}
                maxDate={maxDate}
                getMonthName={getMonthName}
            />
            { loading && <LinearProgress/> }
            <TableContainer sx={{ minHeight: 500 }}>
                <Table size={isDownSm ? 'small' : 'medium'}>
                    <ShiftTableHead
                        monthDays={monthDays}
                        getDayName={getDayName}
                    />
                    <TableBody>
                    {
                        !!shifts.length
                        &&
                        shifts.map(shift => (
                            <TableRow key={shift.id}>
                                <TableCell>
                                    {shift.user_name}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption">{shift.factory_name}</Typography>
                                </TableCell>
                                {
                                    shift.shift_values.map((value, i) => (
                                        <ShiftTableCell
                                            disabled={loading}
                                            key={i}
                                            value={value}
                                            onClick={ e => handleShiftClick(e, shift.id, i, value) }
                                        />
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                    </TableBody>
            </Table>
            {
                !shifts.length
                &&
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    paddingTop={10}
                >
                    <NoResults resource="Shifts"/>
                </Box>
            }
        </TableContainer>
            <ShiftTablePopover
                anchorEl={anchorEl}
                onClose={ e => setAnchorEl(null) }
                onClick={handlePopoverClick}
                shiftValue={shiftValue}
            />
        </Paper>
    )
}

export default ShiftTable