import {Box, Button, Toolbar, useMediaQuery} from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import ShiftTablePagination from "./ShiftTablePagination"

const ShiftTableFooter = ({ date, minDate, maxDate, getMonthName }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Toolbar>
            <ShiftTablePagination
                date={date}
                minDate={minDate}
                maxDate={maxDate}
                getMonthName={getMonthName}
            />
            <Box flexGrow={1}/>
            <Button
                size={isDownSm ? 'small' : 'medium'}
                variant="contained"
                endIcon={<SaveIcon/>}
            >
                Save
            </Button>
        </Toolbar>
    )
}

export default ShiftTableFooter