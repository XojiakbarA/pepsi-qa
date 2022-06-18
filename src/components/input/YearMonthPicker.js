import {Button, TextField, Tooltip, useMediaQuery} from "@mui/material"
import EventIcon from '@mui/icons-material/Event'
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns"
import enLocale from "date-fns/locale/en-GB"
import {useState} from "react"

const YearMonthPicker = ({ minDate, maxDate, value, onChange, buttonText, disabled }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const [open, setOpen] = useState(false)

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enLocale}>
            <DatePicker
                open={open}
                onClose={ e => setOpen(false) }
                PopperProps={{ placement: 'top-start' }}
                views={['year', 'month']}
                label="Date"
                minDate={minDate}
                maxDate={maxDate}
                value={value}
                onChange={onChange}
                renderInput={({ ref, inputRef, inputProps, ...others }) => {
                    return (
                        <div ref={ref}>
                            <TextField {...inputProps} ref={inputRef} type="hidden" variant="standard"/>
                            <Tooltip title="Select Date">
                                <Button
                                    sx={{ whiteSpace: 'nowrap' }}
                                    size={isDownSm ? 'small' : 'medium'}
                                    onClick={ e => setOpen(true) }
                                    endIcon={<EventIcon/>}
                                    disabled={disabled}

                                >
                                    {buttonText}
                                </Button>
                            </Tooltip>
                        </div>

                    )
                }}
            />
        </LocalizationProvider>
    )
}

export default YearMonthPicker