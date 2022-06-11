import {Button, Stack, Toolbar} from "@mui/material"
import ShiftTablePagination from "./ShiftTablePagination"

const ShiftTableFooter = ({ date, minDate, maxDate, getMonthName }) => {

    return (
        <Toolbar>
            <Stack direction="row" spacing={2} alignItems="center">
                <ShiftTablePagination
                    date={date}
                    minDate={minDate}
                    maxDate={maxDate}
                    getMonthName={getMonthName}
                />
                <Button variant="outlined">Save</Button>
            </Stack>
        </Toolbar>
    )
}

export default ShiftTableFooter