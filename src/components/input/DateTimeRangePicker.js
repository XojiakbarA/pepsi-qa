import {Stack, TextField} from "@mui/material"
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns"
import enLocale from "date-fns/locale/en-GB"


const DateTimeRangePicker = ({ from, to, onFromChange, onToChange }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enLocale}>
            <Stack direction="row" spacing={2}>
                <DateTimePicker
                    label="From"
                    renderInput={(params) => <TextField variant="standard" {...params} />}
                    value={from}
                    onChange={onFromChange}
                />
                <DateTimePicker
                    label="To"
                    renderInput={(params) => <TextField variant="standard" {...params} />}
                    value={to}
                    onChange={onToChange}
                />
            </Stack>
        </LocalizationProvider>
    )
}

export default DateTimeRangePicker