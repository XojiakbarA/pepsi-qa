import {Stack, TextField} from "@mui/material"
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns"
import enLocale from "date-fns/locale/en-GB"
import {useState} from "react"


const DateTimeRangePicker = () => {

    const [value, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'))

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enLocale}>
            <Stack direction="row" spacing={2}>
                <DateTimePicker
                    label="From"
                    renderInput={(params) => <TextField variant="standard" {...params} />}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                />
                <DateTimePicker
                    label="To"
                    renderInput={(params) => <TextField variant="standard" {...params} />}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                />
            </Stack>
        </LocalizationProvider>
    )
}

export default DateTimeRangePicker