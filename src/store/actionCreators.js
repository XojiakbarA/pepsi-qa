import {createAsyncThunk} from "@reduxjs/toolkit"
import {destroyShift, fetchCaps, fetchContainerSuppliers, fetchCsrfCookie, fetchFactories, fetchFormats, fetchLines, fetchProducts, fetchShiftModes, fetchShifts, fetchTanks, fetchUser, fetchUsers, storeShift, updateShiftValues, userLogin, userLogout, userRegister} from "../api"
import {setSnackbar} from "./slices/snackbarSlice"

export const getUser = createAsyncThunk('user/getUser',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchUser()
            if (res.status === 200) {
                localStorage.setItem('auth', JSON.stringify(true))
                return res.data
            }
        } catch ({response}) {
            if (response.status === 401) {
                localStorage.removeItem('auth')
            }
            if (response.status === 500) {
                localStorage.removeItem('auth')
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const register = createAsyncThunk('user/register',
    async ({ data, setErrors }, { dispatch, rejectWithValue }) => {
        try {
            const cookie = await fetchCsrfCookie()
            if (cookie.status === 204) {
                const register = await userRegister(data)
                if (register.status === 204) {
                    const res = await fetchUser()
                    if (res.status === 200) {
                        localStorage.setItem('auth', JSON.stringify(true))
                        dispatch(setSnackbar({ data: 'You are logged in!', open: true, color: 'success' }))
                        return res.data
                    }
                }
            }
        } catch ({ response }) {
            if (response.status === 422) {
                setErrors(response.data.errors)
            }
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const login = createAsyncThunk('user/login',
    async ({ data, setErrors }, { dispatch, rejectWithValue }) => {
        try {
            const cookie = await fetchCsrfCookie()
            if (cookie.status === 204) {
                const login = await userLogin(data)
                if (login.status === 204) {
                    const res = await fetchUser()
                    if (res.status === 200) {
                        localStorage.setItem('auth', JSON.stringify(true))
                        dispatch(setSnackbar({ data: 'You are logged in!', open: true, color: 'success' }))
                        return res.data
                    }
                }
            }
        } catch ({ response }) {
            if (response.status === 422) {
                setErrors(response.data.errors)
            }
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const logout = createAsyncThunk('user/logout',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await userLogout()
            if (res.status === 204) {
                localStorage.removeItem('auth')
                dispatch(setSnackbar({ data: 'You are logged out!', open: true, color: 'success' }))
                return null
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const getProducts = createAsyncThunk('products/get',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchProducts()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const getLines = createAsyncThunk('lines/get',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchLines()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const getFormats = createAsyncThunk('formats/get',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchFormats()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const getContainerSuppliers = createAsyncThunk('containerSupplier/get',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchContainerSuppliers()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)
export const getCaps = createAsyncThunk('caps/get',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchCaps()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const getUsers = createAsyncThunk('users/get',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchUsers()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const getTanks = createAsyncThunk('tanks/get',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchTanks()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const getShiftModes = createAsyncThunk('shiftModes/get',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchShiftModes()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const getFactories = createAsyncThunk('factories/get',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchFactories()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const getShifts = createAsyncThunk('shifts/get',
    async (params, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchShifts(params)
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 422) {
                dispatch(setSnackbar({ data: response.data.message, open: true, color: 'error' }))
            }
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const createShift = createAsyncThunk('shifts/create',
    async ({ data, setErrors, handleClose }, { dispatch, rejectWithValue }) => {
        try {
            const res = await storeShift(data)
            if (res.status === 201) {
                handleClose()
                dispatch(setSnackbar({ data: 'Shift created successfully!', open: true, color: 'success' }))
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 422) {
                setErrors(response.data.errors)
            }
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const editShiftValues = createAsyncThunk('shifts/editValues',
    async ({data, setEditShifts}, { dispatch, rejectWithValue }) => {
        try {
            const res = await updateShiftValues(data)
            if (res.status === 200) {
                setEditShifts([])
                dispatch(setSnackbar({ data: 'Shifts updated successfully!', open: true, color: 'success' }))
            }
        } catch ({ response }) {
            if (response.status === 422) {
                dispatch(setSnackbar({ data: response.data.message, open: true, color: 'error' }))
            }
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteShift = createAsyncThunk('shifts/delete',
    async ({ id, handleClose }, { dispatch, rejectWithValue }) => {
        try {
            const res = await destroyShift(id)
            if (res.status === 204) {
                handleClose()
                dispatch(setSnackbar({ data: 'Shift deleted successfully!', open: true, color: 'success' }))
                return { id }
            }
        } catch ({ response }) {
            if (response.status === 500) {
                dispatch(setSnackbar({ data: 'Server Error', open: true, color: 'error' }))
            }
            return rejectWithValue(response.data.message)
        }
    }
)