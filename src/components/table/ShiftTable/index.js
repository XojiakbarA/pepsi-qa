import {Box, LinearProgress, Paper, Table, TableBody, TableContainer, useMediaQuery} from "@mui/material"
import ShiftTableHead from "./ShiftTableHead"
import ShiftTableToolbar from "./ShiftTableToolbar"
import ShiftTablePopover from "./ShiftTablePopover"
import ShiftTableRow from "./ShiftTableRow"
import NoResults from "../../common/NoResults"
import ConfirmDialog from "../../dialog/ConfirmDialog"
import {useSearchParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import { setShiftValues } from "../../../store/slices/shiftsSlice"
import { deleteShift, getShifts } from "../../../store/actionCreators"
import { shiftsSelector } from "../../../store/selectors"
import { createParamsObject } from "../../../utils/helpers"

const ShiftTable = () => {

    const dispatch = useDispatch()

    const [params] = useSearchParams()

    const { data: shifts, loading, deleteLoading } = useSelector(shiftsSelector)

    useEffect(() => {
        dispatch(getShifts(createParamsObject(params)))
    }, [dispatch, params])

    const [anchorEl, setAnchorEl] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [clickedShift, setClickedShift] = useState({ shift: null, index: null, value: null })
    const [editShifts, setEditShifts] = useState([])

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const handleDeleteClick = (shift) => {
        setClickedShift({ shift, index: null, value: null })
        setDialogOpen(true)
    }
    const handleCancelClick = () => {
        setDialogOpen(false)
    }
    const handleConfirmClick = () => {
        dispatch(deleteShift({ id: clickedShift.shift.id, handleClose: handleCancelClick }))
    }
    const handleShiftClick = (e, shift, index, value) => {
        setClickedShift({ shift, index, value })
        setAnchorEl(e.currentTarget)
    }
    const handlePopoverClose = () => {
        setAnchorEl(null)
    }
    const handlePopoverClick = (value) => {
        dispatch(setShiftValues({ id: clickedShift.shift.id, index: clickedShift.index, value }))
        setEditShifts(prev => {
            const editShifts = JSON.parse(JSON.stringify(prev))
            const editShift = editShifts.find(item => item.id === clickedShift.shift.id)
            if (editShift) {
                const editShiftValue = editShift.values.find(item => item.index === clickedShift.index)
                if (editShiftValue) {
                    editShiftValue.value = value
                } else {
                    editShift.values.push({ index: clickedShift.index, value })
                }
            } else {
                editShifts.push({ id: clickedShift.shift.id, values: [{ index: clickedShift.index, value }] })
            }
            return editShifts
        })
        setAnchorEl(null)
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
        <Paper sx={{ mb: 2, height: 550, overflow: 'scroll' }}>
            <ShiftTableToolbar
                date={date}
                minDate={minDate}
                maxDate={maxDate}
                getMonthName={getMonthName}
                editShifts={editShifts}
                setEditShifts={setEditShifts}
            />
            { loading && <LinearProgress/> }
            <TableContainer>
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
                            <ShiftTableRow
                                key={shift.id}
                                shift={shift}
                                handleDeleteClick={handleDeleteClick}
                                handleShiftClick={handleShiftClick}
                            />
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
                onClose={handlePopoverClose}
                onClick={handlePopoverClick}
                clickedValue={clickedShift.value}
                shiftModeValues={clickedShift.shift?.shift_mode_values}
            />
            <ConfirmDialog
                open={dialogOpen}
                content={`Do you really want to delete ${clickedShift.shift?.user_name}'s shift?`}
                loading={deleteLoading}
                handleCancelClick={handleCancelClick}
                handleConfirmClick={handleConfirmClick}
            />
        </Paper>
    )
}

export default ShiftTable