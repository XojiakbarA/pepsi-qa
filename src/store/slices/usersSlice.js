import {createSlice} from "@reduxjs/toolkit"
import {getUsers} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    error: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.loading = true
        },
        [getUsers.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getUsers.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export default usersSlice.reducer