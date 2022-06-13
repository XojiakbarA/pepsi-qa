import {Button, Grid, Stack, Toolbar, useMediaQuery} from "@mui/material"
import CreateIcon from '@mui/icons-material/Create'
import SaveIcon from "@mui/icons-material/Save"
import AutocompleteInput from "../../input/AutocompleteInput"
import RenderUserTag from "../../input/AutocompleteInput/RenderUserTag"
import ShiftTablePagination from "./ShiftTablePagination"
import CreateShiftDialog from "../../dialog/CreateShiftDialog"
import {useState} from "react"
import {useSearchParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {createIDsValue, createParamsObject} from "../../../utils/helpers"

const ShiftTableToolbar = ({ date, minDate, maxDate, getMonthName }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const [open, setOpen] = useState(false)

    const [params, setParams] = useSearchParams()

    const users = useSelector(state => state.users.data)

    const userValue = createIDsValue('user_ids', users, params)

    const handleIDsChange = (value, field) => {
        const ids = value.map(item => item.id)
        const prevParams = createParamsObject(params)
        delete prevParams.syrup_id
        setParams({ ...prevParams, [field]: ids })
    }

    return (
        <Toolbar sx={{ py: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <AutocompleteInput
                        label="Show shift of"
                        options={users}
                        value={userValue}
                        onChange={(e, v) => handleIDsChange(v, 'user_ids')}
                        getOptionLabel={option => `${option.last_name} ${option.first_name}`}
                        renderTag={(value, getTagProps) => <RenderUserTag value={value} getTagProps={getTagProps}/>}
                    />
                </Grid>
                <Grid item xs={12} md={8} display="flex" justifyContent="end">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <ShiftTablePagination
                            date={date}
                            minDate={minDate}
                            maxDate={maxDate}
                            getMonthName={getMonthName}
                        />
                        <Button
                            size={isDownSm ? 'small' : 'medium'}
                            endIcon={<CreateIcon/>}
                            onClick={ e => setOpen(true) }
                        >
                            Create
                        </Button>
                        <Button
                            size={isDownSm ? 'small' : 'medium'}
                            endIcon={<SaveIcon/>}
                        >
                            Save
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
            <CreateShiftDialog
                date={date}
                open={open}
                onClose={ e => setOpen(false) }
            />
        </Toolbar>
    )
}

export default ShiftTableToolbar