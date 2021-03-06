import {IconButton, Stack, Tooltip, useMediaQuery} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import YearMonthPicker from "../../input/YearMonthPicker"
import {useSearchParams} from "react-router-dom"

const ShiftTablePagination = ({ date, minDate, maxDate, getMonthName, disabled }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const [params, setParams] = useSearchParams()

    const startDateString = new Date(date.getFullYear(), date.getMonth(), minDate.getDate()).toLocaleDateString()
    const endDateString = new Date(date.getFullYear(), date.getMonth(), maxDate.getDate()).toLocaleDateString()
    const isEndPrev = startDateString === minDate.toLocaleDateString()
    const isEndNext = endDateString === maxDate.toLocaleDateString()
    const buttonText = `${getMonthName('long', date)} ${date.getFullYear()}`

    const handleDateChange = (value) => {
        setParams({date: value.toJSON()})
    }
    const handlePrevClick = () => {
        const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
        setParams({ date: prevMonth.toJSON() })
    }
    const handleNextClick = () => {
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
        setParams({date: nextMonth.toJSON()})
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Prev Month">
                <span>
                <IconButton
                    color="primary"
                    size={isDownSm ? 'small' : 'medium'}
                    onClick={handlePrevClick}
                    disabled={isEndPrev || disabled}
                >
                    <ChevronLeftIcon color="inherit" fontSize="inherit"/>
                </IconButton>
                </span>
            </Tooltip>
            <YearMonthPicker
                minDate={minDate}
                maxDate={maxDate}
                value={params.get('date') || new Date()}
                onChange={handleDateChange}
                buttonText={buttonText}
                disabled={disabled}
            />
            <Tooltip title="Next Month">
                <span>
                <IconButton
                    color="primary"
                    size={isDownSm ? 'small' : 'medium'}
                    onClick={handleNextClick}
                    disabled={isEndNext || disabled}
                >
                    <ChevronRightIcon color="inherit" fontSize="inherit"/>
                </IconButton>
                </span>
            </Tooltip>
        </Stack>
    )
}

export default ShiftTablePagination