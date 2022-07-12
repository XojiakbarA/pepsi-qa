import {IconButton, TableCell, Tooltip, useMediaQuery} from "@mui/material"
import { setColor, setIcon } from "../../../utils/helpers"

const ShiftTableCell = ({ value, disabled, onClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

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