import {IconButton, Popover, Stack, Tooltip} from "@mui/material"
import { setColor, setIcon } from "../../../utils/helpers"

const ShiftTablePopover = ({ anchorEl, onClose, onClick, clickedValue, shiftModeValues }) => {

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={onClose}
            PaperProps={{ sx: { padding: 1 } }}
        >
            <Stack direction="row" spacing={1}>
                {
                    shiftModeValues?.map(value => (
                        <Tooltip key={value} title={value}>
                            <span>
                            <IconButton
                                disabled={clickedValue === value}
                                color={setColor(value)}
                                onClick={ e => onClick(value) }
                            >
                                {setIcon(value)}
                            </IconButton>
                            </span>
                        </Tooltip>
                    ))
                }
            </Stack>
        </Popover>
    )
}

export default ShiftTablePopover