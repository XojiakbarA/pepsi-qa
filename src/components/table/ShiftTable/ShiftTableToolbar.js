import {Box, Stack, Toolbar} from "@mui/material"
import AutocompleteInput from "../../input/AutocompleteInput"
import RenderUserTag from "../../input/AutocompleteInput/RenderUserTag"
import {useSearchParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {createIDsValue, createParamsObject} from "../../../utils/helpers"

const ShiftTableToolbar = () => {

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
        <Toolbar>
            <Stack direction="row" spacing={4} alignItems="center">
                <Box minWidth={300}>
                    <AutocompleteInput
                        name="user_ids"
                        label="Employees"
                        options={users}
                        value={userValue}
                        onChange={(e, v) => handleIDsChange(v, 'user_ids')}
                        getOptionLabel={option => `${option.last_name} ${option.first_name}`}
                        renderTag={(value, getTagProps) => <RenderUserTag value={value} getTagProps={getTagProps}/>}
                    />
                </Box>
            </Stack>
        </Toolbar>
    )
}

export default ShiftTableToolbar