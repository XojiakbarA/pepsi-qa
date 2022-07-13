import { Chip, IconButton, Stack, TableCell, TableRow, Tooltip, Typography, useMediaQuery } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { setColor, setIcon } from "../../../utils/helpers"

const ShiftTableRow = ({ shift, loading, handleDeleteClick, handleShiftClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <TableRow>
            <TableCell
                sx={{
                    minWidth: isDownSm ? 130 : 220,
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'white',
                    zIndex: 1
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">{shift.user_name}</Typography>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={ e => handleDeleteClick(shift) }
                            size={isDownSm ? "small" : "medium"}
                        >
                            <DeleteIcon fontSize="inherit" color="inherit"/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </TableCell>
            <TableCell>
                <Chip
                    size={isDownSm ? "small" : "medium"}
                    label={shift.shift_mode_type}
                />
                </TableCell>
            <TableCell>
                <Typography variant="caption">{shift.factory_name}</Typography>
            </TableCell>
            {
                shift.shift_values.map((shift_value, i) => (
                    <TableCell key={i}>
                        <Tooltip title={shift_value.value}>
                            <span>
                            <IconButton
                                size={isDownSm ? 'small' : 'medium'}
                                disabled={loading}
                                onClick={ e => handleShiftClick(e, shift, i, shift_value.value) }
                                color={setColor(shift_value.value)}
                            >
                                {setIcon(shift_value.value)}
                            </IconButton>
                            </span>
                        </Tooltip>
                    </TableCell>
                ))
            }
        </TableRow>
    )
}

export default ShiftTableRow