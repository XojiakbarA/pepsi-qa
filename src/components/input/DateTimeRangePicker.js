import {Stack, TextField, Typography} from "@mui/material"
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns"
import enLocale from "date-fns/locale/en-GB"

const DateTimeRangePicker = ({ label, value, onFromChange, onToChange }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enLocale}>
            <Stack direction="row" spacing={1} alignItems="end">
                <DateTimePicker
                    label={label}
                    value={value.from}
                    onChange={onFromChange}
                    renderInput={(params) => (
                        <TextField
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            {...params}
                        />
                    )}
                />
                <Typography variant="h6">-</Typography>
                <DateTimePicker
                    value={value.to}
                    onChange={onToChange}
                    renderInput={(params) => (
                        <TextField variant="standard" {...params} />
                    )}
                />
            </Stack>
        </LocalizationProvider>
    )
}

export default DateTimeRangePicker