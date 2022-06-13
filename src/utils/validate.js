import * as yup from "yup"

export const resetValidationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required')
})

export const loginValidationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required')
})

export const registerValidationSchema = yup.object({
    first_name: yup
        .string('Enter Your First Name')
        .required('First Name is required'),
    last_name: yup
        .string('Enter Your Last Name')
        .required('Last Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    password_confirmation: yup
        .string('Enter your password')
        .required('Please re-type password')
        .when('password',
            {
                is: val => (val && val.length > 0 ? true : false),
                then: yup.string().oneOf(
                    [yup.ref('password')],
                    'Both password need to be the same'
                )
            })
})

export const createShiftValidationSchema = yup.object({
    user_ids: yup
        .array('Choose Employees')
        .of(yup.number('ID must be a integer'))
        .min(1, 'Choose Employees')
        .required('Employees is Required'),
    factory_id: yup
        .number('Choose Factory')
        .required('Factory is Required'),
    shift_mode_id: yup
        .number('Choose Mode')
        .required('Mode is Required'),
    initial_shift: yup
        .number('Choose Initial Shift')
        .required('Initial Shift is Required')
})