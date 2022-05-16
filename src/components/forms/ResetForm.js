import {Stack, TextField} from "@mui/material"
import {useFormik} from "formik"
import {resetValidationSchema} from "../../utils/validate"
import {LoadingButton} from "@mui/lab"

const ResetForm = () => {

    const { handleSubmit, getFieldProps, errors, touched } = useFormik({
        initialValues: {
            email: ""
        },
        enableReinitialize: true,
        validationSchema: resetValidationSchema,
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
                <LoadingButton
                    variant="contained"
                    type="submit"
                >
                    Send
                </LoadingButton>
            </Stack>
        </form>
    )
}

export default ResetForm