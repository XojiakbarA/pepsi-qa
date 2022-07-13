import {Stack, TextField} from "@mui/material"
import {LoadingButton} from "@mui/lab"
import PasswordInput from "../input/PasswordInput"
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {registerValidationSchema} from "../../utils/validate"
import {register} from "../../store/actionCreators"
import {userSelector} from "../../store/selectors"

const RegisterForm = () => {

    const dispatch = useDispatch()

    const { loading } = useSelector(userSelector)

    const { handleSubmit, getFieldProps, handleChange, handleBlur, errors, touched, values } = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: ""
        },
        enableReinitialize: true,
        validationSchema: registerValidationSchema,
        onSubmit: (data, { setErrors }) => {
            dispatch(register({data, setErrors}))
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    variant="filled"
                    label="First Name"
                    error={ touched.first_name && Boolean(errors.first_name) }
                    helperText={ touched.first_name && errors.first_name }
                    { ...getFieldProps('first_name') }

                />
                <TextField
                    variant="filled"
                    label="Last Name"
                    error={ touched.last_name && Boolean(errors.last_name) }
                    helperText={ touched.last_name && errors.last_name }
                    { ...getFieldProps('last_name') }
                />
                <TextField
                    variant="filled"
                    label="Email"
                    error={ touched.email && Boolean(errors.email) }
                    helperText={ touched.email && errors.email }
                    { ...getFieldProps('email') }
                />
                <PasswordInput
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={ touched.password && Boolean(errors.password) }
                    helperText={ touched.password && errors.password }
                />
                <PasswordInput
                    label="Confirm Password"
                    name="password_confirmation"
                    value={values.password_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={ touched.password_confirmation && Boolean(errors.password_confirmation) }
                    helperText={ touched.password_confirmation && errors.password_confirmation }
                />
                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={loading}
                >
                    Register
                </LoadingButton>
            </Stack>
        </form>
    )
}

export default RegisterForm