import {createSlice} from "@reduxjs/toolkit"
import {getUser, register, login, logout} from "../actionCreators"

const initialState = {
    data: null,
    auth: JSON.parse(localStorage.getItem('auth')),
    loading: false, // for register, login, logout
    getLoading: false, // for getUser
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [getUser.pending]: (state) => {
            state.getLoading = true
        },
        [getUser.fulfilled]: (state, action) => {
            state.getLoading = false
            state.data = action.payload
            state.auth = JSON.parse(localStorage.getItem('auth'))
            state.error = null
        },
        [getUser.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
            state.auth = JSON.parse(localStorage.getItem('auth'))
        },
        [register.pending]: (state) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.auth = JSON.parse(localStorage.getItem('auth'))
            state.error = null
        },
        [register.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [login.pending]: (state) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.auth = JSON.parse(localStorage.getItem('auth'))
            state.error = null
        },
        [login.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [logout.pending]: (state) => {
            state.loading = true
        },
        [logout.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.auth = JSON.parse(localStorage.getItem('auth'))
            state.error = null
        },
        [logout.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export default userSlice.reducer