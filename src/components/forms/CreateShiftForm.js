import {Button, Stack} from "@mui/material"
import {LoadingButton} from "@mui/lab"
import RenderUserTag from "../input/AutocompleteInput/RenderUserTag"
import AutocompleteInput from "../input/AutocompleteInput"
import RadioInput from "../input/RadioInput"
import ToggleInput from "../input/ToggleInput"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import {createShift} from "../../store/actionCreators"
import {createShiftValidationSchema} from "../../utils/validate"
import {createShiftButtons} from "../../utils/helpers"

const CreateShiftForm = ({ date, handleClose }) => {

    const dispatch = useDispatch()

    const users = useSelector(state => state.users.data)
    const factories = useSelector(state => state.factories.data)
    const shiftModes = useSelector(state => state.shiftModes.data)
    const shifts = useSelector(state => state.shifts.data)

    const { handleSubmit, handleBlur, getFieldProps, setValues, values, touched, errors, isSubmitting } = useFormik({
        initialValues: {
            date: date.toLocaleDateString(),
            user_ids: [],
            factory_id: '',
            shift_mode_id: shiftModes[0]?.id,
            initial_shift: 0,
        },
        enableReinitialize: true,
        validationSchema: createShiftValidationSchema,
        onSubmit: (data, { setSubmitting }) => {
            dispatch(createShift({ data, setSubmitting, handleClose }))
        }
    })

    const usersValue = users.filter(item => values.user_ids.includes(item.id))
    const sequence = shiftModes.find(mode => mode.id === Number(values.shift_mode_id))?.sequence

    const handleIDsChange = (e, value) => {
        const user_ids = value.map(item => item.id)
        setValues(prev => ({ ...prev, user_ids }))
    }
    const handleToggleChange = (e, initial_shift) => {
        if (initial_shift !== null) setValues(prev => ({ ...prev, initial_shift }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <AutocompleteInput
                    label="For"
                    name="user_ids"
                    options={users}
                    value={usersValue}
                    onChange={handleIDsChange}
                    onBlur={handleBlur}
                    error={ touched.user_ids && Boolean(errors.user_ids) }
                    helperText={ touched.user_ids && errors.user_ids }
                    getOptionLabel={option => `${option.last_name} ${option.first_name}`}
                    getOptionDisabled={option => !!shifts.find(shift => shift.user_name === option.name)}
                    renderTag={(value, getTagProps) => <RenderUserTag value={value} getTagProps={getTagProps}/>}
                />
                <RadioInput
                    row
                    label="Factory"
                    radios={factories.map(({ id, name }) => ({ id, label: name }))}
                    error={ touched.factory_id && Boolean(errors.factory_id) }
                    helperText={ touched.factory_id && errors.factory_id }
                    { ...getFieldProps('factory_id') }
                />
                <RadioInput
                    row
                    label="Shift Mode"
                    radios={shiftModes.map(({ id, value }) => ({ id, value, label: value }))}
                    error={ touched.shift_mode_id && Boolean(errors.shift_mode_id) }
                    helperText={ touched.shift_mode_id && errors.shift_mode_id }
                    { ...getFieldProps('shift_mode_id') }
                />
                <ToggleInput
                    label="Initial Shift"
                    name="initial_shift"
                    buttons={createShiftButtons(sequence)}
                    value={values.initial_shift}
                    onChange={handleToggleChange}
                    error={ touched.initial_shift && Boolean(errors.initial_shift) }
                    helperText={ touched.initial_shift && errors.initial_shift }
                />
                <Stack direction="row" spacing={1} justifyContent="end">
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        type="submit"
                        loading={isSubmitting}
                    >
                        Create
                    </LoadingButton>
                </Stack>
            </Stack>
        </form>
    )
}

export default CreateShiftForm