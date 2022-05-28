import {createAsyncThunk} from "@reduxjs/toolkit"
import {
    fetchCaps,
    fetchContainerSuppliers,
    fetchCsrfCookie,
    fetchFormats,
    fetchLines,
    fetchProducts,
    fetchUser, fetchUsers,
    userLogin,
    userLogout,
    userRegister
} from "../api"
import {setSnackbar} from "./slices/snackbarSlice"

export const getUser = createAsyncThunk('user/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchUser()
            if (res.status === 200) {
                localStorage.setItem('auth', JSON.stringify(true))
                return res.data
            }
        } catch ({response}) {
            if (response.status === 401) {
                localStorage.removeItem('auth')
                return rejectWithValue(response.data.message)
            }
        }
    }
)

export const register = createAsyncThunk('user/register',
    async (data, { dispatch, rejectWithValue }) => {
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
            return rejectWithValue(response.data.message)
        }
    }
)

export const login = createAsyncThunk('user/login',
    async (data, { dispatch, rejectWithValue }) => {
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
            return rejectWithValue(response.data.message)
        }
    }
)

export const getProducts = createAsyncThunk('products/get',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchProducts()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            return rejectWithValue(response.data.message)
        }
    }
)

export const getLines = createAsyncThunk('lines/get',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchLines()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            return rejectWithValue(response.data.message)
        }
    }
)

export const getFormats = createAsyncThunk('formats/get',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchFormats()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            return rejectWithValue(response.data.message)
        }
    }
)

export const getContainerSuppliers = createAsyncThunk('containerSupplier/get',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchContainerSuppliers()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            return rejectWithValue(response.data.message)
        }
    }
)
export const getCaps = createAsyncThunk('caps/get',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchCaps()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            return rejectWithValue(response.data.message)
        }
    }
)

export const getUsers = createAsyncThunk('users/get',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchUsers()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            return rejectWithValue(response.data.message)
        }
    }
)