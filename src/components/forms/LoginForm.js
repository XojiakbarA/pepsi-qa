import {Checkbox, FormControlLabel, Stack, TextField} from "@mui/material"
import {LoadingButton} from "@mui/lab"
import PasswordInput from "../input/PasswordInput"
import {useFormik} from "formik"
import {loginValidationSchema} from "../../utils/validate"

const LoginForm = () => {

    const { handleSubmit, handleChange, handleBlur, getFieldProps, values, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: ""
        },
        enableReinitialize: true,
        validationSchema: loginValidationSchema,
        onSubmit: (data) => {
            console.log(data)
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
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
                <FormControlLabel
                    label="Remember Me"
                    control={<Checkbox { ...getFieldProps('remember') }/>}
                />
                <LoadingButton
                    variant="contained"
                    type="submit"
                >
                    Login
                </LoadingButton>
            </Stack>
        </form>
    )
}

export default LoginForm